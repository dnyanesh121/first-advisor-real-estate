import { useLayoutEffect, useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import { PLANS } from "../../data/content";
import { useApp } from "../../context/AppContext";
import { inr } from "../../utils/format";

/** Monthly / yearly toggle with sliding thumb + three plan cards. */
export default function Plans() {
  const { openModal } = useApp();
  const [billing, setBilling] = useState("m");
  const toggleRef = useRef(null);
  const [thumb, setThumb] = useState({ width: 0, x: 0 });

  useLayoutEffect(() => {
    const move = () => {
      const b = toggleRef.current?.querySelector('[aria-pressed="true"]');
      if (b) setThumb({ width: b.offsetWidth, x: b.offsetLeft - 4 });
    };
    move();
    window.addEventListener("resize", move);
    document.fonts?.ready.then(move);
    return () => window.removeEventListener("resize", move);
  }, [billing]);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Subscription" highlight="Plans" subtitle="For owners and investors who list with us regularly" />
        <Reveal className="center" style={{ marginBottom: 34 }}>
          <div className="toggle" ref={toggleRef}>
            <span className="thumb" style={{ width: thumb.width, transform: `translateX(${thumb.x}px)` }} />
            <button type="button" aria-pressed={billing === "m"} onClick={() => setBilling("m")}>Monthly</button>
            <button type="button" aria-pressed={billing === "y"} onClick={() => setBilling("y")}>Yearly <span className="save-badge">Save 20%</span></button>
          </div>
        </Reveal>
        <div className="plans">
          {PLANS.map((p, i) => {
            const amount = billing === "m" ? p.m : Math.round(p.m * 12 * 0.8);
            return (
              <Reveal key={p.name} delay={i * 0.1} className={`plan${p.hot ? " plan--hot" : ""}`}>
                {p.hot && <span className="ribbon">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="amt num">{inr(amount)}<small>/{billing === "m" ? "month" : "year"}</small></div>
                <ul>{p.feats.map((f) => <li key={f}><Icon name="checkbox" />{f}</li>)}</ul>
                <button type="button" className={`btn ${p.hot ? "btn--white" : "btn--outline"} btn--sm`} onClick={() => openModal("consult")}>Choose Plan</button>
              </Reveal>
            );
          })}
        </div>
        <p className="center muted mt-6" style={{ fontSize: 12.5 }}>Prices shown are placeholders. Final plan pricing to be confirmed.</p>
      </div>
    </section>
  );
}
