import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Photo from "../common/Photo";
import { MEGA_MENU } from "./menu";
import { PROPERTIES } from "../../data/properties";
import { priceText } from "../../utils/format";

const promo = PROPERTIES.find((p) => p.featured);

export default function MegaMenu({ onNavigate }) {
  return (
    <div className="mega" id="mega" role="region" aria-label="Explore menu">
      <div className="container">
        <div className="mega-inner">
          {MEGA_MENU.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.items.map(([label, to, icon]) => (
                  <li key={label}><Link to={to} onClick={onNavigate}><Icon name={icon} />{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <Link className="mega-promo" to={`/property/${promo.id}`} onClick={onNavigate}>
            <div className="art"><Photo src={promo.image} alt={promo.imageAlt} sizes="300px" /></div>
            <div className="txt">
              <span className="badge badge--accent">Featured</span>
              <b style={{ marginTop: 6 }}>{promo.title}</b>
              <span>{promo.loc} · {priceText(promo)}</span><br />
              <span className="btn btn--white btn--sm">View property</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
