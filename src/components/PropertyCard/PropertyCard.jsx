import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import Photo from "../common/Photo";
import { useApp } from "../../context/AppContext";
import { areaText, modeLabel, priceText } from "../../utils/format";

function Specs({ p }) {
  if (p.type === "plot") {
    return (<><span><Icon name="area" />{areaText(p)}</span><span><Icon name="compass" />{p.facing}</span></>);
  }
  if (p.mode === "commercial") {
    return (<><span><Icon name="area" />{areaText(p)}</span><span><Icon name="layers" />{p.floor}</span><span><Icon name="car" />{p.parking} parking</span></>);
  }
  return (<><span><Icon name="bed" />{p.bhk} Bed</span><span><Icon name="bath" />{p.baths} Bath</span><span><Icon name="area" />{areaText(p)}</span></>);
}

/** Save + compare toggle buttons, reused on cards and the details page. */
export function SaveButton({ id, title, className = "tool-btn save", children }) {
  const { isSaved, toggleSaved } = useApp();
  return (
    <button type="button" className={className} aria-pressed={isSaved(id)} aria-label={`Save ${title}`} title="Save" onClick={(e) => { e.preventDefault(); toggleSaved(id); }}>
      <Icon name="heart" />{children}
    </button>
  );
}
export function CompareButton({ id, title, className = "tool-btn cmp", children }) {
  const { isCompared, toggleCompare } = useApp();
  return (
    <button type="button" className={className} aria-pressed={isCompared(id)} aria-label={`Add ${title} to compare`} title="Compare" onClick={(e) => { e.preventDefault(); toggleCompare(id); }}>
      <Icon name="compare" />{children}
    </button>
  );
}

/** Property card — matches "Featured Properties" in the design. */
export default function PropertyCard({ property: p, index = 0, children }) {
  const href = `/property/${p.id}`;
  const price = priceText(p);
  return (
    <Reveal as="article" className="pcard" delay={(index % 6) * 0.07}>
      <Link className="media" to={href} tabIndex={-1} aria-hidden="true">
        <Photo src={p.image} alt={p.imageAlt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" />
        <span className="price-tag num">
          {p.rentLike ? <>{price.replace("/month", "")}<small>/month</small></> : price}
        </span>
      </Link>
      <div className="tags">
        <span className="badge badge--ok"><Icon name="check" size={12} />Verified</span>
        <span className="badge badge--glass">{modeLabel(p)}</span>
        {p.status === "Under construction" && <span className="badge badge--accent">New Launch</span>}
      </div>
      <div className="tools">
        <CompareButton id={p.id} title={p.title} />
        <SaveButton id={p.id} title={p.title} />
      </div>
      {children}
      <div className="body">
        <h3><Link to={href}>{p.title}</Link></h3>
        <dl className="kvlist num">
          <dt>Location</dt><dd>{p.loc}, {p.city}</dd>
          <dt>{p.rentLike ? "Rent" : p.priceMax ? "Price range" : "Price"}</dt><dd>{price}</dd>
          <dt>Configuration</dt><dd>{p.bhkLabel} · {areaText(p)}</dd>
        </dl>
        <div className="specs num"><Specs p={p} /></div>
        <div className="foot">
          <Link className="btn btn--navy btn--sm" to={href}>View Details</Link>
          <span className="muted" style={{ fontSize: 12 }}>{p.days === 1 ? "Listed yesterday" : `Listed ${p.days} days ago`}</span>
        </div>
      </div>
    </Reveal>
  );
}
