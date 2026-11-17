import { useEffect, useState } from "react";

/** Range slider with a synced number box (prefix/suffix units). */
export default function SliderField({ id, label, min, max, step, value, onChange, prefix, suffix, format = (v) => v, inputWidth = 120, minLabel, maxLabel }) {
  const [text, setText] = useState(format(value));
  useEffect(() => { setText(format(value)); }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  const commit = () => {
    let v = parseFloat(String(text).replace(/[^\d.]/g, ""));
    if (Number.isNaN(v)) v = min;
    v = Math.min(max, Math.max(min, v));
    onChange(v);
    setText(format(v));
  };
  return (
    <div className="slider-field">
      <div className="top">
        <label htmlFor={id}>{label}</label>
        <div className="val">
          {prefix && <span>{prefix}</span>}
          <input id={`${id}N`} className="num" inputMode="decimal" aria-label={label} style={{ width: inputWidth }} value={text}
            onChange={(e) => setText(e.target.value)} onBlur={commit} onKeyDown={(e) => e.key === "Enter" && commit()} />
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
      <input type="range" id={id} min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      {(minLabel || maxLabel) && <div className="ends"><span>{minLabel}</span><span>{maxLabel}</span></div>}
    </div>
  );
}

/** Slider with a read-only value label (affordability / stamp duty tabs). */
export function SimpleSlider({ id, label, min, max, step, value, onChange, display }) {
  return (
    <div className="slider-field">
      <div className="top"><label htmlFor={id}>{label}</label><b className="num" style={{ color: "var(--navy)" }}>{display}</b></div>
      <input type="range" id={id} min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
