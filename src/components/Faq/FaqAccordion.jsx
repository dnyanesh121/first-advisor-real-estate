import { useState } from "react";
import Icon from "../../assets/icons/Icon";

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

/** Single-open accordion. items: [{ q, a }] */
export default function FaqAccordion({ items, query = "", defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="acc">
      {items.map((f, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;
        return (
          <div key={f.q} className={`acc-item ${isOpen ? "is-open" : ""}`}>
            <button type="button" className="acc-btn" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{highlight(f.q, query)}</span>
              <span className="pm"><Icon name="plus" /></span>
            </button>
            <div className="acc-panel" id={id} role="region">
              <div><p>{highlight(f.a, query)}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
