import { useMemo, useState } from "react";
import Photo from "../../components/common/Photo";
import { HERO } from "../../data/images";
import Icon from "../../assets/icons/Icon";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import EmptyState from "../../components/common/EmptyState";
import Reveal from "../../components/common/Reveal";
import FaqAccordion from "../../components/Faq/FaqAccordion";
import { FAQS, FAQ_CATS } from "../../data/faqs";
import { SITE } from "../../data/site";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { plural } from "../../utils/format";

const countIn = (c) => (c === "All" ? FAQS.length : FAQS.filter((f) => f.cat === c).length);

export default function Faq() {
  useDocumentTitle("FAQs");
  const { openModal } = useApp();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = useMemo(() => FAQS.filter((f) => (cat === "All" || f.cat === cat) && (!query || `${f.q} ${f.a}`.toLowerCase().includes(query))), [cat, query]);

  return (
    <>
      <section className="page-hero page-hero--photo center">
        <Photo className="page-hero__img" src={HERO.src} alt="" aria-hidden="true" eager sizes="100vw" />
        <div className="container">
          <div className="rise"><Breadcrumbs crumbs={[["FAQs"]]} /></div>
          <h1 className="rise d1">Frequently Asked <em>Questions</em></h1>
          <p className="lead rise d2">Quick answers about buying, selling, renting, home loans and investing with First Advisors.</p>
          <div className="faq-search rise d3">
            <Icon name="search" strokeWidth={2} />
            <input className="input" id="faqSearch" type="search" placeholder="Search questions, e.g. stamp duty, deposit, NRI" aria-label="Search FAQs" value={q} onChange={(e) => { setQ(e.target.value); if (e.target.value) setCat("All"); }} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container faq-layout">
          <nav className="faq-cats panel" aria-label="FAQ categories" style={{ padding: 14 }}>
            <ul className="cat-list">
              {FAQ_CATS.map((c) => <li key={c}><button type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}<span className="num">{countIn(c)}</span></button></li>)}
            </ul>
          </nav>
          <div>
            <p className="muted" style={{ margin: "0 0 14px" }}>
              <b className="num" style={{ color: "var(--navy)" }}>{results.length}</b> {plural(results.length, "question", "questions")}
              {query ? ` matching “${q}”` : cat !== "All" ? ` in ${cat}` : ""}
            </p>
            {results.length
              ? <FaqAccordion key={`${cat}|${query}`} items={results} query={query} defaultOpen={0} />
              : <EmptyState title="No matching questions" text="Try different words, or ask us directly."><button type="button" className="btn btn--primary" onClick={() => openModal("consult")}>Ask an advisor</button></EmptyState>}
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <div className="grid grid-3">
            <Reveal className="info-card"><span className="ic"><Icon name="phone" /></span><div><b>Call us</b><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone} (toll free)</a></div></Reveal>
            <Reveal className="info-card" delay={0.08}><span className="ic"><Icon name="mail" /></span><div><b>Email us</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></Reveal>
            <Reveal className="info-card" delay={0.16}><span className="ic"><Icon name="clock" /></span><div><b>Still have a question?</b><a href="#callback" onClick={(e) => { e.preventDefault(); openModal("consult"); }}>Request a callback →</a></div></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
