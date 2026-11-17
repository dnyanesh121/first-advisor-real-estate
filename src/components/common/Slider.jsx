import { Children, useCallback, useEffect, useRef, useState } from "react";
import Icon from "../../assets/icons/Icon";

/** Scroll-snap carousel with arrows, dots and optional autoplay (pauses on hover/focus). */
export default function Slider({ children, autoplay = 0, label = "slide" }) {
  const track = useRef(null);
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(0);
  const paused = useRef(false);

  const step = useCallback(() => {
    const first = track.current?.children[0];
    return first ? first.getBoundingClientRect().width + 20 : track.current?.clientWidth || 1;
  }, []);

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const n = Math.max(1, Math.round((t.scrollWidth - t.clientWidth) / step()) + 1);
    setPages(n);
    setCurrent(Math.min(Math.round(t.scrollLeft / step()), n - 1));
  }, [step]);

  const go = useCallback((i) => {
    const t = track.current;
    if (!t) return;
    const n = Math.max(1, Math.round((t.scrollWidth - t.clientWidth) / step()) + 1);
    t.scrollTo({ left: (((i % n) + n) % n) * step(), behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, children]);

  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden && track.current) go(Math.round(track.current.scrollLeft / step()) + 1);
    }, autoplay);
    return () => clearInterval(id);
  }, [autoplay, go, step]);

  let scrollTimer;
  const onScroll = () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(measure, 80); };
  const pause = (v) => () => { paused.current = v; };

  return (
    <div className="slider" onMouseEnter={pause(true)} onMouseLeave={pause(false)} onFocus={pause(true)} onBlur={pause(false)}>
      <div className="slider-track" ref={track} onScroll={onScroll}>
        {Children.toArray(children)}
      </div>
      <div className="slider-nav">
        <button type="button" className="icon-btn" onClick={() => go(current - 1)} aria-label={`Previous ${label}`}><Icon name="chevronL" strokeWidth={2} /></button>
        <div className="dots">
          {Array.from({ length: pages }, (_, i) => (
            <button type="button" key={i} aria-label={`Go to ${label} ${i + 1}`} aria-current={i === current} onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className="icon-btn" onClick={() => go(current + 1)} aria-label={`Next ${label}`}><Icon name="chevronR" strokeWidth={2} /></button>
      </div>
    </div>
  );
}
