import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";

export default function Newsletter() {
  return (
    <div className="news">
      <div>
        <h3>Get new listings &amp; market guides <em>in your inbox</em></h3>
        <p>One short email a fortnight. Unsubscribe anytime.</p>
      </div>
      <ValidatedForm className="news-form" successTitle="Subscribed" success="You are subscribed to property updates.">
        <Field id="nl-email" type="email" required placeholder="Your email address" aria-label="Email" style={{ flex: 1 }} className="" />
        <SubmitButton style={{ minHeight: 46 }}>Subscribe</SubmitButton>
      </ValidatedForm>
    </div>
  );
}
