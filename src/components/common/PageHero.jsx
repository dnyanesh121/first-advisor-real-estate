import Photo from "./Photo";
import { HERO } from "../../data/images";
import Breadcrumbs from "./Breadcrumbs";
import { cx } from "../../utils/classNames";

/**
 * Shared hero for inner pages. Uses the brand hero image on the right with the
 * sky fading into the page, so every page carries the same visual identity.
 */
export default function PageHero({ title, highlight, after, crumbs, lead, center, children, compact }) {
  return (
    <section className={cx("page-hero", "page-hero--photo", center && "center", compact && "page-hero--compact")}>
      <Photo className="page-hero__img" src={HERO.src} alt="" aria-hidden="true" eager sizes={center ? "100vw" : "(max-width: 760px) 100vw, 64vw"} />
      <div className="container">
        <div className="rise"><Breadcrumbs crumbs={crumbs} /></div>
        {title && (
          <h1 className="rise d1">
            {title} {highlight && <em>{highlight}</em>}{after && <> {after}</>}
          </h1>
        )}
        {lead && <p className="lead rise d2">{lead}</p>}
        {children && <div className="rise d3">{children}</div>}
      </div>
    </section>
  );
}
