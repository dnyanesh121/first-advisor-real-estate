import SvgArt from "./SvgArt";
import { emptySVG } from "../../utils/art";

export default function EmptyState({ title, text, children }) {
  return (
    <div className="empty">
      <SvgArt html={emptySVG()} />
      <h3>{title}</h3>
      <p>{text}</p>
      {children && <div className="flex" style={{ justifyContent: "center" }}>{children}</div>}
    </div>
  );
}
