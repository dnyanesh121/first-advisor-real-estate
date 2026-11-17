import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field, { Check } from "../Forms/Field";
import { listingId } from "../../utils/format";

export default function ContactAgentForm({ property, agent }) {
  const msg = `Hi ${agent.name.split(" ")[0]}, I'm interested in ${property.title} (${listingId(property)}). Please share more details.`;
  return (
    <ValidatedForm className="stack" successTitle="Message sent" success="The advisor will reply within one working day.">
      <Field id="cName" name="name" label="Your name" sm required />
      <Field id="cPhone" label="Mobile number" sm phone required />
      <Field id="cEmail" label="Email" sm type="email" required />
      <Field id="cMsg" label="Message" sm as="textarea" rows={4} style={{ minHeight: 96 }} defaultValue={msg} />
      <Check id="cLoan" defaultChecked label="I'm also interested in a home loan" />
      <SubmitButton className="btn btn--navy btn--block">Send Message</SubmitButton>
    </ValidatedForm>
  );
}
