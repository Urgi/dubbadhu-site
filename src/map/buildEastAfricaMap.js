/**
 * Imperative East Africa map SVG (same paths as Dubbadhu `EastAfricaMapSvg`).
 */
import * as P from "../config/eastAfricaMapPaths.js";

const SVG_NS = "http://www.w3.org/2000/svg";

const COUNTRY_LABELS = [
  { x: 190, y: 195, text: "ETHIOPIA" },
  { x: 234, y: 76, text: "ERITREA" },
  { x: 390, y: 270, text: "SOMALIA" },
  { x: 178, y: 395, text: "KENYA" },
  { x: 50, y: 250, text: "S. SUDAN" },
  { x: 60, y: 395, text: "UGANDA" },
  { x: 138, y: 478, text: "TANZANIA" },
  { x: 115, y: 140, text: "SUDAN" },
  { x: 328, y: 158, text: "DJ" },
];

const CITIES = [
  { cx: 229, cy: 227, r: 2.5, x: 234, y: 227, name: "Addis Ababa" },
  { cx: 248, cy: 127, r: 2, x: 252, y: 127, name: "Mekelle" },
  { cx: 201, cy: 147, r: 2, x: 205, y: 147, name: "Gondar" },
  { cx: 198, cy: 169, r: 2, x: 202, y: 169, name: "Bahir Dar" },
  { cx: 305, cy: 214, r: 2, x: 309, y: 214, name: "Dire Dawa" },
  { cx: 224, cy: 270, r: 2, x: 228, y: 270, name: "Hawassa" },
  { cx: 184, cy: 257, r: 2, x: 188, y: 256, name: "Jimma" },
  { cx: 243, cy: 239, r: 2, x: 247, y: 238, name: "Adama" },
  { cx: 250, cy: 180, r: 2, x: 254, y: 180, name: "Dessie" },
  { cx: 177, cy: 225, r: 2, x: 180, y: 224, name: "Nekemte" },
  { cx: 326, cy: 218, r: 2, x: 330, y: 218, name: "Jijiga" },
  { cx: 234, cy: 86, r: 2, x: 238, y: 86, name: "Asmara" },
  { cx: 199, cy: 418, r: 2, x: 203, y: 418, name: "Nairobi" },
  { cx: 386, cy: 384, r: 2, x: 390, y: 384, name: "Mogadishu" },
  { cx: 357, cy: 214, r: 2, x: 361, y: 214, name: "Hargeisa" },
  { cx: 70, cy: 401, r: 2, x: 74, y: 401, name: "Kampala" },
];

export function interpolatePan(tx, ty, s, W, H) {
  const px = -0.3 * W + ((tx + 30) / 60) * (0.6 * W);
  const py = -0.3 * H + ((ty + 30) / 60) * (0.6 * H);
  return `translate(${px}px, ${py}px) scale(${s})`;
}

function buildEastAfricaSvg(clipId) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 520 520");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.classList.add("east-africa-svg");

  const defs = document.createElementNS(SVG_NS, "defs");
  const clipPath = document.createElementNS(SVG_NS, "clipPath");
  clipPath.setAttribute("id", clipId);
  const clipRect = document.createElementNS(SVG_NS, "rect");
  clipRect.setAttribute("width", "520");
  clipRect.setAttribute("height", "520");
  clipPath.appendChild(clipRect);
  defs.appendChild(clipPath);
  svg.appendChild(defs);

  const rootG = document.createElementNS(SVG_NS, "g");
  rootG.setAttribute("clip-path", `url(#${clipId})`);

  function path(d, attrs) {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    Object.entries(attrs).forEach(([k, v]) => p.setAttribute(k, String(v)));
    return p;
  }

  rootG.appendChild(
    path(P.BASE_CTY_ETHIOPIA, {
      fill: "#0a1a12",
      stroke: "#1a3324",
      "stroke-width": "0.55",
      "stroke-linejoin": "round",
    })
  );
  rootG.appendChild(
    path(P.LR2_ERITREA_D, {
      fill: "#0a1a12",
      stroke: "#1a3324",
      "stroke-width": "0.55",
      "stroke-linejoin": "round",
    })
  );

  COUNTRY_LABELS.forEach(({ x, y, text }) => {
    const t = document.createElementNS(SVG_NS, "text");
    t.setAttribute("x", String(x));
    t.setAttribute("y", String(y));
    t.setAttribute("fill", "rgba(240,230,208,0.15)");
    t.setAttribute("font-size", "5.5");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-weight", "400");
    t.textContent = text;
    rootG.appendChild(t);
  });

  CITIES.forEach((city) => {
    const g = document.createElementNS(SVG_NS, "g");
    const c = document.createElementNS(SVG_NS, "circle");
    c.setAttribute("cx", String(city.cx));
    c.setAttribute("cy", String(city.cy));
    c.setAttribute("r", String(city.r));
    c.setAttribute("fill", "rgba(240,230,208,0.45)");
    c.setAttribute("stroke", "rgba(240,230,208,0.18)");
    c.setAttribute("stroke-width", "0.5");
    g.appendChild(c);
    const t = document.createElementNS(SVG_NS, "text");
    t.setAttribute("x", String(city.x));
    t.setAttribute("y", String(city.y));
    t.setAttribute("fill", "rgba(240,230,208,0.35)");
    t.setAttribute("font-size", "4.8");
    t.setAttribute("text-anchor", "start");
    t.textContent = city.name;
    g.appendChild(t);
    rootG.appendChild(g);
  });

  const gOromia = document.createElementNS(SVG_NS, "g");
  gOromia.classList.add("east-region-oromia");
  gOromia.appendChild(
    path(P.LR0_OROMIA_D, {
      fill: "#c07828",
      "fill-opacity": "0.58",
      stroke: "#e09030",
      "stroke-width": "1.4",
      "stroke-linejoin": "round",
    })
  );
  const tOr = document.createElementNS(SVG_NS, "text");
  tOr.setAttribute("x", "195");
  tOr.setAttribute("y", "278");
  tOr.setAttribute("fill", "#f5c060");
  tOr.setAttribute("text-anchor", "middle");
  tOr.setAttribute("font-weight", "700");
  tOr.textContent = "OROMIA";
  gOromia.appendChild(tOr);
  rootG.appendChild(gOromia);

  const gAm = document.createElementNS(SVG_NS, "g");
  gAm.classList.add("east-region-amharic");
  gAm.appendChild(
    path(P.LR1_ETHIOPIA, {
      fill: "#1e8c7a",
      "fill-opacity": "0.5",
      stroke: "#3abfa8",
      "stroke-width": "1.2",
      "stroke-linejoin": "round",
    })
  );
  const tAm = document.createElementNS(SVG_NS, "text");
  tAm.setAttribute("x", "230");
  tAm.setAttribute("y", "202");
  tAm.setAttribute("fill", "#5eeedd");
  tAm.setAttribute("text-anchor", "middle");
  tAm.setAttribute("font-weight", "700");
  tAm.textContent = "ETHIOPIA";
  gAm.appendChild(tAm);
  rootG.appendChild(gAm);

  const gTig = document.createElementNS(SVG_NS, "g");
  gTig.classList.add("east-region-tigrinya");
  gTig.appendChild(
    path(P.LR2_TIGRAY_D, {
      fill: "#8b5cf6",
      "fill-opacity": "0.58",
      stroke: "#b090ff",
      "stroke-width": "1.3",
      "stroke-linejoin": "round",
    })
  );
  gTig.appendChild(
    path(P.LR2_ERITREA_D, {
      fill: "#8b5cf6",
      "fill-opacity": "0.62",
      stroke: "#b090ff",
      "stroke-width": "1.3",
      "stroke-linejoin": "round",
    })
  );
  const tEr = document.createElementNS(SVG_NS, "text");
  tEr.setAttribute("x", "240");
  tEr.setAttribute("y", "62");
  tEr.setAttribute("fill", "#d0b8ff");
  tEr.setAttribute("text-anchor", "middle");
  tEr.setAttribute("font-weight", "700");
  tEr.textContent = "ERITREA";
  gTig.appendChild(tEr);
  const tTig = document.createElementNS(SVG_NS, "text");
  tTig.setAttribute("x", "218");
  tTig.setAttribute("y", "128");
  tTig.setAttribute("fill", "#d0b8ff");
  tTig.setAttribute("text-anchor", "middle");
  tTig.setAttribute("font-weight", "700");
  tTig.textContent = "TIGRAY";
  gTig.appendChild(tTig);
  rootG.appendChild(gTig);

  svg.appendChild(rootG);
  return { svg, layers: { oromia: gOromia, amharic: gAm, tigrinya: gTig } };
}

export function setRegionVisibility(layers, activeIndex, oromiaHi) {
  layers.oromia.style.opacity = activeIndex === 0 ? String(oromiaHi) : "0.00001";
  layers.amharic.style.opacity = activeIndex === 1 ? "1" : "0";
  layers.tigrinya.style.opacity = activeIndex === 2 ? "1" : "0";
}

/** Clears host and appends the map SVG. Returns layer groups for opacity updates. */
export function mountEastAfricaMap(host, clipId) {
  host.replaceChildren();
  const { svg, layers } = buildEastAfricaSvg(clipId);
  host.appendChild(svg);
  return layers;
}
