import { Navigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Photo from "../../components/common/Photo";
import { HERO } from "../../data/images";
import Avatar from "../../components/common/Avatar";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Reveal from "../../components/common/Reveal";
import SectionTitle from "../../components/common/SectionTitle";
import Stars from "../../components/common/Stars";
import AgentCard from "../../components/AgentCard/AgentCard";
import PropertyGrid from "../../components/PropertyCard/PropertyGrid";
import TestimonialCard from "../../components/Testimonials/TestimonialCard";
import ValidatedForm, { SubmitButton } from "../../components/Forms/ValidatedForm";
import Field from "../../components/Forms/Field";
import { AGENTS, getAgent } from "../../data/agents";
import { PROPERTIES } from "../../data/properties";
import { SITE } from "../../data/site";
import { TESTIMONIALS } from "../../data/testimonials";
import { useApp } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const STRENGTHS = ["Site visits arranged within 48 hours", "Document checklist for every property", "Loan sanction coordination", "Registration support"];

export default function AgentDetails() {
  const { id } = useParams();
  const a = getAgent(id);
  const { toast } = useApp();
  useDocumentTitle(a ? `${a.name} — ${a.role}` : "Advisor not found");
  if (!a) return <Navigate to="/404" replace />;

  const first = a.name.split(" ")[0];
  const listings = PROPERTIES.filter((p) => p.agent === a.id);
  const reviews = TESTIMONIALS.filter((_, i) => (i + a.id) % 3 === 0).slice(0, 4);
  const others = AGENTS.filter((x) => x.id !== a.id).sort((x, y) => (y.city === a.city) - (x.city === a.city)).slice(0, 4);
  const share = () => navigator.clipboard?.writeText(window.location.href).then(() => toast("Profile link copied"), () => toast("Copy the link from the address bar"));

  return (
    <>
      <section className="page-hero page-hero--photo" style={{ paddingBottom: 96 }}>
        <Photo className="page-hero__img" src={HERO.src} alt="" aria-hidden="true" eager sizes="(max-width: 760px) 100vw, 64vw" />
        <div className="container"><div className="rise"><Breadcrumbs crumbs={[["Our Advisors", "/agents"], [a.name]]} /></div></div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="profile">
            <Avatar person={a} size="xl" />
            <div>
              <h1>{a.name}</h1>
              <div className="role">{a.role} · {a.area}, {a.city}</div>
              <div className="mt-2"><Stars value={a.rating} /> <b className="num" style={{ color: "var(--navy)" }}>{a.rating}</b> <span className="muted num">({a.reviews} reviews)</span></div>
              <div className="pills">
                {a.spec.map((s) => <span key={s} className="badge badge--soft">{s}</span>)}
                {a.langs.map((l) => <span key={l} className="chip" style={{ padding: "3px 10px", fontSize: 12 }}><Icon name="lang" size={14} />{l}</span>)}
              </div>
              <div className="pstats num">
                <div><b>{a.exp}+</b>Years experience</div>
                <div><b>{a.deals}+</b>Deals closed</div>
                <div><b>{listings.length}</b>Active listings</div>
                <div><b>{a.rating}</b>Avg. rating</div>
              </div>
            </div>
            <div className="acts">
              <a className="btn btn--primary" href={`tel:${SITE.phoneRaw}`}><Icon name="phone" />Call {first}</a>
              <a className="btn btn--outline" href="#contact"><Icon name="mail" />Message</a>
              <button type="button" className="btn btn--ghost" onClick={share}><Icon name="share" />Share</button>
            </div>
          </Reveal>

          <div className="pd-layout">
            <div>
              <Reveal className="panel">
                <h2>About <em>{first}</em></h2>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.75 }}>{a.bio} {first} works closely with our loans and legal teams, so clients get a single point of contact from the first visit to registration.</p>
                <div className="amen-grid" style={{ marginTop: 14 }}>{STRENGTHS.map((s) => <span key={s}><Icon name="check" />{s}</span>)}</div>
              </Reveal>
              <Reveal className="panel">
                <h2>Active <em>Listings</em></h2>
                {listings.length
                  ? <PropertyGrid properties={listings} style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }} />
                  : <p className="muted">No active listings right now.</p>}
              </Reveal>
              <Reveal className="panel">
                <h2>Client <em>Reviews</em></h2>
                <span className="sample-note" style={{ margin: "0 0 14px" }}>Sample reviews</span>
                <div className="grid grid-2">{reviews.map((t) => <TestimonialCard key={t.name} item={t} full />)}</div>
              </Reveal>
            </div>
            <aside className="pd-side" id="contact">
              <div className="panel">
                <h2 style={{ fontSize: 18 }}>Contact <em>{first}</em></h2>
                <ValidatedForm className="stack" successTitle="Message sent" success="The advisor will call you within one working day.">
                  <Field id="a-name" name="name" label="Your name" sm required />
                  <Field id="a-phone" label="Mobile number" sm phone required />
                  <Field id="a-email" label="Email" sm type="email" />
                  <Field id="a-need" label="I'm looking to" sm as="select" options={["Buy", "Sell", "Rent", "Invest", "Get a home loan"]} />
                  <Field id="a-msg" label="Message" sm as="textarea" style={{ minHeight: 90 }} defaultValue={`Hi ${first}, I'd like help with a property in ${a.city}.`} />
                  <SubmitButton className="btn btn--primary btn--block">Send Message</SubmitButton>
                </ValidatedForm>
              </div>
              <div className="panel">
                <b style={{ color: "var(--navy)" }}>Office</b>
                <p className="muted" style={{ fontSize: 13, margin: "6px 0 0" }}>{a.city === "Mumbai" ? SITE.address : `${a.area}, ${a.city} branch (sample)`}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Other" highlight="Advisors" />
          <div className="grid grid-4">{others.map((x, i) => <AgentCard key={x.id} agent={x} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}
