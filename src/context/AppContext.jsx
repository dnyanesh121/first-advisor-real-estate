import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);
const MAX_COMPARE = 3;
const EMPTY = [];

/** Global UI state: saved list, compare list, toast and modals. */
export function AppProvider({ children }) {
  const [saved, setSaved] = useLocalStorage("fa_saved", EMPTY);
  const [compare, setCompareList] = useLocalStorage("fa_compare", EMPTY);
  const [toastState, setToastState] = useState({ msg: null, key: 0 });
  const [modal, setModal] = useState(null);
  const timer = useRef();

  const toast = useCallback((msg) => {
    clearTimeout(timer.current);
    setToastState((t) => ({ msg, key: t.key + 1 }));
    timer.current = setTimeout(() => setToastState((t) => ({ ...t, msg: null })), 3200);
  }, []);

  const isSaved = useCallback((id) => saved.includes(Number(id)), [saved]);
  const toggleSaved = useCallback((id) => {
    id = Number(id);
    const adding = !saved.includes(id);
    setSaved(adding ? [...saved, id] : saved.filter((x) => x !== id));
    toast(adding ? <>Saved to your list. <Link to="/saved">View saved</Link></> : "Removed from saved");
  }, [saved, setSaved, toast]);
  const clearSaved = useCallback(() => setSaved([]), [setSaved]);

  const isCompared = useCallback((id) => compare.includes(Number(id)), [compare]);
  const toggleCompare = useCallback((id) => {
    id = Number(id);
    if (compare.includes(id)) {
      setCompareList(compare.filter((x) => x !== id));
      toast("Removed from compare");
      return;
    }
    if (compare.length >= MAX_COMPARE) { toast("You can compare up to 3 properties. Remove one first."); return; }
    const next = [...compare, id];
    setCompareList(next);
    toast(next.length > 1 ? <>Added to compare. <Link to="/compare">Compare now</Link></> : "Added to compare. Add one more to compare.");
  }, [compare, setCompareList, toast]);
  const setCompare = useCallback((ids) => setCompareList(ids.map(Number).slice(0, MAX_COMPARE)), [setCompareList]);
  const clearCompare = useCallback(() => setCompareList([]), [setCompareList]);

  const value = useMemo(() => ({
    saved, isSaved, toggleSaved, clearSaved,
    compare, isCompared, toggleCompare, setCompare, clearCompare, maxCompare: MAX_COMPARE,
    toast, toastState,
    modal, openModal: setModal, closeModal: () => setModal(null)
  }), [saved, isSaved, toggleSaved, clearSaved, compare, isCompared, toggleCompare, setCompare, clearCompare, toast, toastState, modal]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
