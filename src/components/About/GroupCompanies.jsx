import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const COMPANIES = [
  ["shield", "Insurance", "Life, health, motor and home cover"],
  ["coins", "Mutual Funds", "Goal-based investment plans"],
  ["loan", "Loans", "Home, LAP and balance transfer"],
  ["building", "Real Estate", "Buy, sell, rent and invest"],
  ["sparkle", "Web & Digital", "Websites and digital marketing"]
];

export default function GroupCompanies() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="The First Advisors" highlight="Group" subtitle="Five businesses, one relationship" />
        <div className="group-cos">
          {COMPANIES.map(([icon, name, text], i) => (
            <Reveal key={name} delay={i * 0.06} className="icard" style={name === "Real Estate" ? { outline: "2px solid var(--accent-400)" } : undefined}>
              <div className="ic" style={{ width: 40, height: 40, color: i % 2 ? "var(--accent)" : "var(--navy)" }}><Icon name={icon} /></div>
              <h3>{name}</h3><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
