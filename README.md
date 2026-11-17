# First Advisors Real Estate — React

React conversion of the First Advisors Group real estate website. Same design, colors, typography, spacing, responsiveness and animations as the HTML version, rebuilt as reusable components with client-side routing.

**Stack:** React 18 · React Router DOM 6 · Framer Motion 11 · Vite 5 · plain CSS (organised global stylesheets)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Requires Node.js 18 or newer.

### Deploying
This is a single-page app using browser routing, so the host must serve `index.html` for every path.
- **Netlify:** `public/_redirects` is included.
- **Vercel:** `vercel.json` is included.
- **Apache / cPanel:** add an `.htaccess` rewrite to `index.html`.
- **Nginx:** `try_files $uri /index.html;`

---

## Part 1 — Folder structure

```
first-advisor-react/
├── index.html              Vite entry (fonts, meta)
├── package.json
├── vite.config.js
├── vercel.json             SPA rewrites for Vercel
├── public/
│   ├── favicon.svg
│   └── _redirects          SPA rewrites for Netlify
src/
├── assets/
│   ├── icons/
│   │   ├── Icon.jsx
│   │   ├── Logo.jsx
│   │   └── iconPaths.js
│   └── images/
│       └── hero.jpg
├── components/
│   ├── About/
│   │   ├── AboutStory.jsx
│   │   ├── GroupCompanies.jsx
│   │   ├── Timeline.jsx
│   │   └── Values.jsx
│   ├── AgentCard/
│   │   └── AgentCard.jsx
│   ├── BlogCard/
│   │   └── BlogCard.jsx
│   ├── CompareBar/
│   │   └── CompareBar.jsx
│   ├── Contact/
│   │   ├── ContactInfo.jsx
│   │   ├── ContactSection.jsx
│   │   └── EnquiryForm.jsx
│   ├── Faq/
│   │   └── FaqAccordion.jsx
│   ├── FeaturedProperties/
│   │   └── FeaturedProperties.jsx
│   ├── FinancialServices/
│   │   └── FinancialServices.jsx
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Newsletter.jsx
│   ├── Forms/
│   │   ├── Field.jsx
│   │   └── ValidatedForm.jsx
│   ├── Hero/
│   │   ├── CategoryTiles.jsx
│   │   ├── Hero.jsx
│   │   └── SearchBar.jsx
│   ├── Modals/
│   │   ├── ConsultModal.jsx
│   │   └── LoginModal.jsx
│   ├── Navbar/
│   │   ├── MegaMenu.jsx
│   │   ├── MobileDrawer.jsx
│   │   ├── Navbar.jsx
│   │   └── menu.js
│   ├── Plans/
│   │   └── Plans.jsx
│   ├── Process/
│   │   └── Process.jsx
│   ├── PropertyCard/
│   │   ├── PropertyCard.jsx
│   │   └── PropertyGrid.jsx
│   ├── PropertyCategories/
│   │   └── PropertyCategories.jsx
│   ├── PropertyFilters/
│   │   ├── ActiveFilters.jsx
│   │   └── PropertyFilters.jsx
│   ├── PropertyGallery/
│   │   ├── Lightbox.jsx
│   │   └── PropertyGallery.jsx
│   ├── ScheduleVisit/
│   │   ├── ContactAgentForm.jsx
│   │   └── ScheduleVisitForm.jsx
│   ├── Services/
│   │   └── Services.jsx
│   ├── Testimonials/
│   │   ├── TestimonialCard.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── TestimonialsSlider.jsx
│   ├── WhyUs/
│   │   └── WhyUs.jsx
│   └── common/
│       ├── Avatar.jsx
│       ├── BackToTop.jsx
│       ├── Breadcrumbs.jsx
│       ├── CtaBand.jsx
│       ├── Disclaimer.jsx
│       ├── EmptyState.jsx
│       ├── Modal.jsx
│       ├── PageHero.jsx
│       ├── Pagination.jsx
│       ├── Photo.jsx
│       ├── Reveal.jsx
│       ├── ScrollToTop.jsx
│       ├── SectionTitle.jsx
│       ├── Slider.jsx
│       ├── Stars.jsx
│       ├── Stats.jsx
│       ├── SvgArt.jsx
│       ├── Tabs.jsx
│       └── Toast.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   ├── agents.js
│   ├── blogs.js
│   ├── content.js
│   ├── faqs.js
│   ├── images.js
│   ├── properties.js
│   ├── site.js
│   └── testimonials.js
├── hooks/
│   ├── useCountUp.js
│   ├── useDocumentTitle.js
│   ├── useKeydown.js
│   ├── useLocalStorage.js
│   ├── useLockBodyScroll.js
│   └── useScrolled.js
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── About/
│   │   └── About.jsx
│   ├── AgentDetails/
│   │   └── AgentDetails.jsx
│   ├── Agents/
│   │   └── Agents.jsx
│   ├── Blog/
│   │   ├── Blog.jsx
│   │   └── NewsletterPanel.jsx
│   ├── BlogDetails/
│   │   └── BlogDetails.jsx
│   ├── Compare/
│   │   └── Compare.jsx
│   ├── Contact/
│   │   └── Contact.jsx
│   ├── Faq/
│   │   └── Faq.jsx
│   ├── Home/
│   │   └── Home.jsx
│   ├── MortgageCalculator/
│   │   ├── AmortizationChart.jsx
│   │   ├── MortgageCalculator.jsx
│   │   └── SliderField.jsx
│   ├── NotFound/
│   │   └── NotFound.jsx
│   ├── Properties/
│   │   └── Properties.jsx
│   ├── PropertyDetails/
│   │   └── PropertyDetails.jsx
│   ├── Saved/
│   │   └── Saved.jsx
│   └── Testimonials/
│       └── Testimonials.jsx
├── routes/
│   ├── AppRoutes.jsx
│   └── paths.js
├── styles/
│   ├── animations.css
│   ├── base.css
│   ├── components.css
│   ├── index.css
│   ├── pages.css
│   ├── react.css
│   └── tokens.css
├── utils/
│   ├── art.js
│   ├── classNames.js
│   ├── format.js
│   ├── propertyFilters.js
│   └── validation.js
├── App.jsx
└── main.jsx
```

## Part 2 — Entry points
- `src/main.jsx` mounts the app and imports `styles/index.css`.
- `src/App.jsx` wraps everything in `BrowserRouter`, `MotionConfig reducedMotion="user"` and `AppProvider`.

## Part 3 — Routing
`src/routes/AppRoutes.jsx` — every page renders inside `layouts/MainLayout.jsx` (header, footer, compare tray, toast, modals, page fade transition). Home loads eagerly; other pages are lazy-loaded (code-split).

| URL | Page |
|---|---|
| `/` | Home |
| `/properties` | Listing (filters live in the URL, e.g. `?mode=rent&city=Mumbai&bhk=2`) |
| `/property/:id` | Property details |
| `/about` | About us |
| `/contact` | Contact (`?service=Rent%20Agreement` pre-fills the form) |
| `/agents`, `/agents/:id` | Advisors, advisor profile |
| `/blog`, `/blog/:id` | Blog, article |
| `/faq` | FAQs |
| `/saved` | Saved properties |
| `/compare` | Compare (`?ids=1,2,3` shareable) |
| `/mortgage-calculator` | EMI, affordability, stamp duty |
| `/testimonials` | Testimonials |
| `*` | 404 |

## Part 4 — Components
- **Layout:** `Navbar` (+ `MegaMenu`, `MobileDrawer`, shared `menu.js`), `Footer` (+ `Newsletter`), `CompareBar`, `Modals` (login, consultation).
- **Home sections:** `Hero` (+ `CategoryTiles`, `SearchBar`), `Services`, `Process`, `WhyUs`, `PropertyCategories`, `FeaturedProperties`, `Plans`, `FinancialServices`, `Testimonials`, `Contact`.
- **Cards:** `PropertyCard` (+ `PropertyGrid`, `SaveButton`, `CompareButton`), `AgentCard`, `BlogCard`, `TestimonialCard`.
- **Property tools:** `PropertyFilters` (+ `ActiveFilters`), `PropertyGallery` (+ `Lightbox`), `ScheduleVisit` (visit + contact-agent forms).
- **Forms:** `ValidatedForm` (validation, sending state, success message) and `Field` / `Check`.
- **Common:** `Reveal` (Framer Motion scroll reveal), `PageHero`, `SectionTitle`, `Slider`, `Tabs`, `Modal`, `Toast`, `Pagination`, `EmptyState`, `Stats`, `CtaBand`, `Disclaimer`, `Breadcrumbs`, `Avatar`, `Stars`, `SvgArt`, `BackToTop`, `ScrollToTop`.

State lives in `context/AppContext.jsx` (saved list, compare list, toast, open modal), persisted with `hooks/useLocalStorage.js`.

## Part 5 — Styles
`src/styles/` keeps the original stylesheets unchanged so the design is identical:
`tokens.css` (colors, type, spacing, shadows) → `base.css` → `components.css` → `pages.css` → `animations.css` → `react.css` (hero photography and small React-specific additions). Change brand values in `tokens.css`.

## Part 6 — Integration notes
- **Photography:** all property, hero and editorial photos are royalty-free Unsplash images (Unsplash License: free for commercial use, no attribution required), listed in `src/data/images.js` and served from the Unsplash CDN as resized WebP/AVIF with responsive `srcset`. Render them with `<Photo src={id} alt="..." />`. Swap `HERO`, `ADVISORY` or `STORY` there to change the hero, "Why First Advisors" and "Our story" photos.
- **Listing pictures:** each listing in `src/data/properties.js` has an `image` (an Unsplash id, or an imported local photo) and gets SEO alt text automatically. The details gallery is built from that cover plus category-matched interiors (`galleryPhotos()` in `images.js`). Floor plans and location maps stay as generated diagrams (`utils/art.js`).
- **Data:** everything editable is in `src/data/` (`site.js` for phone, email, address, RERA, stats). Listings, advisors, blog posts and testimonials are sample content. Replace testimonials with verified reviews before launch.
- **Forms:** validated in the browser; nothing is sent. Replace the `setTimeout` in `components/Forms/ValidatedForm.jsx` with a `fetch()` to your API.
- **Motion:** `Reveal` reproduces the original fade/slide-in; route changes fade. Everything respects the visitor's reduced-motion setting.
