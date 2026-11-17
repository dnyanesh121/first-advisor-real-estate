import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

/* Home loads eagerly (first paint); every other page is code-split. */
const Properties = lazy(() => import("../pages/Properties/Properties"));
const PropertyDetails = lazy(() => import("../pages/PropertyDetails/PropertyDetails"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Agents = lazy(() => import("../pages/Agents/Agents"));
const AgentDetails = lazy(() => import("../pages/AgentDetails/AgentDetails"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const BlogDetails = lazy(() => import("../pages/BlogDetails/BlogDetails"));
const Faq = lazy(() => import("../pages/Faq/Faq"));
const Saved = lazy(() => import("../pages/Saved/Saved"));
const Compare = lazy(() => import("../pages/Compare/Compare"));
const MortgageCalculator = lazy(() => import("../pages/MortgageCalculator/MortgageCalculator"));
const Testimonials = lazy(() => import("../pages/Testimonials/Testimonials"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="agents" element={<Agents />} />
        <Route path="agents/:id" element={<AgentDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="faq" element={<Faq />} />
        <Route path="saved" element={<Saved />} />
        <Route path="compare" element={<Compare />} />
        <Route path="mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
