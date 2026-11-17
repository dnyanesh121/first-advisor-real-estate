import { memo } from "react";

/**
 * Renders a generated SVG/HTML string (see utils/art.js) without an extra box,
 * so parent selectors like `.media svg` keep working.
 */
function SvgArt({ html }) {
  return <span className="svg-host" dangerouslySetInnerHTML={{ __html: html }} />;
}
export default memo(SvgArt);
