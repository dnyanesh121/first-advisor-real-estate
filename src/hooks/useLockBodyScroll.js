import { useEffect } from "react";

/** Prevents the page behind an open overlay from scrolling. */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
