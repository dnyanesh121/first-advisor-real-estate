import { useFormErrors } from "./ValidatedForm";
import { cx } from "../../utils/classNames";

/**
 * Labelled form control with inline error.
 * <Field id="f-name" label="Full Name" name="name" required />
 * <Field id="f-svc" label="Service" as="select" options={["Buy","Sell"]} />
 * phone → 10-digit Indian mobile validation; sm → compact style.
 */
export default function Field({
  id, label, as = "input", options, phone, sm, full, className, hideLabel, children, onInput, ...props
}) {
  const { errors, revalidate } = useFormErrors();
  const error = errors[id];
  const base = as === "select" ? "select" : as === "textarea" ? "textarea" : "input";
  const control = {
    id,
    className: cx(base, sm && `${base}--sm`),
    "aria-invalid": error ? true : undefined,
    onBlur: (e) => e.target.value && revalidate(e.target),
    onChange: (e) => error && revalidate(e.target),
    ...props
  };
  if (phone) {
    Object.assign(control, {
      "data-phone": "",
      inputMode: "numeric",
      maxLength: 10,
      autoComplete: props.autoComplete || "tel",
      onInput: (e) => { e.target.value = e.target.value.replace(/\D/g, ""); onInput?.(e); }
    });
  } else if (onInput) control.onInput = onInput;

  return (
    <div className={cx("field", sm && "field--sm", full && "full", error && "has-error", className)}>
      {label && <label htmlFor={id} className={hideLabel ? "sr-only" : undefined}>{label}</label>}
      {as === "select" ? (
        <select {...control}>
          {options ? options.map((o) => (Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o}>{o}</option>)) : children}
        </select>
      ) : as === "textarea" ? (
        <textarea {...control} />
      ) : (
        <input {...control} />
      )}
      {error && <span className="err" aria-live="polite">{error}</span>}
    </div>
  );
}

/** Checkbox with label, validated when required. */
export function Check({ id, label, className, style, ...props }) {
  const { errors, revalidate } = useFormErrors();
  const error = errors[id];
  return (
    <div className={cx("field", error && "has-error", className)} style={style}>
      <label className="check" style={{ fontWeight: 400, color: "inherit", fontSize: 14 }}>
        <input type="checkbox" id={id} onChange={(e) => error && revalidate(e.target)} {...props} /> {label}
      </label>
      {error && <span className="err">{error}</span>}
    </div>
  );
}
