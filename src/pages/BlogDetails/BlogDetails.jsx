import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Avatar from "../../components/common/Avatar";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import Photo from "../../components/common/Photo";
import BlogCard from "../../components/BlogCard/BlogCard";
import NewsletterPanel from "../Blog/NewsletterPanel";
import { BLOGS, getBlog } from "../../data/blogs";
import { getAgent } from "../../data/agents";
import { HERO, scenePhoto } from "../../data/images";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { formatDate } from "../../utils/format";

/** Reading progress bar + table-of-contents scroll-spy. */
function useReadingProgress(headingSelector, deps) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const body = document.getElementById("article-body");
      if (!body) return;
      const r = body.getBoundingClientRect();
      const h = r.height - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(100, (-r.top / h) * 100)));
      let cur = 0;
      document.querySelectorAll(headingSelector).forEach((hd, i) => { if (hd.getBoundingClientRect().top < 140) cur = i; });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return [progress, active];
}

export default function BlogDetails() {
  const { id } = useParams();
  const b = getBlog(id);
  const { openModal, toast } = useApp();
  useDocumentTitle(b ? b.title : "Article not found");
  const [progress, active] = useReadingProgress("#article-body h2", [id]);
  if (!b) return <Navigate to="/404" replace />;

  const author = getAgent(b.author);
  const cover = scenePhoto(b.scene, b.id);
  const idx = BLOGS.indexOf(b);
  const prev = BLOGS[idx - 1];
  const next = BLOGS[idx + 1];
  const related = BLOGS.filter((x) => x.id !== b.id).sort((x, y) => (y.cat === b.cat) - (x.cat === b.cat)).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <section className="page-hero page-hero--photo">
        <Photo className="page-hero__img" src={HERO.src} alt="" aria-hidden="true" eager sizes="(max-width: 760px) 100vw, 64vw" />
        <div className="container">
          <div className="rise"><Breadcrumbs crumbs={[["Blog", "/blog"], [b.cat, `/blog?cat=${encodeURIComponent(b.cat)}`]]} /></div>
          <span className="badge badge--accent rise d1" style={{ marginTop: 16 }}>{b.cat}</span>
          <h1 className="rise d1" style={{ maxWidth: "24ch" }}>{b.title}</h1>
          <div className="flex rise d2" style={{ marginTop: 16 }}>
            <Avatar person={author} size="sm" />
            <span style={{ fontSize: 14 }}><b style={{ color: "var(--navy)", fontWeight: 500 }}>{author.name}</b> · <span className="muted">{formatDate(b.date)} · {b.read} min read</span></span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal variant="zoom" className="article-hero" style={{ marginTop: -24 }}><Photo src={cover.src} alt={cover.alt} eager sizes="(max-width: 1240px) 100vw, 1200px" /></Reveal>
          <div className="blog-layout" style={{ marginTop: 36 }}>
            <article>
              <div className="article" id="article-body">
                <p style={{ fontSize: 18.5, color: "var(--ink)" }}>{b.excerpt}</p>
                {b.body.map(([heading, text], i) => (
                  <div key={heading}>
                    <h2 id={`s${i}`}>{heading}</h2>
                    <p>{text}</p>
                    {i === 0 && <blockquote>Always ask for the carpet area, the all-in cost and the document checklist in writing before paying any token amount.</blockquote>}
                    {i === 1 && <ul><li>Keep six months of EMIs as an emergency buffer.</li><li>Compare at least three lenders on rate, fees and reset terms.</li><li>Read the sanction letter conditions carefully.</li></ul>}
                  </div>
                ))}
                <div className="callout"><b style={{ color: "var(--accent)" }}>Need help with your situation?</b> Our advisors explain these steps for your specific property at no cost. <Link className="link" to="/contact">Request a callback →</Link></div>
              </div>
              <div className="flex between" style={{ borderTop: "1px solid var(--line)", paddingTop: 18, marginTop: 10 }}>
                <div className="flex">{[b.cat, "Maharashtra", "Real estate"].map((t) => <span key={t} className="chip" style={{ fontSize: 12, padding: "3px 10px" }}>#{t}</span>)}</div>
                <div className="share">
                  <span className="muted" style={{ fontSize: 13 }}>Share:</span>
                  <button type="button" className="icon-btn" aria-label="Copy link" onClick={() => navigator.clipboard?.writeText(url).then(() => toast("Link copied"))}><Icon name="link" /></button>
                  <a className="icon-btn" href={`https://wa.me/?text=${encodeURIComponent(`${b.title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><Icon name="whats" /></a>
                  <a className="icon-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Icon name="in" /></a>
                </div>
              </div>
              <div className="author-box">
                <Avatar person={author} size="lg" />
                <div>
                  <span className="muted" style={{ fontSize: 12 }}>Written by</span>
                  <b style={{ display: "block", color: "var(--navy)", fontSize: 17 }}>{author.name}</b>
                  <span className="muted" style={{ fontSize: 13 }}>{author.role}, {author.exp} years in Maharashtra real estate.</span><br />
                  <Link className="link" style={{ fontSize: 13 }} to={`/agents/${author.id}`}>View profile →</Link>
                </div>
              </div>
              <div className="flex between mt-8">
                {prev ? <Link className="btn btn--ghost" to={`/blog/${prev.id}`}>← Previous article</Link> : <span />}
                {next && <Link className="btn btn--ghost" to={`/blog/${next.id}`}>Next article →</Link>}
              </div>
            </article>
            <aside className="blog-side">
              <div className="panel toc">
                <h2 style={{ fontSize: 17 }}>In this <em>article</em></h2>
                <ol>{b.body.map(([heading], i) => <li key={heading}><a href={`#s${i}`} className={i === active ? "is-active" : ""} onClick={(e) => { e.preventDefault(); document.getElementById(`s${i}`)?.scrollIntoView({ behavior: "smooth" }); }}>{heading}</a></li>)}</ol>
              </div>
              <div className="panel">
                <b style={{ color: "var(--navy)", fontSize: 16 }}>Talk to an advisor</b>
                <p className="muted" style={{ fontSize: 13, margin: "6px 0 12px" }}>Have a question about your own situation? We&apos;ll call you back.</p>
                <button type="button" className="btn btn--primary btn--sm btn--block" onClick={() => openModal("consult")}>Request a Callback</button>
              </div>
              <NewsletterPanel id="article-email" />
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Related" highlight="Articles" />
          <div className="grid grid-3">{related.map((x, i) => <BlogCard key={x.id} post={x} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}
