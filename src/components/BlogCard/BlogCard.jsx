import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Avatar from "../common/Avatar";
import Reveal from "../common/Reveal";
import Photo from "../common/Photo";
import { getAgent } from "../../data/agents";
import { scenePhoto } from "../../data/images";
import { formatDate } from "../../utils/format";
import { cx } from "../../utils/classNames";

export default function BlogCard({ post: b, wide, index = 0 }) {
  const href = `/blog/${b.id}`;
  const author = getAgent(b.author);
  const photo = scenePhoto(b.scene, b.id);
  return (
    <Reveal as="article" className={cx("bcard", wide && "bcard--wide")} delay={(index % 3) * 0.08}>
      <Link className="media" to={href} tabIndex={-1} aria-hidden="true">
        <Photo src={photo.src} alt={photo.alt} sizes={wide ? "(max-width: 700px) 100vw, 600px" : "(max-width: 700px) 100vw, 400px"} />
        <span className="badge badge--accent">{b.cat}</span>
      </Link>
      <div className="body">
        <div className="meta"><span>{formatDate(b.date)}</span><span>·</span><span>{b.read} min read</span></div>
        <h3><Link to={href}>{b.title}</Link></h3>
        <p>{b.excerpt}</p>
        {wide && (
          <div className="flex" style={{ marginTop: 6 }}>
            <Avatar person={author} size="sm" />
            <span style={{ fontSize: 13 }}><b style={{ color: "var(--navy)", fontWeight: 500 }}>{author.name}</b><br /><span className="muted">{author.role}</span></span>
          </div>
        )}
        <Link className="link-arrow" to={href}>Read article <Icon name="arrow" /></Link>
      </div>
    </Reveal>
  );
}
