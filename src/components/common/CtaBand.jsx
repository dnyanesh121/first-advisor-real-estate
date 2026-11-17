import Reveal from "./Reveal";

/** Navy call-to-action band. */
export default function CtaBand({ title, highlight, text, children }) {
  return (
    <Reveal className="cta-band">
      <div>
        <h2>{title} {highlight && <em>{highlight}</em>}</h2>
        {text && <p>{text}</p>}
      </div>
      <div className="flex">{children}</div>
    </Reveal>
  );
}
