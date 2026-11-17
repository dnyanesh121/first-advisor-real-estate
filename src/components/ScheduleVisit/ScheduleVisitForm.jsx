import { useMemo, useState } from "react";
import Icon from "../../assets/icons/Icon";
import ValidatedForm, { SubmitButton } from "../Forms/ValidatedForm";
import Field from "../Forms/Field";

const TIMES = ["10:00 am", "11:30 am", "1:00 pm", "3:00 pm", "4:30 pm", "6:00 pm"];
const VISIT_TYPES = ["In person", "Video tour"];

/** Date strip (next 10 days) + time slots + visit type + contact details. */
export default function ScheduleVisitForm({ property }) {
  const days = useMemo(() => Array.from({ length: 10 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; }), []);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);
  const [type, setType] = useState(VISIT_TYPES[0]);
  const summary = `${type} · ${days[day].toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at ${TIMES[time]}`;

  return (
    <ValidatedForm className="stack" successTitle="Visit requested" success={() => `Requested for ${property.title}: ${summary}. The advisor will call to confirm your slot.`}>
      <div>
        <span className="label" style={{ fontSize: 13 }}>Pick a date</span>
        <div className="slot-grid date-strip mt-2" role="group" aria-label="Visit date">
          {days.map((d, i) => (
            <button key={d.toDateString()} type="button" aria-pressed={i === day} onClick={() => setDay(i)}>
              {d.toLocaleDateString("en-IN", { weekday: "short" })}<b>{d.getDate()}</b>{d.toLocaleDateString("en-IN", { month: "short" })}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="label" style={{ fontSize: 13 }}>Preferred time</span>
        <div className="slot-grid times mt-2" role="group" aria-label="Visit time">
          {TIMES.map((t, i) => <button key={t} type="button" aria-pressed={i === time} onClick={() => setTime(i)}>{t}</button>)}
        </div>
      </div>
      <div className="seg" style={{ marginTop: 4 }}>
        {VISIT_TYPES.map((t) => <button key={t} type="button" aria-pressed={t === type} onClick={() => setType(t)}>{t}</button>)}
      </div>
      <Field id="vName" name="name" label="Your name" sm required autoComplete="name" />
      <Field id="vPhone" label="Mobile number" sm phone required />
      <SubmitButton className="btn btn--primary btn--block"><Icon name="calendar" />Request Site Visit</SubmitButton>
      <p className="muted center" style={{ fontSize: 12.5, margin: 0 }}>{summary}</p>
    </ValidatedForm>
  );
}
