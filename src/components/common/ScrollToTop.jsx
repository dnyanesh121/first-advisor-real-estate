import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top on page change, or to #hash targets. */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]); // eslint-disable-line react-hooks/exhaustive-deps
  void search;
  return null;
}
