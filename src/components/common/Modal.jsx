import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../../assets/icons/Icon";
import useKeydown from "../../hooks/useKeydown";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

/** Accessible dialog with scrim, Escape to close and focus return. */
export default function Modal({ open, onClose, title, subtitle, children, id }) {
  const boxRef = useRef(null);
  const lastFocus = useRef(null);
  useLockBodyScroll(open);
  useKeydown((e) => e.key === "Escape" && onClose(), open);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      const t = setTimeout(() => boxRef.current?.querySelector("input,select,textarea,button:not(.close)")?.focus(), 60);
      return () => clearTimeout(t);
    }
    lastFocus.current?.focus?.();
    return undefined;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="modal is-open" id={id}>
          <motion.div className="scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            ref={boxRef}
            className="box"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="icon-btn close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
            <h3 id={`${id}-title`}>{title}</h3>
            {subtitle && <p className="muted" style={{ margin: "6px 0 20px", fontSize: 14 }}>{subtitle}</p>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
