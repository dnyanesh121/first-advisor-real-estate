import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../../components/common/Photo";
import { HERO } from "../../data/images";
import Icon from "../../assets/icons/Icon";
import SvgArt from "../../components/common/SvgArt";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { houseSVG } from "../../utils/art";

export default function NotFound() {
  useDocumentTitle("Page Not Found");
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <section className="nf nf--photo">
      <Photo className="nf__img" src={HERO.src} alt="" aria-hidden="true" eager sizes="100vw" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="big rise" aria-hidden="true">4<span>0</span>4</div>
        <div className="house rise d1"><SvgArt html={houseSVG()} /></div>
        <h1 className="rise d2">This address doesn&apos;t exist</h1>
        <p className="rise d3">The page may have moved, or the link might be broken. Let&apos;s get you back to verified properties.</p>
        <form className="searchbar rise d4" role="search" style={{ maxWidth: 560, margin: "0 auto" }} onSubmit={(e) => { e.preventDefault(); navigate(`/properties${q ? `?q=${encodeURIComponent(q)}` : ""}`); }}>
          <div className="pill">
            <div className="sb-field">
              <Icon name="search" className="lead-ico" />
              <label className="sr-only" htmlFor="nfq">Search properties</label>
              <input id="nfq" type="search" placeholder="Search locality or project" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
          <button className="btn btn--grad go" type="submit" style={{ minWidth: 120 }}>Search</button>
        </form>
        <div className="quick rise d5">
          <Link className="btn btn--navy" to="/">Back to Home</Link>
          <Link className="chip" to="/properties?mode=buy">Buy</Link>
          <Link className="chip" to="/properties?mode=rent">Rent</Link>
          <Link className="chip" to="/agents">Advisors</Link>
          <Link className="chip" to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
