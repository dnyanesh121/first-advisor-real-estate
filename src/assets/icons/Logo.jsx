import { useId } from "react";

/** 1st ADVISOR logo — vector redraw of the brand mark. */
export default function Logo({ label = "1st Advisor — Your Happiness, Our Commitment" }) {
  const id = useId().replace(/:/g, "");
  const grad = `lg${id}`;
  const clip = `lc${id}`;
  const one = "M4,26 C22,25 44,18 62,8 L72,8 L72,150 L86,153 L86,165 L0,165 L0,156 L26,151 L26,40 C18,38 10,35 4,33 Z";
  return (
    <svg viewBox="0 0 470 200" role="img" aria-label={label}>
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0090D0" />
          <stop offset=".5" stopColor="#0090D0" />
          <stop offset=".5" stopColor="#005090" />
          <stop offset="1" stopColor="#005090" />
        </linearGradient>
        <clipPath id={clip}><polygon points="0,0 90,0 90,52 0,108" /></clipPath>
      </defs>
      <path d={one} fill="#005090" />
      <g clipPath={`url(#${clip})`}><path d={one} fill="#D03000" /></g>
      <path d="M44,92 C52,72 60,58 70,47 L70,92 Z" fill="#40A0E0" />
      <text x="27" y="114" fontFamily="Poppins,Arial,sans-serif" fontWeight="700" fontSize="34" fill="#005090" stroke="#fff" strokeWidth="4" paintOrder="stroke">st</text>
      <path d="M72,22 C140,-6 220,-4 252,36 C214,8 150,6 72,40 Z" fill="#D03000" />
      <path d="M72,52 C112,26 160,18 194,25 C156,24 116,36 72,62 Z" fill="#005090" />
      <polygon points="266,42 269.8,51.6 280,52.2 272.1,58.6 274.8,68.6 266,63 257.2,68.6 259.9,58.6 252,52.2 262.2,51.6" fill="#D03000" />
      <text x="76" y="146" fontFamily="Arial,Helvetica,sans-serif" fontWeight="700" fontSize="92" textLength="390" lengthAdjust="spacingAndGlyphs" fill={`url(#${grad})`}>ADVISOR</text>
      <rect x="94" y="156" width="372" height="2.4" fill="#BDBDC6" />
      <rect x="94" y="161" width="372" height="2.4" fill="#BDBDC6" />
      <text x="94" y="194" fontFamily="Poppins,Arial,sans-serif" fontWeight="500" fontSize="22" textLength="372" lengthAdjust="spacingAndGlyphs" fill="#F08A20">Your Happiness , Our Commitment</text>
    </svg>
  );
}
