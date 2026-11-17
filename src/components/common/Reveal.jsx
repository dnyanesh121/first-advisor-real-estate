import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const OFFSETS = {
  up: { y: 26 },
  left: { x: -30 },
  right: { x: 30 },
  zoom: { scale: 0.94 }
};
const cache = {};
const motionFor = (as) => (cache[as] = cache[as] || (typeof as === "string" ? motion[as] : motion(as)));

/**
 * Scroll-reveal wrapper (fade + slide), shared by every section and card.
 * <Reveal as="article" variant="left" delay={0.1} className="pcard">…</Reveal>
 */
export default function Reveal({ as = "div", variant = "up", delay = 0, children, ...rest }) {
  const Comp = motionFor(as);
  const small = typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
  const from = small && (variant === "left" || variant === "right") ? OFFSETS.up : OFFSETS[variant] || OFFSETS.up;
  return (
    <Comp
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
