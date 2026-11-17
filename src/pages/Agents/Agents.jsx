import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import CtaBand from "../../components/common/CtaBand";
import EmptyState from "../../components/common/EmptyState";
import AgentCard from "../../components/AgentCard/AgentCard";
import { AGENTS } from "../../data/agents";
import { CITIES } from "../../data/site";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const SPECS = ["All", "Residential", "Commercial", "Rentals", "Plots", "Luxury", "Home Loans", "NRI Buyers"];

export default function Agents() {
  useDocumentTitle("Our Property Advisors");
  const { openModal } = useApp();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [spec, setSpec] = useState("All");

  const results = useMemo(() => AGENTS.filter((a) =>
    (!city || a.city === city) &&
    (spec === "All" || a.spec.join(" ").includes(spec)) &&
    (!q || `${a.name} ${a.area} ${a.role}`.toLowerCase().includes(q.toLowerCase()))
  ), [q, city, spec]);

  return (
    <>
      <PageHero title="Meet Our" highlight="Advisors" crumbs={[["Our Advisors"]]} lead="One advisor handles your site visits, legal checks, home loan and registration. Find the right specialist for your city and need." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <Reveal className="toolbar" style={{ marginBottom: 22 }}>
            <div className="flex" style={{ flex: 1 }}>
              <div style={{ flex: 1, minWidth: 200, maxWidth: 340 }}>
                <input className="input input--sm" id="agentSearch" type="search" placeholder="Search by name or area" aria-label="Search advisors" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <select className="select select--sm" id="agentCity" style={{ width: "auto" }} aria-label="City" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All cities</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="opts flex" role="group" aria-label="Speciality">
              {SPECS.map((s) => <button key={s} type="button" className="chip" aria-pressed={s === spec} onClick={() => setSpec(s)}>{s}</button>)}
            </div>
          </Reveal>
          <p className="count muted" style={{ margin: "0 0 16px" }}><b className="num" style={{ color: "var(--navy)" }}>{results.length}</b> advisors{city && ` in ${city}`}</p>
          <div className="grid grid-4" key={`${q}|${city}|${spec}`}>
            {results.length ? results.map((a, i) => <AgentCard key={a.id} agent={a} index={i} />) : (
              <EmptyState title="No advisors match" text="Try another city or speciality.">
                <button type="button" className="btn btn--outline" onClick={() => openModal("consult")}>Ask us to assign one</button>
              </EmptyState>
            )}
          </div>
          <p className="center mt-6"><span className="sample-note">Advisor profiles are sample content for this demo</span></p>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <CtaBand title="Are you a property professional?" highlight="Join us." text="We're hiring advisors across Mumbai, Thane, Navi Mumbai and Pune.">
            <Link className="btn btn--primary btn--lg" to="/contact?service=Careers">Apply Now</Link>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
