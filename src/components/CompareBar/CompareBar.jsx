import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Photo from "../common/Photo";
import { useApp } from "../../context/AppContext";
import { getProperty } from "../../data/properties";
import { cx } from "../../utils/classNames";

/** Floating tray listing properties picked for comparison. */
export default function CompareBar() {
  const { compare, toggleCompare, clearCompare, toast, maxCompare } = useApp();
  const { pathname } = useLocation();
  const show = compare.length > 0 && pathname !== "/compare";

  useEffect(() => {
    document.body.classList.toggle("has-cmp", show);
    return () => document.body.classList.remove("has-cmp");
  }, [show]);

  return (
    <div className={cx("cmp-bar", show && "show")} aria-live="polite" aria-hidden={!show}>
      <span className="label">Compare</span>
      <div className="slots">
        {compare.map(getProperty).filter(Boolean).map((p) => (
          <div className="slot" key={p.id}>
            <Photo className="art" src={p.image} alt="" sizes="88px" width={88} height={60} />
            <span>{p.title}</span>
            <button type="button" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.title}`}>×</button>
          </div>
        ))}
        {compare.length < maxCompare && <div className="slot muted" style={{ borderStyle: "dashed" }}>+ Add {maxCompare - compare.length} more</div>}
      </div>
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => { clearCompare(); toast("Compare list cleared"); }}>Clear</button>
      <Link className={cx("btn btn--navy btn--sm", compare.length < 2 && "is-disabled")} to="/compare">Compare</Link>
    </div>
  );
}
