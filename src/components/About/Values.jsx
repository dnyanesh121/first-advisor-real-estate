import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const VALUES = [
  ["shield", "Verified first", "We visit every property and check documents before it is shown to you."],
  ["compare", "Transparent", "Charges, timelines and risks are explained in writing, upfront."],
  ["handshake", "One relationship", "Property, loan and insurance coordinated by one team."],
  ["target", "Client-first", "We'll tell you when a deal isn't right, even if it costs us the sale."]
];

export default function Values() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="What We" highlight="Stand For" subtitle="The principles behind every recommendation" />
        <div className="grid grid-4">
          {VALUES.map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.08} className="icard" style={{ textAlign: "left", padding: 22 }}>
              <div className="ic" style={{ margin: "0 0 12px", width: 46, height: 46, borderRadius: 10, background: i % 2 ? "var(--accent)" : "var(--navy-700)", color: "#fff", display: "grid", placeItems: "center" }}>
                <Icon name={icon} size={24} />
              </div>
              <h3>{title}</h3>
              <p style={{ fontSize: 13.5 }}>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
