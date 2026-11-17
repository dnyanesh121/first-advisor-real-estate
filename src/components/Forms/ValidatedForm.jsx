import { createContext, useCallback, useContext, useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";
import { validateControl } from "../../utils/validation";

const FormCtx = createContext({ errors: {}, revalidate: () => {} });
export const useFormErrors = () => useContext(FormCtx);

const labelFor = (form, el) =>
  (form.querySelector(`label[for="${el.id}"]`)?.textContent || el.getAttribute("aria-label") || "This field").replace(/\*/g, "").trim();

/**
 * Form wrapper with inline validation and a success message.
 * Frontend only: nothing is sent. Replace the timeout in handleSubmit with a fetch()
 * to your API when a backend is available.
 */
export default function ValidatedForm({
  children, className, style, successTitle = "Thank you", success = "Our advisor will contact you shortly.",
  onSubmitted, resetOnSuccess = true, submitLabel
}) {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);

  const revalidate = useCallback((el) => {
    const msg = validateControl(el, labelFor(formRef.current, el));
    setErrors((prev) => (prev[el.id] === msg ? prev : { ...prev, [el.id]: msg }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const next = {};
    let first = null;
    Array.from(form.elements).forEach((el) => {
      if (!el.id || el.disabled || el.type === "hidden" || el.tagName === "BUTTON" || el.tagName === "FIELDSET") return;
      const msg = validateControl(el, labelFor(form, el));
      if (msg) { next[el.id] = msg; first = first || el; }
    });
    setErrors(next);
    if (first) { first.focus(); return; }

    setSending(true);
    const data = Object.fromEntries(Array.from(form.elements).filter((el) => el.id).map((el) => [el.name || el.id, el.type === "checkbox" ? el.checked : el.value]));
    setTimeout(() => {
      const name = (form.elements.name?.value || "").trim().split(" ")[0];
      setDone({ title: successTitle + (name ? `, ${name}` : "") + ".", text: typeof success === "function" ? success(data) : success });
      setSending(false);
      if (resetOnSuccess) form.reset();
      onSubmitted?.(data);
    }, 700);
  };

  return (
    <FormCtx.Provider value={{ errors, revalidate, sending, submitLabel }}>
      <form ref={formRef} className={className} style={style} noValidate onSubmit={handleSubmit}>
        {children}
      </form>
      {done && (
        <div className="form-success" role="status">
          <Icon name="checkbox" />
          <div><b>{done.title}</b> {done.text} <em style={{ opacity: 0.75 }}>(Demo: no data was sent.)</em></div>
        </div>
      )}
    </FormCtx.Provider>
  );
}

/** Submit button that shows a spinner while the form is "sending". */
export function SubmitButton({ className = "btn btn--primary", children, style }) {
  const { sending } = useFormErrors();
  return (
    <button className={className} type="submit" disabled={sending} style={style}>
      {sending ? (
        <><span style={{ width: 16, height: 16, border: "2px solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Sending…</>
      ) : children}
    </button>
  );
}
