import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Logo from "../../assets/icons/Logo";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { EXPLORE_PATHS } from "./menu";
import { useApp } from "../../context/AppContext";
import useScrolled from "../../hooks/useScrolled";
import useKeydown from "../../hooks/useKeydown";
import { cx } from "../../utils/classNames";

/** Badge that pops each time its number changes. */
function CountBadge({ value }) {
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return undefined;
    prev.current = value;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [value]);
  return <span className={cx("count num", value > 0 && "has", bump && "bump")}>{value || ""}</span>;
}

export default function Navbar() {
  const { saved, compare, openModal } = useApp();
  const { pathname } = useLocation();
  const scrolled = useScrolled(10);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef();
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  const exploreActive = EXPLORE_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => { setMegaOpen(false); setDrawerOpen(false); }, [pathname]);
  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setMegaOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  useKeydown((e) => { if (e.key === "Escape") { setMegaOpen(false); setDrawerOpen(false); } });

  const login = (e) => { e.preventDefault(); openModal("login"); };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={cx("site-header", scrolled && "is-scrolled")} id="hdr">
        <div className="container bar">
          <Link className="logo" to="/" aria-label="First Advisors Group — Real Estate home"><Logo /></Link>
          <nav className="nav" aria-label="Primary">
            <div
              className={cx("has-mega", megaOpen && "is-open")}
              ref={wrapRef}
              onMouseEnter={canHover ? () => { clearTimeout(closeTimer.current); setMegaOpen(true); } : undefined}
              onMouseLeave={canHover ? () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 180); } : undefined}
            >
              <button type="button" className={cx(exploreActive && "is-active")} aria-expanded={megaOpen} aria-controls="mega" onClick={() => setMegaOpen((o) => !o)}>
                Explore <Icon name="chevron" className="caret" />
              </button>
              <MegaMenu onNavigate={() => setMegaOpen(false)} />
            </div>
            <NavLink to="/contact?service=Pay%20Rent" className={() => ""}>Pay Rent</NavLink>
            <NavLink to="/contact?service=Rent%20Agreement" className={({ isActive }) => (isActive ? "is-active" : "")}>Rent Agreement</NavLink>
            <NavLink to="/mortgage-calculator" className={({ isActive }) => (isActive ? "is-active" : "")}>Home Loan</NavLink>
            <a href="#login" onClick={login}>Login</a>
          </nav>
          <div className="header-actions">
            <Link className="hdr-icon" to="/compare" aria-label="Compare properties" title="Compare"><Icon name="compare" /><CountBadge value={compare.length} /></Link>
            <Link className="hdr-icon" to="/saved" aria-label="Saved properties" title="Saved"><Icon name="heart" /><CountBadge value={saved.length} /></Link>
            <button type="button" className="burger" aria-label="Open menu" aria-expanded={drawerOpen} aria-controls="drawer" onClick={() => setDrawerOpen(true)}><span /></button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
