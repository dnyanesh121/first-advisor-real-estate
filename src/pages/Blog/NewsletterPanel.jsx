import ValidatedForm, { SubmitButton } from "../../components/Forms/ValidatedForm";
import Field from "../../components/Forms/Field";

/** Sidebar newsletter sign-up used on the blog pages. */
export default function NewsletterPanel({ id = "side-email" }) {
  return (
    <div className="panel" style={{ background: "var(--grad-navy)", color: "#fff" }}>
      <b style={{ fontSize: 17 }}>Property guides in your inbox</b>
      <p style={{ fontSize: 13, opacity: 0.85, margin: "6px 0 12px" }}>One short email a fortnight. No spam.</p>
      <ValidatedForm className="stack" successTitle="Subscribed" success="You're subscribed.">
        <Field id={id} sm type="email" required aria-label="Email" placeholder="Your email" />
        <SubmitButton className="btn btn--primary btn--sm btn--block">Subscribe</SubmitButton>
      </ValidatedForm>
    </div>
  );
}
