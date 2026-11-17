import { useEffect } from "react";

const SUFFIX = "First Advisors Real Estate";

/** Sets the browser tab title for the current page. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;
  }, [title]);
}
