import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import CtaBand from "../../components/common/CtaBand";
import Pagination from "../../components/common/Pagination";
import EmptyState from "../../components/common/EmptyState";
import PropertyFilters from "../../components/PropertyFilters/PropertyFilters";
import ActiveFilters from "../../components/PropertyFilters/ActiveFilters";
import PropertyGrid from "../../components/PropertyCard/PropertyGrid";
import { CITIES, SITE } from "../../data/site";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useLocalStorage from "../../hooks/useLocalStorage";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { filterProperties, readFilters, writeFilters } from "../../utils/propertyFilters";

const PER_PAGE = 9;
const LABEL = { buy: ["property for sale", "properties for sale"], rent: ["home for rent", "homes for rent"], commercial: ["commercial property", "commercial properties"] };
const BLANK = { city: "", q: "", types: [], bhk: [], furn: [], min: 0, max: 0, lease: false, ready: false, fresh: false, savedOnly: false, page: 1 };

export default function Properties() {
  useDocumentTitle("Properties for Sale & Rent");
  const { saved, openModal } = useApp();
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => readFilters(params), [params]);
  const [view, setView] = useLocalStorage("fa_view", "grid");
  const [drawer, setDrawer] = useState(false);
  const [keyword, setKeyword] = useState(filters.q);
  const resultsRef = useRef(null);
  useLockBodyScroll(drawer);

  const update = (next) => setParams(writeFilters(next), { replace: true });
  const reset = () => update({ ...filters, ...BLANK });

  // keep the search box in step with the URL, and debounce typing into it
  useEffect(() => { setKeyword(filters.q); }, [filters.q]);
  useEffect(() => {
    if (keyword === filters.q) return undefined;
    const t = setTimeout(() => update({ ...filters, q: keyword.trim(), page: 1 }), 250);
    return () => clearTimeout(t);
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => filterProperties(filters, saved), [filters, saved]);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const page = Math.min(filters.page, pages);
  const pageItems = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goPage = (p) => { update({ ...filters, page: p }); resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <>
      <PageHero title="Find Your" highlight="Property" crumbs={[["Properties"]]} lead="Verified homes, offices and plots across Mumbai, Thane, Navi Mumbai and Pune. Every listing is visited and checked by an advisor." />

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <Reveal as="form" className="searchbar" role="search" style={{ marginBottom: 28 }} onSubmit={(e) => { e.preventDefault(); update({ ...filters, q: keyword.trim(), page: 1 }); resultsRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
            <div className="pill">
              <div className="sb-field" style={{ flex: 2 }}>
                <Icon name="search" className="lead-ico" />
                <label className="sr-only" htmlFor="kw">Search by locality, project or keyword</label>
                <input id="kw" type="search" placeholder="Search locality, project or keyword (e.g. Powai, Baner, sea view)" autoComplete="off" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
              <div className="sb-field">
                <Icon name="pin" className="lead-ico" />
                <label className="sr-only" htmlFor="kwCity">City</label>
                <select id="kwCity" value={filters.city} onChange={(e) => update({ ...filters, city: e.target.value, page: 1 })}>
                  <option value="">All cities</option>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn--grad go" type="submit"><Icon name="search" strokeWidth={2.2} /> Search</button>
          </Reveal>

          <div className="listing">
            <PropertyFilters filters={filters} onChange={update} onReset={reset} open={drawer} onClose={() => setDrawer(false)} />

            <div className="results" ref={resultsRef}>
              <div className="toolbar">
                <div className="flex">
                  <button type="button" className="btn btn--outline btn--sm filter-open" onClick={() => setDrawer(true)}><Icon name="filter" strokeWidth={2} />Filters</button>
                  <span className="count" aria-live="polite"><b className="num">{results.length}</b> {LABEL[filters.mode][results.length === 1 ? 0 : 1]}{filters.city && <> in <b>{filters.city}</b></>}</span>
                </div>
                <div className="flex">
                  <label className="sr-only" htmlFor="sort">Sort by</label>
                  <select className="select select--sm" id="sort" style={{ width: "auto" }} value={filters.sort} onChange={(e) => update({ ...filters, sort: e.target.value, page: 1 })}>
                    <option value="new">Newest first</option>
                    <option value="lo">Price: low to high</option>
                    <option value="hi">Price: high to low</option>
                    <option value="area">Largest area</option>
                    <option value="ppsf">Best price / sq ft</option>
                  </select>
                  <div className="view-toggle" role="group" aria-label="View">
                    <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")}><Icon name="grid" /></button>
                    <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")}><Icon name="list" /></button>
                  </div>
                </div>
              </div>

              <ActiveFilters filters={filters} onChange={update} onReset={reset} />

              {results.length ? (
                <PropertyGrid key={`${params}`} properties={pageItems} list={view === "list"} />
              ) : (
                <div className="pgrid">
                  <EmptyState title="No properties match these filters" text="Try widening your budget, choosing another city, or removing a filter. Or ask an advisor to search for you.">
                    <button type="button" className="btn btn--outline" onClick={reset}>Clear all filters</button>
                    <button type="button" className="btn btn--primary" onClick={() => openModal("consult")}>Ask an advisor</button>
                  </EmptyState>
                </div>
              )}
              <Pagination total={results.length} perPage={PER_PAGE} page={page} onChange={goPage} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand title="Can't find what you need?" highlight="We'll search for you." text="Tell us your budget, area and timeline. An advisor shortlists matching verified homes within 24 hours.">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openModal("consult")}>Request a Callback</button>
            <a className="btn btn--white btn--lg" href={`tel:${SITE.phoneRaw}`}>Call {SITE.phone}</a>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
