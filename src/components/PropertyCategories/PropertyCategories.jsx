import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import { MediaCard } from "../Services/Services";
import { PROPERTIES } from "../../data/properties";
import { scenePhoto } from "../../data/images";

const CATEGORIES = [
  ["Residential Apartments", "towers", "apartment"],
  ["Villas and Independent Homes", "villa", "villa"],
  ["Plots and Land", "plot", "plot"]
];

export default function PropertyCategories() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="Property" highlight="Categories" subtitle="Homes, offices and land, verified by our advisors" />
        <div className="grid grid-3">
          {CATEGORIES.map(([title, scene, type], i) => (
            <Reveal key={type} delay={i * 0.1} style={{ display: "flex" }}>
              <MediaCard label title={title} text={`${PROPERTIES.filter((p) => p.type === type).length} verified listings`} to={`/properties?mode=buy&type=${type}`} photo={scenePhoto(scene, i + 21)} style={{ flex: 1 }} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
