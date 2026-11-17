import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import { SITE } from "../../data/site";
import { useApp } from "../../context/AppContext";

export default function ContactInfo() {
  const { openModal } = useApp();
  const items = [
    ["phone", "Toll free", <a key="p" href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>],
    ["mail", "Email", <a key="m" href={`mailto:${SITE.email}`}>{SITE.email}</a>],
    ["pin", "Head office", <span key="a">{SITE.address}</span>],
    ["clock", "Working hours", <span key="h">{SITE.hours}<br />Sunday: site visits by appointment</span>]
  ];
  return (
    <div className="stack">
      {items.map(([icon, title, content], i) => (
        <Reveal key={title} variant="right" delay={i * 0.08} className="info-card">
          <span className="ic"><Icon name={icon} /></span>
          <div><b>{title}</b>{content}</div>
        </Reveal>
      ))}
      <Reveal className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
        <b style={{ fontSize: 16 }}>Prefer a quick callback?</b>
        <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>Leave your number and we will call you back.</p>
        <button type="button" className="btn btn--white btn--sm" onClick={() => openModal("consult")}>Request Callback</button>
      </Reveal>
    </div>
  );
}
