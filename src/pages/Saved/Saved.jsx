import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import EmptyState from "../../components/common/EmptyState";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import PropertyGrid from "../../components/PropertyCard/PropertyGrid";
import { PROPERTIES, getProperty } from "../../data/properties";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { plural, priceText } from "../../utils/format";

export default function Saved() {
  useDocumentTitle("Saved Properties");
  const { saved, clearSaved, setCompare, toast, maxCompare } = useApp();
  const navigate = useNavigate();
  const [sort, setSort] = useState("added");
  const [selected, setSelected] = useState([]);

  const list = useMemo(() => {
    const items = saved.map(getProperty).filter(Boolean);
    if (sort === "lo") return items.sort((a, b) => a.price - b.price);
    if (sort === "hi") return items.sort((a, b) => b.price - a.price);
    return items.reverse();
  }, [saved, sort]);
  const sel = selected.filter((id) => saved.includes(id));
  const recs = PROPERTIES.filter((p) => !saved.includes(p.id) && p.featured).slice(0, 3);

  const toggleSel = (id, checked) => {
    if (checked && sel.length >= maxCompare) { toast("Select up to 3 properties to compare"); return; }
    setSelected(checked ? [...sel, id] : sel.filter((x) => x !== id));
  };
  const shareList = () => {
    const txt = "My shortlisted properties:\n" + list.map((p) => `• ${p.title}, ${p.loc} — ${priceText(p)}`).join("\n");
    navigator.clipboard?.writeText(txt).then(() => toast("Shortlist copied — paste it anywhere to share"), () => toast("Copying isn't available in this browser"));
  };

  return (
    <>
      <PageHero title="Saved" highlight="Properties" crumbs={[["Saved Properties"]]} lead="Your shortlist, saved on this device. Select two or three to compare side by side." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          {list.length > 0 && (
            <div className="saved-bar toolbar">
              <span className="count"><b className="num">{list.length}</b> saved {plural(list.length, "property", "properties")}</span>
              <div className="flex">
                <select className="select select--sm" id="savedSort" style={{ width: "auto" }} aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="added">Recently saved</option>
                  <option value="lo">Price: low to high</option>
                  <option value="hi">Price: high to low</option>
                </select>
                <button type="button" className="btn btn--navy btn--sm" disabled={sel.length < 2} onClick={() => { setCompare(sel); navigate("/compare"); }}>
                  Compare selected (<span className="num">{sel.length}</span>)
                </button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={shareList}>Share list</button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => { clearSaved(); toast("Saved list cleared"); }}>Clear all</button>
              </div>
            </div>
          )}
          <div className="pgrid">
            {list.length ? list.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i}>
                <label className="check select-check" style={{ position: "absolute", top: "auto" }}>
                  <input type="checkbox" checked={sel.includes(p.id)} onChange={(e) => toggleSel(p.id, e.target.checked)} /> Select
                </label>
              </PropertyCard>
            )) : (
              <EmptyState title="No saved properties yet" text="Tap the heart on any property to add it to your shortlist. It stays saved on this device.">
                <Link className="btn btn--primary" to="/properties">Browse properties</Link>
              </EmptyState>
            )}
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="You May Also" highlight="Like" />
          <PropertyGrid properties={recs} />
        </div>
      </section>
    </>
  );
}
