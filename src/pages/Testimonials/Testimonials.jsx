import { Fragment, useEffect, useState } from "react";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import Stars, { STAR } from "../../components/common/Stars";
import TestimonialCard from "../../components/Testimonials/TestimonialCard";
import TestimonialsSlider from "../../components/Testimonials/TestimonialsSlider";
import ValidatedForm, { SubmitButton } from "../../components/Forms/ValidatedForm";
import Field from "../../components/Forms/Field";
import { TESTIMONIALS } from "../../data/testimonials";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const CATS = ["All", "Buy", "Sell", "Rent", "Invest", "Commercial"];
const avg = TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length;
const dist = [5, 4, 3, 2, 1].map((n) => [n, TESTIMONIALS.filter((t) => t.rating === n).length]);

export default function Testimonials() {
  useDocumentTitle("Client Testimonials");
  const [cat, setCat] = useState("All");
  const [rating, setRating] = useState(5);
  const [barsIn, setBarsIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBarsIn(true), 300); return () => clearTimeout(t); }, []);

  return (
    <>
      <PageHero title="What Our" highlight="Clients Say" crumbs={[["Testimonials"]]} lead="Stories from buyers, sellers, tenants and investors who worked with our advisors." />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <p className="center"><span className="sample-note" style={{ margin: "0 0 18px" }}>Sample testimonials — replace with verified client reviews before launch</span></p>
          <Reveal className="rating-sum">
            <div className="score">
              <b className="num">{avg.toFixed(1)}</b>
              <Stars value={avg} />
              <div className="muted num" style={{ fontSize: 13, marginTop: 4 }}>{TESTIMONIALS.length} reviews</div>
            </div>
            <div className="bars num">
              {dist.map(([n, c]) => (
                <div key={n}><span>{n} star</span><span className="track"><i style={{ width: barsIn ? `${(c / TESTIMONIALS.length) * 100}%` : 0 }} /></span><span>{c}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionTitle title="Featured" highlight="Stories" />
          <TestimonialsSlider items={TESTIMONIALS.filter((t) => t.rating === 5)} />
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <div className="flex between" style={{ marginBottom: 24 }}>
            <div className="sec-title sec-title--left" style={{ margin: 0 }}><h2>All <em>Reviews</em></h2></div>
            <div className="opts flex">{CATS.map((c) => <button key={c} type="button" className="chip" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}</div>
          </div>
          <div className="masonry">
            {TESTIMONIALS.filter((t) => cat === "All" || t.cat === cat).map((t) => <TestimonialCard key={t.name} item={t} full />)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <SectionTitle title="Share Your" highlight="Experience" subtitle="Worked with one of our advisors? We'd love to hear from you." />
          <Reveal className="form-card">
            <ValidatedForm className="form-grid" successTitle="Thank you for your review" success="Your review will appear after our team verifies it.">
              <Field id="r-name" name="name" label="Full Name" required />
              <Field id="r-city" label="City" required />
              <Field id="r-type" label="I was a" as="select" options={["Buyer", "Seller", "Tenant", "Landlord", "Investor"]} />
              <div className="field">
                <span className="label">Your rating</span>
                <div className="star-input" role="radiogroup" aria-label="Rating">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <Fragment key={n}>
                      <input type="radio" name="rating" id={`st${n}`} value={n} checked={rating === n} onChange={() => setRating(n)} />
                      <label htmlFor={`st${n}`} title={`${n} stars`}><span className="sr-only">{n} stars</span><svg viewBox="0 0 24 24"><path d={STAR} /></svg></label>
                    </Fragment>
                  ))}
                </div>
              </div>
              <Field id="r-title" full label="Review title" required />
              <Field id="r-text" full as="textarea" label="Your review" required data-min="30" />
              <div className="full"><SubmitButton className="btn btn--primary btn--lg">Submit Review</SubmitButton></div>
            </ValidatedForm>
          </Reveal>
        </div>
      </section>
    </>
  );
}
