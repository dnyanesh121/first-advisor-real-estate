import Reveal from "./Reveal";
import useCountUp from "../../hooks/useCountUp";
import { SITE } from "../../data/site";

function Stat({ stat, index }) {
  const [ref, value] = useCountUp(stat.value);
  return (
    <Reveal className="stat" delay={index * 0.08}>
      <b className="num" ref={ref}>{stat.value ? value.toLocaleString("en-IN") + stat.suffix : stat.text}</b>
      <span>{stat.label}</span>
    </Reveal>
  );
}

/** Navy stat blocks (Properties Advised, Clients, Years, RERA). */
export default function Stats({ items = SITE.stats }) {
  return (
    <div className="stats">
      {items.map((s, i) => <Stat key={s.label} stat={s} index={i} />)}
    </div>
  );
}
