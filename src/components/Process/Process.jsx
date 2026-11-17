import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";
import { MediaCard } from "../Services/Services";
import { PROCESS } from "../../data/content";
import { scenePhoto } from "../../data/images";

export default function Process() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionTitle title="Our" highlight="Process" subtitle="A Structured Approach to Every Transaction" />
        <div className="grid grid-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} style={{ display: "flex" }}>
              <MediaCard title={s.title} text={s.text} photo={scenePhoto(s.scene, i + 7)} badge={`Step ${i + 1}`} style={{ flex: 1 }} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
