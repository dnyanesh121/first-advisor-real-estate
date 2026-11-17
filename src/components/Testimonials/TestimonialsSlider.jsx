import Reveal from "../common/Reveal";
import Slider from "../common/Slider";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "../../data/testimonials";

export default function TestimonialsSlider({ items = TESTIMONIALS, autoplay = 6000 }) {
  return (
    <Reveal>
      <Slider autoplay={autoplay} label="testimonial">
        {items.map((t) => <TestimonialCard key={t.name} item={t} />)}
      </Slider>
    </Reveal>
  );
}
