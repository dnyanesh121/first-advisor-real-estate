import { Link } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import SectionTitle from "../common/SectionTitle";
import TestimonialsSlider from "./TestimonialsSlider";

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle title="What Our" highlight="Clients Say" subtitle="Real stories from buyers, sellers and investors" note="Sample testimonials — replace with verified reviews" />
        <TestimonialsSlider />
        <div className="center mt-6">
          <Link className="link-arrow" to="/testimonials">Read all testimonials <Icon name="arrow" strokeWidth={2} /></Link>
        </div>
      </div>
    </section>
  );
}
