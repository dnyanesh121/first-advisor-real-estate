import Modal from "../common/Modal";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field, { Check } from "../Forms/Field";

export default function LoginModal({ open, onClose }) {
  return (
    <Modal id="loginModal" open={open} onClose={onClose} title={<>Login to <em className="hl">First Advisors</em></>} subtitle="Track saved properties, site visits and loan applications.">
      <ValidatedForm className="stack" successTitle="OTP requested" success="An OTP would be sent to your mobile on the live site.">
        <Field id="lg-phone" label="Mobile number" phone required placeholder="10-digit mobile number" />
        <Check id="lg-terms" required label="I agree to the Terms of Use and Privacy Policy" />
        <SubmitButton className="btn btn--primary btn--block btn--lg">Get OTP</SubmitButton>
        <p className="muted center" style={{ fontSize: 12.5, margin: 0 }}>New here? Your account is created automatically.</p>
      </ValidatedForm>
    </Modal>
  );
}
