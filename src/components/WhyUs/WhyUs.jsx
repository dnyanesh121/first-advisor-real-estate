import Icon from "../../assets/icons/Icon";
import Photo from "../common/Photo";
import Reveal from "../common/Reveal";
import { ADVISORY } from "../../data/images";

const REASONS = [
  ["doc", "Verified Listings", "Checked documents and property details."],
  ["compare", "Transparent Guidance", "Clear information on pricing, charges, and timelines."],
  ["loan", "Integrated Financial Support", "Access to home loans and insurance through the same group."],
  ["handshake", "End-to-End Assistance", "From the first site visit to registration and handover."]
];

export default function WhyUs() {
  return (
    <section className="section section--soft">
      <div className="container">
        <div className="why">
          <Reveal variant="left">
            <div className="sec-title sec-title--left" style={{ marginBottom: 18 }}>
              <h2>Why <em>First Advisors</em> Group?</h2>
              <p>Advisory You Can Rely On</p>
            </div>
            <div className="photo"><Photo src={ADVISORY.src} alt={ADVISORY.alt} sizes="(max-width: 900px) 100vw, 560px" /></div>
          </Reveal>
          <div className="list">
            {REASONS.map(([icon, title, text], i) => (
              <Reveal key={title} variant="right" delay={i * 0.1} className="feat">
                <span className="ic"><Icon name={icon} /></span>
                <div className="t"><b>{title}</b><span>{text}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
