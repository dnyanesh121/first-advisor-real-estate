import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import Photo from "../../components/common/Photo";
import PropertyGrid from "../../components/PropertyCard/PropertyGrid";
import { PROPERTIES, getProperty } from "../../data/properties";
import { getAgent } from "../../data/agents";
import { TYPES } from "../../data/site";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { areaText, emi, inr, pricePerSqft, priceText, shortInr } from "../../utils/format";

const loanEmi = (p) => (p.rentLike ? null : emi(p.price * 0.8, 8.5, 20));

/* [label, render(p), numeric(p)?, "min"|"max"?] — a single string is a group heading */
const ROWS = [
  "Overview",
  ["Price", (p) => priceText(p)],
  ["Price per sq ft", (p) => (p.rentLike ? "—" : inr(pricePerSqft(p))), (p) => pricePerSqft(p), "min"],
  ["Location", (p) => `${p.loc}, ${p.city}`],
  ["Property type", (p) => TYPES[p.type]],
  ["Configuration", (p) => p.bhkLabel],
  ["Carpet area", (p) => areaText(p), (p) => p.area, "max"],
  ["Bathrooms", (p) => p.baths || "—", (p) => p.baths, "max"],
  ["Parking", (p) => (p.parking ? `${p.parking} slot(s)` : "—"), (p) => p.parking, "max"],
  "Details",
  ["Status", (p) => p.status + (p.possession ? ` (${p.possession})` : "")],
  ["Furnishing", (p) => p.furn],
  ["Floor", (p) => p.floor],
  ["Facing", (p) => p.facing],
  ["Property age", (p) => p.age],
  ["Security deposit", (p) => (p.rentLike ? shortInr(p.deposit) : "—")],
  ["Est. EMI (80% loan, 8.5%, 20 yrs)", (p) => (p.rentLike ? "—" : `${inr(loanEmi(p))}/mo`), loanEmi, "min"],
  ["Advisor", (p) => { const a = getAgent(p.agent); return <Link className="link" to={`/agents/${a.id}`}>{a.name}</Link>; }, null, null, "advisor"]
];

function bestValue(values, dir) {
  const nums = values.filter((v) => typeof v === "number");
  if (nums.length < 2) return null;
  const b = dir === "min" ? Math.min(...nums) : Math.max(...nums);
  return nums.every((v) => v === b) ? null : b;
}

export default function Compare() {
  useDocumentTitle("Compare Properties");
  const { compare, setCompare, clearCompare, toggleCompare, saved, maxCompare } = useApp();
  const [params, setParams] = useSearchParams();
  const [diffOnly, setDiffOnly] = useState(false);

  // allow shareable links: /compare?ids=1,2,3
  useEffect(() => {
    const ids = (params.get("ids") || "").split(",").map(Number).filter(Boolean);
    if (ids.length) setCompare(ids);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setParams(compare.length ? { ids: compare.join(",") } : {}, { replace: true });
  }, [compare]); // eslint-disable-line react-hooks/exhaustive-deps

  const list = compare.map(getProperty).filter(Boolean);
  const cols = [...list, ...Array(Math.max(0, maxCompare - list.length)).fill(null)];
  const amenities = [...new Set(list.flatMap((p) => p.amen))];
  const rows = [...ROWS, "Amenities", ...amenities.map((a) => [a, (p) => (p.amen.includes(a) ? <span className="yes"><Icon name="check" size={18} style={{ display: "inline" }} /></span> : <span className="no">—</span>), null, null, `amen-${a}`])];

  let pool = saved.map(getProperty).filter((p) => p && !list.includes(p));
  if (pool.length < 3) pool = [...pool, ...PROPERTIES.filter((p) => p.featured && !list.includes(p) && !pool.includes(p))];
  pool = pool.slice(0, 3);

  return (
    <>
      <PageHero title="Compare" highlight="Properties" crumbs={[["Compare"]]} lead="Up to three properties side by side. Best values in each row are highlighted." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="toolbar" style={{ marginBottom: 18 }}>
            <span className="count"><b className="num">{list.length}</b> of 3 properties selected</span>
            <div className="flex">
              <label className="check" style={{ fontSize: 13.5 }}><input type="checkbox" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} /> Show differences only</label>
              <button type="button" className="btn btn--ghost btn--sm" onClick={clearCompare}>Clear all</button>
            </div>
          </div>
          <Reveal className="cmp-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th style={{ minWidth: 150 }}><span className="muted" style={{ fontWeight: 500, fontSize: 13 }}>Properties</span></th>
                  {cols.map((p, i) => (
                    <th key={p ? p.id : `empty-${i}`}>
                      {p ? (
                        <div className="cmp-col">
                          <Link className="art" to={`/property/${p.id}`}><Photo src={p.image} alt={p.imageAlt} sizes="(max-width: 700px) 60vw, 300px" /></Link>
                          <h3><Link to={`/property/${p.id}`}>{p.title}</Link></h3>
                          <b className="num" style={{ color: "var(--navy)", fontSize: 17 }}>{priceText(p)}</b>
                          <div className="flex">
                            <Link className="btn btn--navy btn--sm" to={`/property/${p.id}#contact`}>Schedule visit</Link>
                            <button type="button" className="btn btn--ghost btn--sm rm" onClick={() => toggleCompare(p.id)}><Icon name="x" />Remove</button>
                          </div>
                        </div>
                      ) : (
                        <div className="add-slot">
                          <Icon name="plus" size={32} style={{ color: "var(--accent)" }} />
                          <span>Add a property to compare</span>
                          <select className="select select--sm" aria-label="Add property" value="" onChange={(e) => e.target.value && toggleCompare(e.target.value)}>
                            <option value="">Choose a property…</option>
                            {[["buy", "For sale"], ["rent", "For rent"], ["commercial", "Commercial"]].map(([m, label]) => (
                              <optgroup key={m} label={label}>
                                {PROPERTIES.filter((x) => x.mode === m && !list.includes(x)).map((x) => <option key={x.id} value={x.id}>{x.title} — {priceText(x)}</option>)}
                              </optgroup>
                            ))}
                          </select>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr><td colSpan={4} className="center muted" style={{ padding: 28 }}>Add at least two properties to see a side-by-side comparison.</td></tr>
                )}
                {list.length > 0 && rows.map((row) => {
                  if (typeof row === "string") return <tr className="group" key={row}><th>{row}</th><td colSpan={3} /></tr>;
                  const [label, render, numeric, dir, key] = row;
                  if (diffOnly && list.length > 1) {
                    const values = list.map((p) => {
                      if (key === "advisor") return p.agent;
                      if (key && key.startsWith("amen-")) return p.amen.includes(label);
                      return String(render(p));
                    });
                    if (values.every((v) => v === values[0])) return null;
                  }
                  const best = numeric ? bestValue(cols.map((p) => (p ? numeric(p) : null)), dir) : null;
                  return (
                    <tr key={key || label}>
                      <th scope="row">{label}</th>
                      {cols.map((p, i) => (
                        <td key={i} className="num">
                          {p && <Fragment>{render(p)}{best !== null && numeric(p) === best && <span className="best">{dir === "min" ? "Lowest" : "Best"}</span>}</Fragment>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Add from your" highlight="Saved" after="list" subtitle="Or browse more verified properties" />
          <PropertyGrid properties={pool} />
          <div className="center mt-8"><Link className="btn btn--outline" to="/properties">Browse all properties</Link></div>
        </div>
      </section>
    </>
  );
}
