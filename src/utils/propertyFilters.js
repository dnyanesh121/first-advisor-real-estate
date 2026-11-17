/* Pure helpers for the properties listing: read filters from the URL, filter and sort. */
import { PROPERTIES } from "../data/properties";
import { TYPES } from "../data/site";
import { shortInr } from "./format";

export const PRICE_STEPS = {
  buy: [0, 5e6, 1e7, 2e7, 5e7, 1e8],
  rent: [0, 25000, 50000, 100000, 200000],
  commercial: [0, 5e6, 2e7, 5e7]
};

const list = (v) => (v ? v.split(",").filter(Boolean) : []);

export function readFilters(params) {
  const modeParam = params.get("mode");
  const mode = ["buy", "rent", "commercial"].includes(modeParam) ? modeParam : "buy";
  let min = Number(params.get("min")) || 0;
  let max = Number(params.get("max")) || 0;
  const budget = params.get("budget");
  const lease = budget === "lease";
  if (budget && !lease) {
    const [a, b] = budget.split("-").map(Number);
    min = a || 0;
    max = b >= 1e12 ? 0 : b || 0;
  }
  return {
    mode,
    city: params.get("city") || "",
    q: params.get("q") || "",
    types: list(params.get("type")),
    bhk: list(params.get("bhk")),
    furn: list(params.get("furn")),
    min, max, lease,
    ready: params.get("ready") === "1",
    fresh: params.get("new") === "1" || params.get("status") === "Under construction",
    savedOnly: params.get("saved") === "1",
    sort: params.get("sort") || "new",
    page: Number(params.get("page")) || 1
  };
}

export function writeFilters(f) {
  const q = new URLSearchParams();
  if (f.mode !== "buy") q.set("mode", f.mode);
  if (f.city) q.set("city", f.city);
  if (f.q) q.set("q", f.q);
  if (f.types.length) q.set("type", f.types.join(","));
  if (f.bhk.length) q.set("bhk", f.bhk.join(","));
  if (f.furn.length) q.set("furn", f.furn.join(","));
  if (f.min) q.set("min", f.min);
  if (f.max) q.set("max", f.max);
  if (f.lease) q.set("budget", "lease");
  if (f.ready) q.set("ready", "1");
  if (f.fresh) q.set("new", "1");
  if (f.savedOnly) q.set("saved", "1");
  if (f.sort !== "new") q.set("sort", f.sort);
  if (f.page > 1) q.set("page", f.page);
  return q;
}

const SORTERS = {
  new: (a, b) => a.days - b.days,
  lo: (a, b) => a.price - b.price,
  hi: (a, b) => b.price - a.price,
  area: (a, b) => b.area - a.area,
  ppsf: (a, b) => a.price / a.area - b.price / b.area
};

const matchesBhk = (p, b) => (b === "4" ? p.bhk >= 4 : p.bhk === Number(b) || p.bhkLabel.includes(`${b} `));

export function filterProperties(f, saved = []) {
  const q = f.q.toLowerCase().trim();
  return PROPERTIES.filter((p) => {
    if (p.mode !== f.mode) return false;
    if (f.city && p.city !== f.city) return false;
    if (q && !`${p.title} ${p.loc} ${p.city} ${p.amen.join(" ")} ${p.facing} ${TYPES[p.type]}`.toLowerCase().includes(q)) return false;
    if (f.types.length && !f.types.includes(p.type)) return false;
    if (f.mode !== "commercial" && f.bhk.length && !f.bhk.some((b) => matchesBhk(p, b))) return false;
    if (f.furn.length && !f.furn.includes(p.furn)) return false;
    if (f.lease && !p.lease) return false;
    if (f.min && (p.priceMax || p.price) < f.min) return false;
    if (f.max && p.price > f.max) return false;
    if (f.ready && !/Ready|Available now/.test(p.status)) return false;
    if (f.fresh && p.status !== "Under construction") return false;
    if (f.savedOnly && !saved.includes(p.id)) return false;
    return true;
  }).sort(SORTERS[f.sort] || SORTERS.new);
}

export const formatPriceStep = (mode, v) => (mode === "rent" ? (v >= 1e5 ? shortInr(v) : `₹${v / 1000}k`) : shortInr(v));

export function localitiesFor(mode, city) {
  const set = new Set();
  PROPERTIES.forEach((p) => {
    if (p.mode === mode && (!city || p.city === city)) set.add(p.loc.split(",")[0].replace(/Sector \d+/, "").trim() || p.loc);
  });
  return [...set].slice(0, 8);
}
