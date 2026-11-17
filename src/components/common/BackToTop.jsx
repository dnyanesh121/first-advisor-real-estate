import Icon from "../../assets/icons/Icon";
import useScrolled from "../../hooks/useScrolled";

export default function BackToTop() {
  const show = useScrolled(700);
  return (
    <button type="button" className={`to-top ${show ? "show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <Icon name="arrowUp" />
    </button>
  );
}
