import { useCallback, useEffect, useState } from "react";

/** useState that persists to localStorage and fails safely (private mode, blocked storage). */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }, [key, value]);

  // keep tabs in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return;
      try { setValue(e.newValue ? JSON.parse(e.newValue) : initialValue); } catch { /* ignore */ }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);
  return [value, setValue, reset];
}
