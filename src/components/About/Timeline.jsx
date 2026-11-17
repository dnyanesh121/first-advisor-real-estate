import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const MILESTONES = [
  ["2016", "First Advisor Insurance Brokers founded", "Started as an insurance broking firm in Malad East, Mumbai."],
  ["2018", "Mutual funds and loans added", "Clients could now plan investments and borrowing with the same advisor."],
  ["2021", "Real estate desk launched", "Property advisory for buyers already working with our loans team."],
  ["2023", "Expanded to Thane, Navi Mumbai and Pune", "Local advisors for each micro-market, with rental agreement services."],
  ["2026", "End-to-end property platform", "Verified listings, site-visit booking and integrated financial services online."]
];

export default function Timeline() {
  return (
    <section className="section section--soft">
      <div className="container">
        <SectionTitle title="Our" highlight="Journey" subtitle="From an insurance desk to a full property advisory" />
        <div className="timeline">
          {MILESTONES.map(([year, title, text], i) => (
            <Reveal key={year} variant={i % 2 ? "right" : "left"} className="tl">
              <span className="yr">{year}</span><b>{title}</b><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
