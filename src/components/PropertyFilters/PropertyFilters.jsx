import Icon from "../../assets/icons/Icon";
import { CITIES, MODE_TYPES, TYPES } from "../../data/site";
import { PROPERTIES } from "../../data/properties";
import { PRICE_STEPS, formatPriceStep, localitiesFor } from "../../utils/propertyFilters";

const BHK = [["1", "1 BHK"], ["2", "2 BHK"], ["3", "3 BHK"], ["4", "4+ BHK"]];
const FURN = [["Furnished", "Furnished"], ["Semi-furnished", "Semi"], ["Unfurnished", "Unfurnished"]];
const MODES = [["buy", "Buy"], ["rent", "Rent"], ["commercial", "Commercial"]];

const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

/** Sidebar filters (slides in as a drawer on tablets and phones). */
export default function PropertyFilters({ filters: f, onChange, onReset, open, onClose }) {
  const steps = PRICE_STEPS[f.mode];
  const set = (patch) => onChange({ ...f, ...patch, page: 1 });

  return (
    <>
      <div className={`filter-scrim ${open ? "is-open" : ""}`} onClick={onClose} />
      <aside className={open ? "is-open" : ""} aria-label="Filters">
        <div className="filter-panel">
          <div className="filter-head">
            <h3 style={{ fontSize: 18 }}>Filters</h3>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close filters"><Icon name="x" strokeWidth={2} /></button>
          </div>

          <div className="filter-group">
            <h4>Looking to</h4>
            <div className="seg">
              {MODES.map(([v, l]) => (
                <button key={v} type="button" aria-pressed={f.mode === v} onClick={() => set({ mode: v, types: [], min: 0, max: 0, lease: false })}>{l}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Location</h4>
            <select className="select select--sm" id="fCity" aria-label="City" value={f.city} onChange={(e) => set({ city: e.target.value })}>
              <option value="">All cities</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="opts" style={{ marginTop: 10 }}>
              {localitiesFor(f.mode, f.city).map((l) => {
                const on = f.q.toLowerCase() === l.toLowerCase();
                return <button key={l} type="button" className="chip" aria-pressed={on} style={{ fontSize: 12, padding: "4px 10px" }} onClick={() => set({ q: on ? "" : l })}>{l}</button>;
              })}
            </div>
          </div>

          <div className="filter-group">
            <h4>Property type</h4>
            <div className="checks">
              {MODE_TYPES[f.mode].map((t) => (
                <label key={t} className="check">
                  <input type="checkbox" checked={f.types.includes(t)} onChange={() => set({ types: toggle(f.types, t) })} /> {TYPES[t]}
                  <span className="muted num" style={{ marginLeft: "auto", fontSize: 12 }}>{PROPERTIES.filter((p) => p.mode === f.mode && p.type === t).length}</span>
                </label>
              ))}
              {f.mode === "commercial" && (
                <label className="check"><input type="checkbox" checked={f.lease} onChange={(e) => set({ lease: e.target.checked })} /> Lease only</label>
              )}
            </div>
          </div>

          {f.mode !== "commercial" && (
            <div className="filter-group">
              <h4>Bedrooms</h4>
              <div className="opts">
                {BHK.map(([v, l]) => <button key={v} type="button" className="chip" aria-pressed={f.bhk.includes(v)} onClick={() => set({ bhk: toggle(f.bhk, v) })}>{l}</button>)}
              </div>
            </div>
          )}

          <div className="filter-group">
            <h4>Price {f.mode === "rent" && <span className="muted num" style={{ fontWeight: 400, letterSpacing: 0 }}>(per month)</span>}</h4>
            <div className="range-row">
              <select className="select select--sm" aria-label="Minimum price" value={f.min} onChange={(e) => set({ min: Number(e.target.value) })}>
                {steps.map((v) => <option key={v} value={v}>{v ? formatPriceStep(f.mode, v) : "No min"}</option>)}
              </select>
              <span>to</span>
              <select className="select select--sm" aria-label="Maximum price" value={f.max} onChange={(e) => set({ max: Number(e.target.value) })}>
                <option value={0}>No max</option>
                {steps.slice(1).map((v) => <option key={v} value={v}>{formatPriceStep(f.mode, v)}</option>)}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <h4>Furnishing</h4>
            <div className="opts">
              {FURN.map(([v, l]) => <button key={v} type="button" className="chip" aria-pressed={f.furn.includes(v)} onClick={() => set({ furn: toggle(f.furn, v) })}>{l}</button>)}
            </div>
          </div>

          <div className="filter-group">
            <h4>Status</h4>
            <div className="checks">
              <label className="check"><input type="checkbox" checked={f.ready} onChange={(e) => set({ ready: e.target.checked })} /> Ready to move / available now</label>
              <label className="check"><input type="checkbox" checked={f.fresh} onChange={(e) => set({ fresh: e.target.checked })} /> New launch / under construction</label>
              <label className="check"><input type="checkbox" checked={f.savedOnly} onChange={(e) => set({ savedOnly: e.target.checked })} /> Saved properties only</label>
            </div>
          </div>

          <button type="button" className="btn btn--ghost btn--block" onClick={onReset}>Reset all filters</button>
          <button type="button" className="btn btn--primary btn--block filter-open" onClick={onClose}>Show results</button>
        </div>
      </aside>
    </>
  );
}
