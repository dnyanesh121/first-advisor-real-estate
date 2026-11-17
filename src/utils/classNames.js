/* Join truthy class names: cx("btn", isActive && "is-active") */
export const cx = (...parts) => parts.filter(Boolean).join(" ");
