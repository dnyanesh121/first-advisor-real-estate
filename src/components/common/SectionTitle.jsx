import Reveal from "./Reveal";
import { cx } from "../../utils/classNames";

/**
 * Two-tone section heading from the design: navy text + red-orange highlight.
 * <SectionTitle title="Our Real Estate" highlight="Services" subtitle="…" />
 */
export default function SectionTitle({ title, highlight, after, subtitle, note, left, className, style }) {
  return (
    <Reveal className={cx("sec-title", left && "sec-title--left", className)} style={style}>
      <h2>
        {title} {highlight && <em>{highlight}</em>}{after && <> {after}</>}
      </h2>
      {subtitle && <p>{subtitle}</p>}
      {note && <span className="sample-note">{note}</span>}
    </Reveal>
  );
}
