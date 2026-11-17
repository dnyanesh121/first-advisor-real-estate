import Photo from "../common/Photo";
import Reveal from "../common/Reveal";
import { STORY } from "../../data/images";

export default function AboutStory() {
  return (
    <section className="section">
      <div className="container split">
        <Reveal variant="left" className="art"><Photo src={STORY.src} alt={STORY.alt} sizes="(max-width: 900px) 100vw, 560px" /></Reveal>
        <Reveal variant="right">
          <span className="eyebrow">Our story</span>
          <h2 style={{ fontSize: "var(--fs-h2)", margin: "12px 0 14px" }}>Advisory you can <em className="hl">rely on</em></h2>
          <p className="muted">First Advisors began in 2016 as an insurance broking firm in Malad East, Mumbai. As our clients bought homes, they kept asking us the same questions: is this title clean, is this price fair, which loan should I take? Our real estate desk grew out of those conversations.</p>
          <p className="muted">Today the group spans Insurance, Mutual Funds, Loans, Real Estate and Web &amp; Digital. Our property advisors work alongside loan and insurance specialists, so a buyer gets one coordinated plan instead of five separate vendors.</p>
          <div className="mv">
            <div><b>Our mission</b><p>Make every property decision clear, documented and stress-free, with honest advice even when it means saying &quot;don&apos;t buy this one&quot;.</p></div>
            <div><b>Our vision</b><p>To be the most trusted end-to-end property and finance advisor for families across Maharashtra.</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
