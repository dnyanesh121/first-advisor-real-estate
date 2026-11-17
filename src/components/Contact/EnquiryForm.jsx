import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";

export const SERVICE_OPTIONS = ["Buy", "Sell", "Rent", "Invest", "Commercial", "Home Loan"];
export const BUDGET_OPTIONS = ["Under ₹50 lakh", "₹50 lakh – ₹1 Cr", "₹1 – 2 Cr", "₹2 – 5 Cr", "Above ₹5 Cr"];

/**
 * "Speak to a Real Estate Advisor" form from the design.
 * extended → adds message, contact preference and consent (Contact page).
 */
export default function EnquiryForm({ extended, service, message, children }) {
  const services = service && !SERVICE_OPTIONS.includes(service) ? [...SERVICE_OPTIONS, service] : extended ? [...SERVICE_OPTIONS, "Rent Agreement", "Pay Rent", "Property Valuation"] : SERVICE_OPTIONS;
  return (
    <ValidatedForm className="form-grid" successTitle="Thank you" success="A property advisor will call you within one working day.">
      <Field id="f-name" name="name" label="Full Name" required autoComplete="name" />
      <Field id="f-phone" label="Mobile Number" phone required />
      <Field id="f-email" label="Email Address" type="email" required autoComplete="email" />
      <Field id="f-svc" label="Service Required" as="select" options={[...new Set(services)]} defaultValue={service || "Buy"} key={service || "default"} />
      <Field id="f-loc" label="Preferred Location" placeholder="e.g. Malad East, Thane West" />
      <Field id="f-bud" label="Budget Range" as="select" options={extended ? [...BUDGET_OPTIONS, "Not applicable"] : BUDGET_OPTIONS} />
      {children}
      {extended && (
        <Field id="f-msg" full as="textarea" label="Message" placeholder="Tell us what you're looking for, your timeline, or any questions." defaultValue={message} key={message || "msg"} />
      )}
      <div className="full submit-row">
        <SubmitButton className="btn btn--primary btn--lg">Submit Enquiry</SubmitButton>
        {!extended && <span className="muted" style={{ fontSize: 12.5 }}>By submitting you agree to be contacted by First Advisors.</span>}
      </div>
    </ValidatedForm>
  );
}
