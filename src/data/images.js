/* ==========================================================================
   Photography for listings, heroes and editorial cards.
   Every photo is from Unsplash (https://unsplash.com/license — free for
   commercial use, no attribution required) and is served by the Unsplash image
   CDN, which resizes and converts to WebP/AVIF per request. A photo is either an
   Unsplash id ("1600596542815-ffad4c1539a9") or any other URL / imported file.
   ========================================================================== */

import heroImage from "../assets/images/hero.jpg";

const CDN = "https://images.unsplash.com/photo-";
const WIDTHS = [480, 800, 1200, 1600];
const isUnsplash = (photo) => /^\d{10,}-[0-9a-f]+$/.test(photo);

export const photoUrl = (photo, w = 800) => (isUnsplash(photo) ? `${CDN}${photo}?auto=format&fit=max&w=${w}&q=70` : photo);
export const photoSrcSet = (photo) => (isUnsplash(photo) ? WIDTHS.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", ") : undefined);

/* ---------- Brand / page imagery (the brand hero image, bundled locally) ---------- */
export const HERO = { src: heroImage, alt: "A floating island of glass towers, gardens and a lake above the clouds" };
export const ADVISORY = { src: heroImage, alt: "First Advisors — properties above the clouds" };
export const STORY = { src: heroImage, alt: "First Advisors — a city of homes above the clouds" };

/* ---------- Pools used for galleries ---------- */
const LIVING = ["1600607687939-ce8a6c25118c", "1600210492486-724fe5c67fb0", "1598928506311-c55ded91a20c", "1600566753086-00f18fb6b3ea", "1613545325278-f24b0cae1224", "1582037928769-181f2644ecb7", "1631679706909-1844bbd07221", "1600210491892-03d54c0aaf87"];
const BEDROOM = ["1616594039964-ae9021a400a0", "1505693416388-ac5ce068fe85", "1540518614846-7eded433c457", "1512918728675-ed5a9ecdebfd", "1595526114035-0d45ed16cfbf", "1617104678098-de229db51175"];
const KITCHEN = ["1600585152220-90363fe7e115", "1600489000022-c2086d79f9d4", "1556912172-45b7abe8b7e1", "1484154218962-a197022b5858", "1569152811536-fb47aced8409"];
const VIEW = ["1600573472550-8090b5e0745e", "1502005229762-cf1b2da7c5d6", "1600566752355-35792bedcfea"];
const VILLA = ["1613490493576-7fde63acd811", "1512917774080-9991f1c4c750", "1600596542815-ffad4c1539a9", "1613977257363-707ba9348227", "1602343168117-bb8ffe3e2e9f", "1580587771525-78b9dba3b914", "1582268611958-ebfd161ef9cf"];
const WORKSPACE = ["1497366216548-37526070297c", "1497366811353-6870744d04b2", "1524758631624-e2822e304c36", "1497215842964-222b430dc094", "1504384308090-c894fdcc538d"];
const MEETING = ["1556761175-5973dc0f32e7", "1521737604893-d14cc237f11d"];
const RETAIL = ["1441986300917-64674bd600d8", "1567401893414-76b7b1e5a7a5", "1519567241046-7f570eee3ce6", "1528698827591-e19ccd7bc23d"];
const LAND = ["1565402170291-8491f14678db", "1500382017468-9049fed747ef", "1592595896551-12b371d546d5"];
const INTERIORS = new Set([...LIVING, ...WORKSPACE, ...RETAIL.slice(0, 3), "1522708323590-d24dbb6b0267", "1493809842364-78817add7ffb", "1560448204-e02f11c3d0e2", "1502672260266-1c1ef2d93688"]);

const pick = (pool, seed) => pool[seed % pool.length];

/** Alt text for a listing's main photo, e.g. "2 BHK apartment at Lodha Splendora Residences, Ghodbunder Road, Thane". */
export const coverAlt = (p, typeLabel) => `${p.bhk ? `${p.bhkLabel} ` : ""}${typeLabel.toLowerCase()} at ${p.title}, ${p.loc}, ${p.city}`;

/** Ordered photo set for the details gallery + lightbox: [{ label, src, alt }]. */
export function galleryPhotos(p) {
  const s = p.id;
  const coverLabel = p.type === "plot" ? "Plot" : !INTERIORS.has(p.image) ? "Exterior" : p.mode === "commercial" ? "Interior" : "Living room";
  const views = [[coverLabel, p.image]];
  if (p.type === "plot") views.push(["Surroundings", pick(LAND, s + 1)], ["Neighbourhood", pick(LAND, s + 2)]);
  else if (p.type === "shop") views.push(["Retail floor", pick(RETAIL, s + 1)], ["Display area", pick(RETAIL, s + 2)]);
  else if (p.type === "office") views.push(["Workspace", pick(WORKSPACE, s)], ["Meeting room", pick(MEETING, s)], ["Cabins", pick(WORKSPACE, s + 2)]);
  else {
    if (p.type === "villa") views.push(["Pool & garden", pick(VILLA, s)]);
    views.push(["Living room", pick(LIVING, s)], ["Bedroom", pick(BEDROOM, s)], ["Kitchen", pick(KITCHEN, s)], [p.type === "villa" ? "Bathroom" : "Balcony view", pick(VIEW, p.type === "villa" ? 2 : s)]);
  }
  const seen = new Set();
  return views
    .filter(([, src]) => src && !seen.has(src) && seen.add(src))
    .map(([label, src]) => ({ label, src, alt: `${label} — ${p.title}, ${p.loc}, ${p.city}` }));
}

/* ---------- Editorial scenes (services, process, categories, blog) ---------- */
const SCENES = {
  "skyline-sunset": [["1480714378408-67cf0d13bc1b", "City skyline of high-rise residential towers at sunset"], ["1567157577867-05ccb1388e66", "Residential towers along the Mumbai seafront"]],
  "skyline-night": [["1486325212027-8081e485255e", "Lit residential and office towers in the city at night"]],
  "apartment-pool": [["1580041065738-e72023775cdc", "Low-rise apartment complex with landscaped gardens and a swimming pool"]],
  towers: [["1460317442991-0ec209397118", "Modern residential tower with private balconies"], ["1567684014761-b65e2e59b9eb", "High-rise apartment building with glass balconies"]],
  office: [["1486406146926-c627a92ad1ab", "Glass commercial office towers in a business district"]],
  "modern-house": [["1600585154340-be6161a56a0c", "Contemporary independent home with a lawn at dusk"]],
  villa: [["1613490493576-7fde63acd811", "Luxury villa with a private swimming pool"]],
  meeting: [["1600880292203-757bb62b4baf", "Advisor and client celebrating a completed property deal"]],
  interior: [["1600210492486-724fe5c67fb0", "Bright, furnished apartment living room"]],
  plot: [["1565402170291-8491f14678db", "Aerial view of a planned residential plot layout"]]
};

/** { src, alt } for a named scene; `seed` rotates through the scene's photos. */
export function scenePhoto(name, seed = 0) {
  const [src, alt] = pick(SCENES[name] || SCENES.towers, seed);
  return { src, alt };
}
