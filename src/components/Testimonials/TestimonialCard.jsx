import Icon from "../../assets/icons/Icon";
import Stars from "../common/Stars";
import { cx } from "../../utils/classNames";

export default function TestimonialCard({ item: t, full }) {
  return (
    <article className={cx("tcard", full && "is-full")}>
      <Icon name="quote" className="quote" />
      <h4>{t.title}</h4>
      <p>{t.text}</p>
      <div className="who">
        <b>{t.name}</b>
        <span>{t.role} · {t.city}</span>
        <div><Stars value={t.rating} /></div>
      </div>
    </article>
  );
}
