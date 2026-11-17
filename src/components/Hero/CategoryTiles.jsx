import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";

const TILES = [
  { label: "Buy", icon: "home", mode: "buy" },
  { label: "Sell", icon: "tag", to: "/contact?service=Sell" },
  { label: "Rent", icon: "key", mode: "rent" },
  { label: "Invest", icon: "coins", to: "/properties?mode=buy&sort=ppsf" },
  { label: "Commercial", icon: "building", mode: "commercial" },
  { label: "Advisor", icon: "user", to: "/agents" }
];

/** Buy / Sell / Rent / Invest / Commercial / Advisor tiles from the hero. */
export default function CategoryTiles({ mode, onModeChange, className = "" }) {
  return (
    <div className={`tiles ${className}`} role="group" aria-label="What are you looking for?">
      {TILES.map((t) =>
        t.mode ? (
          <button key={t.label} type="button" className="cat-tile" aria-pressed={mode === t.mode} onClick={() => onModeChange(t.mode)}>
            <Icon name={t.icon} strokeWidth={1.7} /><span>{t.label}</span>
          </button>
        ) : (
          <Link key={t.label} className="cat-tile" to={t.to}>
            <Icon name={t.icon} strokeWidth={1.7} /><span>{t.label}</span>
          </Link>
        )
      )}
    </div>
  );
}
