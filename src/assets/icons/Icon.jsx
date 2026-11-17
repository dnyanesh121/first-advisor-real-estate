import { ICON_PATHS } from "./iconPaths";

/** Stroke icon. <Icon name="heart" size={18} /> */
export default function Icon({ name, size, className, style, strokeWidth = 1.8 }) {
  const s = size ? { width: size, height: size, ...style } : style;
  return (
    <svg
      className={className}
      style={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || "" }}
    />
  );
}
