import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import Slider from "../common/Slider";
import Photo from "../common/Photo";
import { SERVICES } from "../../data/content";
import { scenePhoto } from "../../data/images";

/** `photo` is { src, alt } — see scenePhoto() in data/images.js. */
export function MediaCard({ title, text, photo, to, badge, label, ...rest }) {
  const inner = (
    <>
      <div className="media" style={badge ? { position: "relative" } : undefined}>
        <Photo src={photo.src} alt={photo.alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" />
        {badge && <span className="badge badge--accent" style={{ position: "absolute", left: 12, top: 12 }}>{badge}</span>}
      </div>
      <div className="body"><h3>{title}</h3>{text && <p>{text}</p>}</div>
    </>
  );
  const cls = `mcard${label ? " mcard--label" : ""}`;
  return to ? <Link className={cls} to={to} {...rest}>{inner}</Link> : <div className={cls} {...rest}>{inner}</div>;
}

/** "Our Real Estate Services" carousel. */
export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Our Real Estate" highlight="Services" subtitle="Comprehensive Property Solutions" />
        <Reveal>
          <Slider autoplay={5000} label="service">
            {SERVICES.map((s, i) => <MediaCard key={s.title} title={s.title} text={s.text} to={s.href} photo={scenePhoto(s.scene, i + 1)} />)}
          </Slider>
        </Reveal>
      </div>
    </section>
  );
}
