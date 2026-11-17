/* Central list of URLs used across the app. */
export const PATHS = {
  home: "/",
  properties: "/properties",
  property: (id) => `/property/${id}`,
  about: "/about",
  contact: "/contact",
  agents: "/agents",
  agent: (id) => `/agents/${id}`,
  blog: "/blog",
  post: (id) => `/blog/${id}`,
  faq: "/faq",
  saved: "/saved",
  compare: "/compare",
  mortgage: "/mortgage-calculator",
  testimonials: "/testimonials"
};
