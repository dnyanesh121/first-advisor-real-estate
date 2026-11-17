import { useEffect, useRef } from "react";

/** Calls handler(event) for every keydown while `active` is true. */
export default function useKeydown(handler, active = true) {
  const saved = useRef(handler);
  saved.current = handler;
  useEffect(() => {
    if (!active) return undefined;
    const fn = (e) => saved.current(e);
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [active]);
}
