import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import PageHero from "../../components/common/PageHero";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import BlogCard from "../../components/BlogCard/BlogCard";
import NewsletterPanel from "./NewsletterPanel";
import { BLOGS, BLOG_CATS } from "../../data/blogs";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const PER_PAGE = 4;
const featured = BLOGS.find((b) => b.featured);
const countIn = (c) => (c === "All" ? BLOGS.length : BLOGS.filter((b) => b.cat === c).length);

export default function Blog() {
  useDocumentTitle("Blog & Property Guides");
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "All";
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const setCat = (c) => { setPage(1); setParams(c === "All" ? {} : { cat: c }, { replace: true }); };
  const results = useMemo(() => {
    const s = q.toLowerCase();
    return BLOGS.filter((b) => (cat === "All" || b.cat === cat) && (!s || `${b.title} ${b.excerpt} ${b.cat}`.toLowerCase().includes(s)) && (cat !== "All" || s || b !== featured));
  }, [cat, q]);
  const popular = [...BLOGS].sort((a, b) => b.read - a.read).slice(0, 4);

  return (
    <>
      <PageHero title="Guides &" highlight="Insights" crumbs={[["Blog"]]} lead="Practical advice on buying, selling, renting, home loans and the Maharashtra property market." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}><BlogCard post={featured} wide /></div>
          <div className="blog-layout">
            <div>
              <div className="toolbar" style={{ marginBottom: 20 }}>
                <span className="count"><b className="num">{results.length}</b> articles{cat !== "All" && ` in ${cat}`}</span>
                <div className="opts flex" style={{ gap: 6 }}>
                  {BLOG_CATS.slice(0, 5).map((c) => <button key={c} type="button" className="chip" aria-pressed={c === cat} style={{ fontSize: 12.5, padding: "4px 12px" }} onClick={() => setCat(c)}>{c}</button>)}
                </div>
              </div>
              <div className="grid grid-2" key={`${cat}|${q}|${page}`}>
                {results.length
                  ? results.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((b, i) => <BlogCard key={b.id} post={b} index={i} />)
                  : <EmptyState title="No articles found" text="Try a different keyword or category." />}
              </div>
              <Pagination total={results.length} perPage={PER_PAGE} page={page} onChange={(p) => { setPage(p); window.scrollTo({ top: 380, behavior: "smooth" }); }} />
            </div>
            <aside className="blog-side">
              <div className="panel">
                <div className="faq-search" style={{ margin: 0 }}>
                  <Icon name="search" strokeWidth={2} />
                  <input className="input" id="blogSearch" type="search" placeholder="Search articles" aria-label="Search articles" style={{ minHeight: 46, boxShadow: "none", borderColor: "var(--line-2)" }} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
                </div>
              </div>
              <div className="panel">
                <h2 style={{ fontSize: 17 }}>Categories</h2>
                <ul className="cat-list">
                  {BLOG_CATS.map((c) => <li key={c}><button type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}<span className="num">{countIn(c)}</span></button></li>)}
                </ul>
              </div>
              <div className="panel">
                <h2 style={{ fontSize: 17 }}>Popular <em>reads</em></h2>
                <div className="stack" style={{ fontSize: 13.5 }}>
                  {popular.map((b, i) => (
                    <Link key={b.id} to={`/blog/${b.id}`} className="flex" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
                      <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: 18, lineHeight: 1.2 }}>0{i + 1}</span>
                      <span><b style={{ fontWeight: 500, color: "var(--navy)", display: "block", lineHeight: 1.4 }}>{b.title}</b><span className="muted" style={{ fontSize: 12 }}>{b.read} min read</span></span>
                    </Link>
                  ))}
                </div>
              </div>
              <NewsletterPanel />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
