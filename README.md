# Jaisrie Marketing — Solar EPC Website

A premium, responsive business website built with plain **HTML5, CSS3 and
Vanilla JavaScript** — no frameworks, no build step. Open `index.html` in a
browser and it works; upload the folder as-is to any static host and it
works there too.

---

## 1. Folder Structure

```
jaisrie-marketing/
│
├── index.html            Home page
├── about.html             About page (mission, team, FAQ, certifications)
├── testimonials.html      Testimonials, slider, reviews
├── contact.html           Contact form, map, WhatsApp, emergency line
│
├── css/
│   ├── style.css          Design tokens, layout, components (core file)
│   ├── responsive.css     Breakpoints (1200 / 992 / 768 / 576px)
│   └── animations.css     Scroll reveals, keyframes, reduced-motion rules
│
├── js/
│   ├── main.js             Sticky header, mobile menu, smooth scroll,
│   │                       scroll-reveal, lazy-load, back-to-top
│   ├── slider.js           Testimonial slider (autoplay + controls)
│   ├── contact.js          Contact form validation
│   └── animation.js        Animated counters + FAQ accordion
│
├── images/                 Empty — see "Adding Your Own Images" below
│   ├── hero/  services/  projects/  testimonials/  team/  icons/
│
└── assets/fonts/            Empty — only needed if you self-host fonts
```

Every page loads the same three CSS files and pulls in only the JS it
actually uses, so pages stay light.

---

## 2. Before You Go Live — Replace These Placeholders

This is the important part. The site is fully built and functional, but it
ships with placeholder content that **must** be swapped for your real
details.

### a) Contact details
Search each HTML file for the following and replace everywhere they appear
(header, footer, contact page, WhatsApp buttons):

| Placeholder | Found in | Replace with |
|---|---|---|
| `+919999999999` | all pages (Call Now, WhatsApp links, footer) | Your real phone number, no spaces, with country code |
| `+919888888888` | contact.html | Second phone number |
| `+919777777777` | contact.html (Emergency Line) | Your emergency/support number |
| `info@jaisriemarketing.com` | all pages | Your real email |
| `Sivakasi, Virudhunagar District, Tamil Nadu, India` | footer, contact.html | Your exact office address |
| `https://www.jaisriemarketing.com/` | `<link rel="canonical">` tags | Your real domain once you have one |
| `#` social links | footer, contact.html | Your Facebook / Instagram / YouTube / LinkedIn URLs |

Tip: use your editor's "Find in Files" across the whole folder for
`+919999999999` and `info@jaisriemarketing.com` — that catches every page in
one pass.

### b) Google Map
The map currently points to a generic "Sivakasi, Tamil Nadu, India" search.
Replace the query in every `<iframe src="https://www.google.com/maps?q=...">`
with your exact address, e.g.:

```
https://www.google.com/maps?q=Your+Exact+Office+Address,Sivakasi&output=embed
```

No API key needed — this embed format works for free indefinitely.

### c) Images
All images currently load from **Pexels** (a free stock photo site) so the
site looks complete immediately. For a real launch, replace them with your
own project photos:

1. Save your photos into the matching folder (`images/hero`,
   `images/services`, `images/projects`, `images/testimonials`,
   `images/team`).
2. In the HTML, change the `src` (or `data-src`, for lazy-loaded images) from
   the `https://images.pexels.com/...` URL to a relative path, e.g.
   `images/hero/hero-solar-farm.jpg`.
3. Keep the `alt` text accurate — it matters for SEO and accessibility.
4. Team member and customer testimonial photos currently use
   `randomuser.me` placeholder avatars — replace with real staff/customer
   photos (with their permission) in `images/team` and
   `images/testimonials`.

Recommended image sizes for performance:
- Hero backgrounds: 1920×1080, compressed to under 300KB
- Service/project cards: 900×675
- Team/testimonial photos: 400×400 (square)

### d) Certification badges
`about.html` → **Certifications** section currently shows generic placeholder
badge icons (SVG shapes, not real logos). If you have ISO, MNRE, or other
official certifications, replace those SVGs with the actual certifying
body's logo image (check their brand usage guidelines first).

### e) Company copy
Read through `about.html` (company introduction, mission, vision, team
names/roles) and `testimonials.html` (customer names, quotes, locations) —
these are written as realistic examples but are **not real customers**.
Replace with your actual story, team, and genuine customer feedback before
launch (using invented testimonials on a live site is misleading to
visitors and can carry legal/advertising risk in some jurisdictions).

---

## 3. Making the Contact Form Actually Send Email

Right now `js/contact.js` validates the form (name, 10-digit mobile, email
format, city, service, message length) and shows a success message — but it
doesn't send the data anywhere. Look for this block near the bottom of the
file:

```js
/* TODO: replace with a real submission call, e.g.
   fetch("/api/contact", { method:"POST", body: new FormData(form) }) */
showStatus("Thank you! ...", true);
form.reset();
```

Pick one of these (no backend coding required for the first two):

- **Formspree** (free tier available): change the `<form>` tag's behaviour
  to POST to `https://formspree.io/f/YOUR_FORM_ID`, or call it via `fetch()`
  right where the TODO is.
- **Google Sheets via a script**: use a service like SheetMonkey or a small
  Google Apps Script Web App URL, and `fetch()` it the same way.
- **Your own backend**: replace the TODO with a `fetch()` call to your API
  endpoint.

The validation logic stays the same either way — you're just changing what
happens after the form is confirmed valid.

---

## 4. Running It Locally

No build tools, no `npm install`. Two options:

- **Simplest:** double-click `index.html` to open it in your browser.
- **Better (avoids some browser file:// quirks):** serve it with a tiny
  local server, e.g. from inside the folder run:
  ```
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

---

## 5. Deploying

### GitHub Pages (free)
1. Create a new GitHub repository and push this folder's contents to it
   (the `index.html` should sit at the repo root, not inside a subfolder).
2. Go to **Settings → Pages** → set source to the `main` branch, root
   folder.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.

### Any static host (Netlify, Vercel, Hostinger, cPanel, etc.)
Just upload the whole folder as-is — there's nothing to build or compile.

---

## 6. Customizing the Design

All colors, fonts, spacing, and radii are controlled from one place —
the `:root` block at the top of `css/style.css`:

```css
--c-green-600:#149152;   /* primary green accent */
--c-navy-900:#071B30;    /* dark navy secondary */
--c-amber-500:#F5A623;   /* sun/amber accent (CTAs, stats) */
--font-display:'Sora', ...;   /* headings */
--font-body:'Inter', ...;     /* body text */
```

Change a value there and it updates everywhere the variable is used —
buttons, headings, cards, footer, etc. You don't need to touch
`responsive.css` or `animations.css` unless you're changing breakpoints or
motion behaviour.

---

## 7. What's Already Built

- Sticky header with active-page highlighting, mobile hamburger menu
- Hero, "Why Choose Us", Services, Process timeline, Projects gallery,
  animated stat counters, CTA section, footer with embedded map — home page
- Company intro, mission/vision, values, timeline, team, certifications,
  FAQ accordion — about page
- Auto-playing testimonial slider, video testimonial cards, project photo
  gallery, Google-review-style cards — testimonials page
- Contact info cards, validated enquiry form, map, WhatsApp CTA, emergency
  contact strip, social links — contact page
- Floating WhatsApp button and back-to-top button on every page
- Scroll-reveal animations and lazy-loaded images throughout
- `prefers-reduced-motion` respected — animations disable for users who
  request it
- Semantic HTML5, descriptive `alt` text, visible focus states, and
  accessible ARIA labels throughout

## 8. Image Credit

Placeholder photography is sourced from **Pexels** (free to use, no
attribution required) and **randomuser.me** (placeholder headshot
generator). Swap these for your own licensed/owned photos before launch —
see Section 2c above.

---

Questions or stuck on a step? Re-open this project with Claude and ask
about the specific file or section you're working on.
