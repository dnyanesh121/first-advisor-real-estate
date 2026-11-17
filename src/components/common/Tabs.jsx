import { useState } from "react";

/**
 * tabs: [{ id, label, content }]
 * Renders the tablist + only the active panel.
 */
export default function Tabs({ tabs, label, style, initial }) {
  const [active, setActive] = useState(initial || tabs[0].id);
  return (
    <>
      <div className="tabs" role="tablist" aria-label={label} style={style}>
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} aria-selected={active === t.id} onClick={() => setActive(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.content}
        </div>
      ))}
    </>
  );
}
