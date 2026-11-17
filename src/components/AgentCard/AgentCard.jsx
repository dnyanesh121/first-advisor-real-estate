import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Avatar from "../common/Avatar";
import Reveal from "../common/Reveal";
import Stars from "../common/Stars";
import { PROPERTIES } from "../../data/properties";

export default function AgentCard({ agent: a, index = 0 }) {
  const href = `/agents/${a.id}`;
  const listings = PROPERTIES.filter((p) => p.agent === a.id).length;
  return (
    <Reveal as="article" className="acard" delay={(index % 4) * 0.08}>
      <div className="top">
        <Avatar person={a} size="lg" />
        <h3><Link to={href}>{a.name}</Link></h3>
        <div className="role">{a.role} · {a.city}</div>
        <div style={{ marginTop: 6 }}>
          <Stars value={a.rating} /> <span className="muted num" style={{ fontSize: 12 }}>{a.rating} ({a.reviews})</span>
        </div>
      </div>
      <div className="meta num">
        <div><b>{a.exp}+</b>Years</div>
        <div><b>{a.deals}+</b>Deals</div>
        <div><b>{listings}</b>Listings</div>
      </div>
      <div className="tags">{a.spec.map((s) => <span key={s} className="badge badge--soft">{s}</span>)}</div>
      <div className="acts">
        <Link className="btn btn--outline btn--sm" to={href}>View Profile</Link>
        <Link className="btn btn--primary btn--sm" to={`${href}#contact`}><Icon name="phone" />Contact</Link>
      </div>
    </Reveal>
  );
}
