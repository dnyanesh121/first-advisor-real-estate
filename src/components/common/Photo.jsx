import { photoSrcSet, photoUrl } from "../../data/images";

/**
 * Responsive photo served from the image CDN (see data/images.js).
 * Lazy-loaded by default; pass `eager` for above-the-fold images.
 * `sizes` should describe the rendered width so the browser picks a small file.
 */
export default function Photo({ src, alt = "", sizes = "(max-width: 700px) 100vw, 400px", eager, width = 1200, height = 800, ...rest }) {
  return (
    <img
      src={photoUrl(src, eager ? 1600 : 800)}
      srcSet={photoSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchpriority={eager ? "high" : undefined}
      {...rest}
    />
  );
}
