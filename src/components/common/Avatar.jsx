import { initials } from "../../utils/format";
import { cx } from "../../utils/classNames";

/** Initials avatar in brand gradients (swap for a photo by passing `src`). */
export default function Avatar({ person, size, src }) {
  return (
    <span className={cx("avatar", person.tone, size && `avatar--${size}`)} aria-hidden="true">
      {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> : initials(person.name)}
      <i className="on" />
    </span>
  );
}
