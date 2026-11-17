import PropertyCard from "./PropertyCard";
import { cx } from "../../utils/classNames";

export default function PropertyGrid({ properties, list, className, style }) {
  return (
    <div className={cx("pgrid", list && "is-list", className)} style={style}>
      {properties.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
    </div>
  );
}
