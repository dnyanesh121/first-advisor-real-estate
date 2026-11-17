import Icon from "../../assets/icons/Icon";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toastState } = useApp();
  return (
    <div className={`toast ${toastState.msg ? "show" : ""}`} role="status" aria-live="polite">
      {toastState.msg && (
        <>
          <Icon name="check" size={18} style={{ color: "#7DE0A8" }} />
          <span key={toastState.key}>{toastState.msg}</span>
        </>
      )}
    </div>
  );
}
