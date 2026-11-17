import { useMemo, useState } from "react";
import Lightbox from "./Lightbox";
import Photo from "../common/Photo";
import { galleryPhotos } from "../../data/images";

/** Three-tile gallery (1 large + 2 small) that opens the lightbox. */
export default function PropertyGallery({ property }) {
  const views = useMemo(() => galleryPhotos(property), [property]);
  const [index, setIndex] = useState(null);
  const go = (i) => setIndex(((i % views.length) + views.length) % views.length);

  return (
    <>
      <div className="gallery rise d1" aria-label="Property photos">
        {views.slice(0, 3).map((v, i) => (
          <button key={v.label} type="button" onClick={() => setIndex(i)} aria-label={`Open photo ${i + 1}: ${v.label}`}>
            <Photo src={v.src} alt={v.alt} eager={i === 0} sizes={i === 0 ? "(max-width: 700px) 100vw, 66vw" : "(max-width: 700px) 50vw, 33vw"} />
            <span className="badge badge--glass cap">{v.label}</span>
            {i === 2 && views.length > 3 && <span className="more">+{views.length - 3} more photos</span>}
          </button>
        ))}
      </div>
      <Lightbox views={views} index={index} onChange={go} onClose={() => setIndex(null)} />
    </>
  );
}
