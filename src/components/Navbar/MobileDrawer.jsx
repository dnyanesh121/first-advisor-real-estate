import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import { MEGA_MENU } from "./menu";
import { SITE } from "../../data/site";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { useApp } from "../../context/AppContext";

export default function MobileDrawer({ open, onClose }) {
  const { openModal } = useApp();
  useLockBodyScroll(open);
  return (
    <div className={`drawer ${open ? "is-open" : ""}`} id="drawer" aria-hidden={!open}>
      <div className="scrim" onClick={onClose} />
      <div className="panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="panel-head">
          <Link className="logo" to="/" onClick={onClose}><Logo /></Link>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu"><Icon name="x" /></button>
        </div>
        <nav>
          <Link className="dlink" to="/" onClick={onClose}>Home</Link>
          {MEGA_MENU.map((col, i) => (
            <details key={col.heading} open={i === 0}>
              <summary>{col.heading}<Icon name="chevron" /></summary>
              <ul>
                {col.items.map(([label, to]) => <li key={label}><Link to={to} onClick={onClose}>{label}</Link></li>)}
              </ul>
            </details>
          ))}
          <div className="cta-row">
            <Link className="btn btn--primary" to="/properties" onClick={onClose}>Explore Properties</Link>
            <button type="button" className="btn btn--outline" onClick={() => { onClose(); openModal("login"); }}>Login</button>
            <a className="btn btn--ghost" href={`tel:${SITE.phoneRaw}`}><Icon name="phone" />{SITE.phone}</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
