import Modal from "../common/Modal";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";

export const SERVICES_LIST = ["Buy", "Sell", "Rent", "Invest", "Commercial", "Home Loan"];

export default function ConsultModal({ open, onClose }) {
  return (
    <Modal id="consultModal" open={open} onClose={onClose} title={<>Request a <em className="hl">Consultation</em></>} subtitle="Share a few details and an advisor will call you back.">
      <ValidatedForm className="stack" successTitle="Request received" success="An advisor will call you within one working day.">
        <Field id="cm-name" name="name" label="Full Name" required autoComplete="name" />
        <Field id="cm-phone" label="Mobile Number" phone required />
        <Field id="cm-svc" label="Service Required" as="select" options={SERVICES_LIST} />
        <SubmitButton className="btn btn--primary btn--block btn--lg">Request Callback</SubmitButton>
      </ValidatedForm>
    </Modal>
  );
}
