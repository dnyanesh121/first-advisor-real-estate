import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Avatar from "../../components/common/Avatar";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import Stars from "../../components/common/Stars";
import SvgArt from "../../components/common/SvgArt";
import Tabs from "../../components/common/Tabs";
import PropertyGallery from "../../components/PropertyGallery/PropertyGallery";
import PropertyGrid from "../../components/PropertyCard/PropertyGrid";
import { CompareButton, SaveButton } from "../../components/PropertyCard/PropertyCard";
import ScheduleVisitForm from "../../components/ScheduleVisit/ScheduleVisitForm";
import ContactAgentForm from "../../components/ScheduleVisit/ContactAgentForm";
import { PROPERTIES, getProperty } from "../../data/properties";
import { getAgent } from "../../data/agents";
import { SITE, TYPES } from "../../data/site";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { floorPlanSVG, mapSVG } from "../../utils/art";
import { areaText, emi, inr, listingId, modeLabel, pricePerSqft, priceText, shortInr } from "../../utils/format";

function facts(p) {
  if (p.type === "plot") return [["area", "Plot area", areaText(p)], ["compass", "Facing", p.facing], ["doc", "Title", p.status], ["clock", "Listed", `${p.days} days ago`]];
  if (p.mode === "commercial") return [["area", "Carpet area", areaText(p)], ["layers", "Floor", p.floor], ["sofa", "Furnishing", p.furn], ["car", "Parking", `${p.parking} slots`]];
  return [["bed", "Configuration", p.bhkLabel], ["bath", "Bathrooms", p.baths], ["area", "Carpet area", areaText(p)], ["car", "Parking", `${p.parking} covered`]];
}
function documents(p) {
  if (p.type === "plot") return ["7/12 extract", "NA order", "Layout approval", "Mutation entries", "Encumbrance search", "Owner ID & PAN"];
  if (p.status === "Under construction") return ["MahaRERA registration", "Commencement certificate", "Approved plans", "Title report", "Builder track record", "Bank approvals"];
  return ["Title deed chain", "Occupation certificate (OC)", "Society NOC", "Share certificate", "Property tax receipts", "Encumbrance search"];
}

function EmiEstimate({ property: p }) {
  const [dp, setDp] = useState(20);
  const loan = p.price * (1 - dp / 100);
  return (
    <Reveal className="panel">
      <h2>EMI <em>Estimate</em></h2>
      <div className="mini-emi"><span>With <b>{dp}</b>% down payment at <b>8.5%</b> for <b>20 years</b></span><b className="num">{inr(emi(loan, 8.5, 20))}/mo</b></div>
      <input type="range" id="dp" min="10" max="60" step="5" value={dp} onChange={(e) => setDp(Number(e.target.value))} aria-label="Down payment percent" style={{ marginTop: 14 }} />
      <div className="flex between" style={{ fontSize: 13, marginTop: 8 }}>
        <span className="muted">Loan amount <b className="num" style={{ color: "var(--navy)" }}>{shortInr(loan)}</b></span>
        <Link className="link-arrow" to={`/mortgage-calculator?price=${p.price}&dp=${dp}`}>Open full calculator <Icon name="arrow" strokeWidth={2} /></Link>
      </div>
    </Reveal>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const p = getProperty(id);
  const { toast } = useApp();
  useDocumentTitle(p ? `${p.title} — ${p.loc}` : "Property not found");
  const similar = useMemo(() => (p ? PROPERTIES.filter((q) => q.id !== p.id && q.mode === p.mode)
    .sort((a, b) => (b.city === p.city) - (a.city === p.city) || (b.type === p.type) - (a.type === p.type) || Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, 3) : []), [p]);
  if (!p) return <Navigate to="/404" replace />;

  const agent = getAgent(p.agent);
  const mode = modeLabel(p);
  const price = priceText(p);
  const near = [["Metro / railway station", 0.6 + (p.id % 5) * 0.3], ["School", 0.4 + (p.id % 3) * 0.4], ["Hospital", 1.1 + (p.id % 4) * 0.3], ["Shopping mall", 1.5 + (p.id % 6) * 0.4], ["Highway access", 0.8 + (p.id % 2)], ["Airport", 8 + (p.id % 9)]];
  const details = [
    ["Property type", TYPES[p.type]], ["Status", p.status + (p.possession ? ` (${p.possession})` : "")], ["Furnishing", p.furn], ["Floor", p.floor],
    ["Facing", p.facing], ["Property age", p.age], [p.rentLike ? "Security deposit" : "Price per sq ft", p.rentLike ? shortInr(p.deposit) : inr(pricePerSqft(p))], ["Listing ID", listingId(p)]
  ];
  if (p.rera) details.push(["MahaRERA", p.rera]);

  const share = () => {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: p.title, url }).catch(() => {});
    else navigator.clipboard?.writeText(url).then(() => toast("Link copied to clipboard"), () => toast(`Copy this link: ${url}`));
  };

  return (
    <>
      <section className="page-hero" style={{ paddingBlock: "20px 0", background: "linear-gradient(180deg,#EEF4FA,var(--bg))" }}>
        <div className="container">
          <div className="rise">
            <Breadcrumbs crumbs={[[mode, `/properties?mode=${p.mode}`], [p.city, `/properties?mode=${p.mode}&city=${encodeURIComponent(p.city)}`], [p.title]]} />
          </div>
          <div className="pd-head rise d1">
            <div>
              <div className="flex" style={{ gap: 6 }}>
                <span className="badge badge--ok"><Icon name="check" size={12} />Verified by advisor</span>
                <span className="badge">{mode}</span>
                <span className="badge badge--soft">{TYPES[p.type]}</span>
                {p.status === "Under construction" && <span className="badge badge--accent">Possession {p.possession}</span>}
              </div>
              <h1 style={{ marginTop: 10 }}>{p.title}</h1>
              <div className="loc"><Icon name="pin" />{p.loc}, {p.city}</div>
            </div>
            <div className="pd-price">
              <div className="amt num">{p.rentLike ? <>{price.replace("/month", "")}<small>/month</small></> : price}</div>
              <small className="num">{p.rentLike ? `Deposit ${shortInr(p.deposit)}` : `${inr(pricePerSqft(p))} per sq ft · ${areaText(p)}`}</small>
              <div className="pd-actions">
                <SaveButton id={p.id} title={p.title} className="btn btn--ghost btn--sm">Save</SaveButton>
                <CompareButton id={p.id} title={p.title} className="btn btn--ghost btn--sm">Compare</CompareButton>
                <button type="button" className="btn btn--ghost btn--sm" onClick={share}><Icon name="share" />Share</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PropertyGallery key={p.id} property={p} />

          <div className="pd-layout">
            <div>
              <Reveal className="panel">
                <div className="facts num">
                  {facts(p).map(([icon, label, value]) => <div key={label}><Icon name={icon} /><span><b>{value}</b>{label}</span></div>)}
                </div>
              </Reveal>

              <Reveal className="panel">
                <h2>Property <em>Overview</em></h2>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.75 }}>{p.desc}</p>
                <dl className="kvlist num" style={{ fontSize: 14, gap: "10px 28px", gridTemplateColumns: "repeat(2,auto 1fr)" }}>
                  {details.map(([k, v]) => [<dt key={`${k}t`}>{k}</dt>, <dd key={`${k}d`}><b style={{ fontWeight: 500, color: "var(--navy)" }}>{v}</b></dd>])}
                </dl>
              </Reveal>

              <Reveal className="panel">
                <h2>Amenities &amp; <em>Features</em></h2>
                <div className="amen-grid">
                  {[...p.amen, "24×7 water supply", "Advisor-verified"].map((a) => <span key={a}><Icon name="check" />{a}</span>)}
                </div>
              </Reveal>

              <Reveal className="panel">
                <Tabs label="Plan and location" tabs={[
                  { id: "plan", label: "Floor plan", content: (<><div className="plan-svg"><SvgArt html={floorPlanSVG(p)} /></div><p className="muted" style={{ fontSize: 12.5, margin: "10px 0 0" }}>Indicative layout for illustration. Ask your advisor for the approved plan.</p></>) },
                  { id: "loc", label: "Location & nearby", content: (<><div className="map-box"><SvgArt html={mapSVG(p.id, `${p.loc}, ${p.city}`)} /></div><div className="nearby num">{near.map(([n, km]) => <div key={n}><span>{n}</span><b>{km.toFixed(1)} km</b></div>)}</div></>) },
                  { id: "docs", label: "Documents checked", content: (<><div className="amen-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>{documents(p).map((d) => <span key={d}><Icon name="shield" />{d}</span>)}</div><p className="muted" style={{ fontSize: 12.5, margin: "12px 0 0" }}>Our checks are a starting point. We recommend an independent legal review before payment.</p></>) }
                ]} />
              </Reveal>

              {!p.rentLike && <EmiEstimate property={p} />}
            </div>

            <aside className="pd-side" id="contact">
              <div className="panel">
                <div className="agent-box">
                  <Avatar person={agent} size="lg" />
                  <div><span>Listed by</span><b>{agent.name}</b><span>{agent.role}</span><div><Stars value={agent.rating} /> <span className="num">{agent.rating}</span></div></div>
                </div>
                <div className="flex mt-4">
                  <a className="btn btn--outline btn--sm" style={{ flex: 1 }} href={`tel:${SITE.phoneRaw}`}><Icon name="phone" />Call</a>
                  <Link className="btn btn--ghost btn--sm" style={{ flex: 1 }} to={`/agents/${agent.id}`}>View profile</Link>
                </div>
              </div>
              <div className="panel">
                <Tabs label="Contact options" style={{ marginBottom: 16 }} tabs={[
                  { id: "visit", label: "Schedule Visit", content: <ScheduleVisitForm property={p} /> },
                  { id: "msg", label: "Contact Agent", content: <ContactAgentForm property={p} agent={agent} /> }
                ]} />
              </div>
              <div className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
                <b style={{ display: "block", fontSize: 16 }}>Need a home loan?</b>
                <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>Compare offers from leading banks through First Advisor Loans.</p>
                <Link className="btn btn--white btn--sm" to="/mortgage-calculator">Check eligibility</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Similar" highlight="Properties" subtitle="More verified options you may like" />
          <PropertyGrid properties={similar} />
        </div>
      </section>
    </>
  );
}
