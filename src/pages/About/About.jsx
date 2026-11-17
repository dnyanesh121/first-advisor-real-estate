import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import Stats from "../../components/common/Stats";
import CtaBand from "../../components/common/CtaBand";
import AboutStory from "../../components/About/AboutStory";
import Values from "../../components/About/Values";
import Timeline from "../../components/About/Timeline";
import GroupCompanies from "../../components/About/GroupCompanies";
import AgentCard from "../../components/AgentCard/AgentCard";
import { AGENTS } from "../../data/agents";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function About() {
  useDocumentTitle("About Us");
  const { openModal } = useApp();
  return (
    <>
      <PageHero title="About" highlight="First Advisors" after="Group" crumbs={[["About Us"]]} lead="One advisory team for your property, home loan, insurance and investments, so every decision is made with the full picture." />
      <AboutStory />
      <section className="section--tight"><div className="container"><Stats /></div></section>
      <Values />
      <Timeline />
      <GroupCompanies />
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Our" highlight="Leadership & Advisors" subtitle="Local experts for every micro-market we cover" note="Sample profiles" />
          <div className="grid grid-4">{AGENTS.slice(0, 4).map((a, i) => <AgentCard key={a.id} agent={a} index={i} />)}</div>
          <div className="center mt-10"><Link className="btn btn--outline" to="/agents">Meet all advisors <Icon name="arrow" strokeWidth={2} /></Link></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CtaBand title="Let's find the right property," highlight="together." text="Talk to an advisor about buying, selling, renting or investing.">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openModal("consult")}>Request a Consultation</button>
            <Link className="btn btn--white btn--lg" to="/contact">Contact Us</Link>
          </CtaBand>
        </div>
      </section>
    </>
  );
}
