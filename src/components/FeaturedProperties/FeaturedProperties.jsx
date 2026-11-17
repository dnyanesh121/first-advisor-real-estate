import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import PropertyGrid from "../PropertyCard/PropertyGrid";
import { PROPERTIES } from "../../data/properties";

export default function FeaturedProperties({ limit = 6 }) {
  const items = PROPERTIES.filter((p) => p.featured).slice(0, limit);
  return (
    <section className="section section--white">
      <div className="container">
        <SectionTitle title="Featured" highlight="Properties" subtitle="Hand-picked, advisor-verified listings" note="Sample listings for this demo" />
        <PropertyGrid properties={items} />
        <Reveal className="center mt-10">
          <Link className="btn btn--outline btn--lg" to="/properties">View All Properties <Icon name="arrow" strokeWidth={2} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
