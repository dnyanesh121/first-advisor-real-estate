/* ==========================================================================
   Diagram generators (SVG strings): floor plan, location map and the small
   404 / empty-state illustrations. Property photography lives in data/images.js.
   Rendered through <SvgArt />.
   ========================================================================== */
/* eslint-disable */

/* ---------- deterministic RNG ---------- */
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- Floor plan ---------- */
export function floorPlanSVG(p) {
  var rooms = p.type === "office" ? [["Open workspace", 20, 20, 300, 170], ["Cabin 1", 320, 20, 140, 80], ["Cabin 2", 320, 100, 140, 90], ["Pantry", 20, 190, 160, 90], ["Reception", 180, 190, 180, 90], ["WC", 360, 190, 100, 90]]
    : p.type === "shop" ? [["Retail floor", 20, 20, 340, 190], ["Store", 360, 20, 100, 120], ["WC", 360, 140, 100, 70], ["Frontage", 20, 210, 440, 70]]
    : p.type === "plot" ? [["Plot area " + p.area.toLocaleString("en-IN") + " sq.ft", 40, 30, 400, 230]]
    : p.bhk >= 3 ? [["Living / Dining", 20, 20, 230, 150], ["Kitchen", 250, 20, 110, 110], ["Utility", 360, 20, 100, 110], ["Master bed", 20, 170, 170, 110], ["Bed 2", 190, 170, 140, 110], ["Bed 3", 330, 130, 130, 150]]
    : p.bhk === 2 ? [["Living / Dining", 20, 20, 240, 150], ["Kitchen", 260, 20, 200, 100], ["Bath", 260, 120, 90, 50], ["Bath", 350, 120, 110, 50], ["Master bed", 20, 170, 220, 110], ["Bed 2", 240, 170, 220, 110]]
    : [["Living", 20, 20, 260, 160], ["Kitchen", 280, 20, 180, 100], ["Bath", 280, 120, 180, 60], ["Bedroom", 20, 180, 440, 100]];
  var s = '<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Indicative floor plan"><rect width="480" height="300" fill="#fff"/>';
  s += '<defs><pattern id="fpg" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#EEF2F7" stroke-width="1"/></pattern></defs><rect width="480" height="300" fill="url(#fpg)"/>';
  rooms.forEach(function (r, i) {
    s += '<rect x="' + r[1] + '" y="' + r[2] + '" width="' + r[3] + '" height="' + r[4] + '" fill="' + (i === 0 ? "#F1F5FC" : "#FBFCFE") + '" stroke="#003986" stroke-width="4"/>';
    s += '<text x="' + (r[1] + r[3] / 2) + '" y="' + (r[2] + r[4] / 2 + 4) + '" text-anchor="middle" font-family="Poppins,Arial" font-size="12" font-weight="500" fill="#003986">' + r[0] + "</text>";
    if (i > 0 && p.type !== "plot") s += '<path d="M' + (r[1] + 10) + "," + (r[2] + 2) + " a24,24 0 0 1 24,24" + '" fill="none" stroke="#E34A25" stroke-width="1.5" stroke-dasharray="3 3"/>';
  });
  s += '<g transform="translate(450 270)"><circle r="14" fill="#fff" stroke="#D5DDE8"/><path d="M0 -10 L4 4 L0 1 L-4 4Z" fill="#E34A25"/><text y="-16" text-anchor="middle" font-size="9" font-family="Poppins" fill="#5E6778">N</text></g>';
  return s + "</svg>";
};

/* ---------- Map (stylised, offline) ---------- */
export function mapSVG(seed, label) {
  var R = rng(seed || 7), s = '<svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of ' + (label || "location") + '"><rect width="600" height="300" fill="#EAF0F6"/>';
  s += '<path d="M0,240 C120,210 180,280 320,250 S520,220 600,260 V300 H0Z" fill="#BFD8F2"/>';
  for (var i = 0; i < 26; i++) s += '<rect x="' + (R() * 560) + '" y="' + (R() * 220) + '" width="' + (20 + R() * 50) + '" height="' + (14 + R() * 30) + '" rx="3" fill="#fff" opacity=".9"/>';
  s += '<circle cx="' + (80 + R() * 80) + '" cy="' + (60 + R() * 40) + '" r="34" fill="#CDE6C3"/>';
  s += '<path d="M0,120 C150,110 260,160 600,130" stroke="#fff" stroke-width="14" fill="none"/><path d="M0,120 C150,110 260,160 600,130" stroke="#FFD27A" stroke-width="4" fill="none"/>';
  s += '<path d="M220,0 C240,90 210,200 260,300" stroke="#fff" stroke-width="10" fill="none"/><path d="M420,0 L380,300" stroke="#fff" stroke-width="8" fill="none"/>';
  s += '<path d="M0,60 L600,40" stroke="#fff" stroke-width="6" fill="none"/>';
  s += '<g transform="translate(300 140)"><circle r="46" fill="#E34A25" opacity=".12"/><circle r="24" fill="#E34A25" opacity=".18"/><path d="M0,-34 C-14,-34 -22,-24 -22,-13 C-22,2 0,18 0,18 C0,18 22,2 22,-13 C22,-24 14,-34 0,-34Z" fill="#D6350F"/><circle cy="-14" r="7" fill="#fff"/></g>';
  s += '<g font-family="Poppins,Arial" font-size="11" fill="#5E6778"><text x="40" y="112">Metro line</text><text x="232" y="20">Main road</text><text x="460" y="276">Creek</text></g>';
  return s + "</svg>";
};

export function houseSVG() {
  return '<svg viewBox="0 0 320 200" aria-hidden="true"><ellipse cx="160" cy="186" rx="110" ry="10" fill="#003986" opacity=".12"/><g class="floaty"><path d="M70 96 160 30l90 66" fill="none" stroke="#D6350F" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/><rect x="92" y="92" width="136" height="84" fill="#fff" stroke="#003986" stroke-width="5"/><rect x="142" y="122" width="36" height="54" fill="#003986"/><rect x="106" y="108" width="26" height="22" fill="#9CC3EC"/><rect x="188" y="108" width="26" height="22" fill="#9CC3EC"/><circle cx="172" cy="150" r="2.5" fill="#FFD27A"/><text x="160" y="76" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="22" fill="#003986">?</text></g></svg>';
};
export function emptySVG() {
  return '<svg viewBox="0 0 120 90" aria-hidden="true"><ellipse cx="60" cy="82" rx="44" ry="5" fill="#003986" opacity=".08"/><path d="M22 44 60 14l38 30" fill="none" stroke="#D6350F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="32" y="42" width="56" height="38" rx="2" fill="#fff" stroke="#003986" stroke-width="3"/><path d="M50 60c0-6 10-6 10 0 0-6 10-6 10 0 0 7-10 12-10 12s-10-5-10-12z" fill="#FCE9E4" stroke="#D6350F" stroke-width="2"/></svg>';
};
