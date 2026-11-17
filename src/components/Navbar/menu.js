/* Navigation structure shared by the mega menu and the mobile drawer. */
export const MEGA_MENU = [
  {
    heading: "Buy",
    items: [
      ["Apartments", "/properties?mode=buy&type=apartment", "building"],
      ["Villas & Independent Homes", "/properties?mode=buy&type=villa", "home"],
      ["Plots & Land", "/properties?mode=buy&type=plot", "area"],
      ["New Launches", "/properties?mode=buy&new=1", "sparkle"],
      ["All properties for sale", "/properties?mode=buy", "search"]
    ]
  },
  {
    heading: "Rent & Commercial",
    items: [
      ["Homes for Rent", "/properties?mode=rent", "key"],
      ["Office Spaces", "/properties?mode=commercial&type=office", "building"],
      ["Shops & Showrooms", "/properties?mode=commercial&type=shop", "tag"],
      ["Rent Agreement", "/contact?service=Rent%20Agreement", "doc"],
      ["Pay Rent", "/contact?service=Pay%20Rent", "wallet"]
    ]
  },
  {
    heading: "Company",
    items: [
      ["About Us", "/about", "award"],
      ["Our Advisors", "/agents", "users"],
      ["Testimonials", "/testimonials", "star"],
      ["Blog & Guides", "/blog", "news"],
      ["Contact Us", "/contact", "phone"]
    ]
  },
  {
    heading: "Tools",
    items: [
      ["Home Loan & EMI Calculator", "/mortgage-calculator", "calc"],
      ["Compare Properties", "/compare", "compare"],
      ["Saved Properties", "/saved", "heart"],
      ["FAQs", "/faq", "help"]
    ]
  }
];

/** Paths that light up the "Explore" item. */
export const EXPLORE_PATHS = ["/properties", "/property", "/about", "/agents", "/agent", "/blog", "/faq", "/testimonials", "/compare", "/saved"];
