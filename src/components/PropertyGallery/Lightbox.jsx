import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "../../assets/icons/Icon";
import Photo from "../common/Photo";
import useKeydown from "../../hooks/useKeydown";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

/** Full-screen photo viewer: arrows, thumbnails, keyboard and swipe. */
export default function Lightbox({ views, index, onChange, onClose }) {
  const open = index !== null;
  const closeRef = useRef(null);
  const touchX = useRef(0);
  useLockBodyScroll(open);
  useKeydown((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onChange(index - 1);
    if (e.key === "ArrowRight") onChange(index + 1);
  }, open);
  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  if (!open) return null;
  const v = views[index];

  return createPortal(
    <div
      className="lightbox is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50) onChange(index + (d < 0 ? 1 : -1)); }}
    >
      <div className="lb-top">
        <span className="num">{index + 1} / {views.length} · {v.label}</span>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close viewer" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}><Icon name="x" strokeWidth={2} /></button>
      </div>
      <div className="lb-stage">
        <button type="button" className="lb-nav lb-prev" onClick={() => onChange(index - 1)} aria-label="Previous photo"><Icon name="chevronL" size={22} strokeWidth={2} /></button>
        <div key={index} style={{ width: "100%", display: "grid", placeItems: "center" }}><Photo src={v.src} alt={v.alt} eager sizes="(max-width: 1180px) 100vw, 1100px" /></div>
        <button type="button" className="lb-nav lb-next" onClick={() => onChange(index + 1)} aria-label="Next photo"><Icon name="chevronR" size={22} strokeWidth={2} /></button>
      </div>
      <div className="lb-thumbs">
        {views.map((t, i) => (
          <button key={t.label + i} type="button" aria-current={i === index} aria-label={t.label} onClick={() => onChange(i)}><Photo src={t.src} alt="" sizes="84px" width={84} height={52} /></button>
        ))}
      </div>
    </div>,
    document.body
  );
}
