import Disclaimer from "../common/Disclaimer";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import EnquiryForm from "./EnquiryForm";

/** Disclaimer + enquiry form block used at the bottom of the home page. */
export default function ContactSection() {
  return (
    <section className="section section--white" id="enquire">
      <div className="container narrow">
        <Disclaimer />
        <SectionTitle title="Speak to a" highlight="Real Estate Advisor" subtitle="Share your requirements and our team will contact you shortly." style={{ marginTop: 36 }} />
        <Reveal variant="zoom" className="form-card"><EnquiryForm /></Reveal>
      </div>
    </section>
  );
}
