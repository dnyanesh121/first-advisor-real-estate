const STAR = "m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z";

export default function Stars({ value, max = 5 }) {
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={i < Math.round(value) ? "" : "off"} aria-hidden="true"><path d={STAR} /></svg>
      ))}
    </span>
  );
}
export { STAR };
