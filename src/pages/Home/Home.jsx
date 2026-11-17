import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/common/Stats";
import SectionTitle from "../../components/common/SectionTitle";
import Services from "../../components/Services/Services";
import Process from "../../components/Process/Process";
import WhyUs from "../../components/WhyUs/WhyUs";
import PropertyCategories from "../../components/PropertyCategories/PropertyCategories";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import Plans from "../../components/Plans/Plans";
import FinancialServices from "../../components/FinancialServices/FinancialServices";
import TestimonialsSection from "../../components/Testimonials/TestimonialsSection";
import AgentCard from "../../components/AgentCard/AgentCard";
import BlogCard from "../../components/BlogCard/BlogCard";
import FaqAccordion from "../../components/Faq/FaqAccordion";
import ContactSection from "../../components/Contact/ContactSection";
import { AGENTS } from "../../data/agents";
import { BLOGS } from "../../data/blogs";
import { FAQS } from "../../data/faqs";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("");
  return (
    <>
      <Hero />
      <section className="stats-band" aria-label="At a glance"><div className="container"><Stats /></div></section>
      <Services />
      <Process />
      <WhyUs />
      <PropertyCategories />
      <FeaturedProperties />
      <Plans />
      <FinancialServices />
      <TestimonialsSection />

      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Meet Our" highlight="Advisors" subtitle="One advisor from first site visit to registration" />
          <div className="grid grid-4">{AGENTS.slice(0, 4).map((a, i) => <AgentCard key={a.id} agent={a} index={i} />)}</div>
          <div className="center mt-10"><Link className="btn btn--outline" to="/agents">View All Advisors</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title="Guides &" highlight="Insights" subtitle="Practical advice for buyers, sellers and investors" />
          <div className="grid grid-3">{BLOGS.slice(0, 3).map((b, i) => <BlogCard key={b.id} post={b} index={i} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container narrow">
          <SectionTitle title="Frequently Asked" highlight="Questions" />
          <FaqAccordion items={FAQS.slice(0, 5)} />
          <div className="center mt-8"><Link className="link-arrow" to="/faq">See all FAQs <Icon name="arrow" strokeWidth={2} /></Link></div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
