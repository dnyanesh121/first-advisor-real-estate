import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import SvgArt from "../../components/common/SvgArt";
import Disclaimer from "../../components/common/Disclaimer";
import EnquiryForm from "../../components/Contact/EnquiryForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import { Check } from "../../components/Forms/Field";
import { SITE } from "../../data/site";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { mapSVG } from "../../utils/art";

const PREFILL = {
  "Pay Rent": "I'd like to pay rent online through First Advisors. Please share the process.",
  "Rent Agreement": "I need a registered leave and licence (rent) agreement.",
  Sell: "I'd like to list my property for sale. Please arrange a valuation visit."
};
const OFFICES = [
  ["Mumbai — Head Office", SITE.address, true],
  ["Thane", "Ghodbunder Road, Thane West 400615 (sample address)"],
  ["Navi Mumbai", "Sector 17, Vashi, Navi Mumbai 400703 (sample address)"],
  ["Pune", "Baner Road, Baner, Pune 411045 (sample address)"]
];
const PREFS = ["Phone call", "WhatsApp", "Email"];

export default function Contact() {
  useDocumentTitle("Contact Us");
  const [params] = useSearchParams();
  const service = params.get("service") || "";
  const [pref, setPref] = useState(PREFS[0]);

  return (
    <>
      <PageHero title="Speak to a" highlight="Real Estate Advisor" crumbs={[["Contact Us"]]} lead="Share your requirements and our team will contact you shortly. Or call us toll free, Monday to Saturday." />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="form-card">
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>Send us an <em className="hl">enquiry</em></h2>
            <p className="muted" style={{ fontSize: 14, marginBottom: 22 }}>We usually respond within one working day.</p>
            <EnquiryForm extended service={service} message={PREFILL[service]}>
              <div className="field full">
                <span className="label">Preferred contact</span>
                <div className="opts flex">
                  {PREFS.map((p) => <button key={p} type="button" className="chip" aria-pressed={p === pref} onClick={() => setPref(p)}>{p}</button>)}
                </div>
              </div>
              <Check id="f-consent" required className="full" label="I agree to be contacted by First Advisors about my enquiry." />
            </EnquiryForm>
          </Reveal>
          <ContactInfo />
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Our" highlight="Offices" subtitle="Visit us, or ask your advisor to meet you at the property" />
          <div className="offices">
            {OFFICES.map(([name, addr, hq], i) => (
              <Reveal key={name} delay={i * 0.08} className={`office${hq ? " hq" : ""}`}>
                <b>{name}</b><p>{addr}</p>
                <a className="link-arrow" href={`tel:${SITE.phoneRaw}`}>{SITE.phone} <Icon name="arrow" /></a>
              </Reveal>
            ))}
          </div>
          <Reveal className="map-box mt-8" style={{ aspectRatio: "21/7" }}><SvgArt html={mapSVG(3, "Malad East, Mumbai")} /></Reveal>
        </div>
      </section>
      <section className="section"><div className="container narrow"><Disclaimer /></div></section>
    </>
  );
}
