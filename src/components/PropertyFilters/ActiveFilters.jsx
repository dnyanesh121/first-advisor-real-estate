import { TYPES } from "../../data/site";
import { formatPriceStep } from "../../utils/propertyFilters";

/** Removable chips summarising the current filters. */
export default function ActiveFilters({ filters: f, onChange, onReset }) {
  const set = (patch) => onChange({ ...f, ...patch, page: 1 });
  const chips = [];
  if (f.city) chips.push([f.city, { city: "" }]);
  if (f.q) chips.push([`“${f.q}”`, { q: "" }]);
  f.types.forEach((t) => chips.push([TYPES[t], { types: f.types.filter((x) => x !== t) }]));
  f.bhk.forEach((b) => chips.push([b === "4" ? "4+ BHK" : `${b} BHK`, { bhk: f.bhk.filter((x) => x !== b) }]));
  f.furn.forEach((x) => chips.push([x, { furn: f.furn.filter((y) => y !== x) }]));
  if (f.min || f.max) chips.push([`${f.min ? formatPriceStep(f.mode, f.min) : "Any"} – ${f.max ? formatPriceStep(f.mode, f.max) : "Any"}`, { min: 0, max: 0 }]);
  if (f.lease) chips.push(["Lease only", { lease: false }]);
  if (f.ready) chips.push(["Ready to move", { ready: false }]);
  if (f.fresh) chips.push(["New launch", { fresh: false }]);
  if (f.savedOnly) chips.push(["Saved only", { savedOnly: false }]);
  if (!chips.length) return null;
  return (
    <div className="active-filters">
      {chips.map(([label, patch]) => (
        <button key={label} type="button" className="chip is-active" onClick={() => set(patch)} aria-label={`Remove filter ${label.replace(/[“”]/g, "")}`}>
          {label} <span className="x">✕</span>
        </button>
      ))}
      {chips.length > 1 && <button type="button" className="chip" onClick={onReset}>Clear all</button>}
    </div>
  );
}
