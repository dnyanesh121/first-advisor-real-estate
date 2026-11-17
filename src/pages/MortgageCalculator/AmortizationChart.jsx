import { inr } from "../../utils/format";

/** Stacked yearly principal/interest bars with the outstanding balance line. */
export default function AmortizationChart({ rows, emiAmount, loan }) {
  const W = 800, H = 260, pad = 30;
  const bw = (W - pad * 2) / rows.length;
  const maxY = emiAmount * 12;
  const plotH = H - pad * 1.5;
  const base = H - pad;
  const line = rows.map((r, i) => `${i ? "L" : "M"}${(pad + i * bw + bw / 2).toFixed(1)},${(base - (r.balance / loan) * plotH).toFixed(1)}`).join(" ");
  return (
    <svg className="amort-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Yearly principal and interest chart">
      {[0, 1, 2, 3, 4].map((g) => { const y = pad / 2 + (plotH * g) / 4; return <line key={g} x1={pad} x2={W - pad} y1={y} y2={y} stroke="#E2E8F0" strokeWidth="1" />; })}
      {rows.map((r, i) => {
        const hP = (r.principal / maxY) * plotH;
        const hI = (r.interest / maxY) * plotH;
        const x = pad + i * bw + bw * 0.15;
        return (
          <g key={r.year}>
            <rect x={x} y={base - hP - hI} width={bw * 0.7} height={hI} fill="#F05E3B" rx="2"><title>{`Year ${r.year}: interest ${inr(r.interest)}`}</title></rect>
            <rect x={x} y={base - hP} width={bw * 0.7} height={hP} fill="#003986"><title>{`Year ${r.year}: principal ${inr(r.principal)}`}</title></rect>
            {(rows.length <= 15 || i % 5 === 4 || i === 0) && <text x={x + bw * 0.35} y={H - 10} fontSize="11" textAnchor="middle" fill="#8A93A3" fontFamily="Poppins">{r.year}</text>}
          </g>
        );
      })}
      <path d={line} fill="none" stroke="#FFC800" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
