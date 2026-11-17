/* Indian number / price / date formatting helpers */

export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const shortInr = (n) => {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(2).replace(/\.?0+$/, "") + " L";
  return inr(n);
};

export const priceText = (p) => {
  if (p.rentLike) return inr(p.price) + "/month";
  if (p.priceMax) return shortInr(p.price) + " – " + shortInr(p.priceMax).replace("₹", "");
  return shortInr(p.price);
};

export const areaText = (p) =>
  p.area.toLocaleString("en-IN") + (p.areaMax ? "–" + p.areaMax.toLocaleString("en-IN") : "") + " sq ft";

export const pricePerSqft = (p) => (p.rentLike ? null : Math.round(p.price / p.area));

export const emi = (principal, rate, years) => {
  const m = rate / 12 / 100;
  const n = years * 12;
  return m ? (principal * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1) : principal / n;
};

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const initials = (name) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("");

export const listingId = (p) => "FA-RE-" + String(p.id).padStart(4, "0");

export const modeLabel = (p) =>
  p.mode === "rent" ? "For Rent" : p.lease ? "For Lease" : p.mode === "commercial" ? "Commercial" : "For Sale";

export const plural = (n, one, many) => (n === 1 ? one : many);
