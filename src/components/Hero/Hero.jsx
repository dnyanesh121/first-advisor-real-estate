import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Photo from "../common/Photo";
import CategoryTiles from "./CategoryTiles";
import SearchBar from "./SearchBar";
import { useApp } from "../../context/AppContext";
import { HERO } from "../../data/images";

/** Home hero: brand image, headline, CTAs, category tiles and the pill search bar. */
export default function Hero() {
  const { openModal } = useApp();
  const [mode, setMode] = useState("buy");

  return (
    <section className="hero hero--photo" aria-label="Introduction">
      <Photo className="hero__bg" src={HERO.src} alt={HERO.alt} eager sizes="100vw" />
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow rise">First Advisors Real Estate</span>
            <h1 className="rise d1" style={{ marginTop: 14 }}>Find your next property, <em>guided by experts.</em></h1>
            <p className="lead rise d2">First Advisors Group helps individuals, families, and businesses buy, sell, lease, and invest in property with clarity, transparency, and expert guidance.</p>
            <div className="ctas rise d3">
              <Link className="btn btn--primary btn--lg" to="/properties">Explore Properties</Link>
              <button type="button" className="btn btn--outline btn--lg" onClick={() => openModal("consult")}>Request a Consultation</button>
            </div>
          </div>
          <div className="hero-art rise d2">
            <Photo className="hero-art__img" src={HERO.src} alt="" aria-hidden="true" sizes="100vw" />
            <div className="chip-float cf1" aria-hidden="true">
              <span className="ic"><Icon name="check" strokeWidth={2.4} /></span>
              <div><b>Legal check done</b>Title &amp; RERA verified</div>
            </div>
            <div className="chip-float cf2" aria-hidden="true">
              <span className="ic o"><Icon name="home" strokeWidth={2} /></span>
              <div><b>Home loan in-house</b>via First Advisor Loans</div>
            </div>
          </div>
        </div>

        <div className="hero-tools">
          <CategoryTiles className="rise d3" mode={mode} onModeChange={setMode} />
          <SearchBar className="rise d4" mode={mode} />
        </div>
      </div>
    </section>
  );
}
