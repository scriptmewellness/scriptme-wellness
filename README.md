# Script Me Wellness

Static website for Script Me Wellness, LLC. Hand-coded HTML/CSS/JS, no build step, deploys directly to Cloudflare Pages from GitHub.

Built by Michelle Cook, 2026.

---

## Stack

- Vanilla HTML, CSS, and JavaScript — no build step, no framework
- Google Fonts: Cormorant Garamond (display) + DM Sans (body)
- Hosted on Cloudflare Pages
- Source on GitHub

## Color Palette

A calm, clinical, warm palette designed for credibility in the medical/wellness space. All colors are defined as CSS custom properties at the top of `css/style.css` and can be tuned in one place.

- `#FAF7F2` — warm cream — page background
- `#F2EDE4` — soft sand — section fills
- `#7B9080` — sage — accent, buttons, highlights
- `#5C7166` — deep sage — hover/pressed states
- `#2A2D2E` — slate — primary text

## Project Structure

```
scriptme-wellness/
├── index.html             Home page
├── about.html             About + team + how-it-works
├── services.html          Tabbed services (8 conditions)
├── contact.html           Booking + Charm embed + contact form
├── pillars/
│   ├── nutrition.html         Pillar 1
│   ├── physical-fitness.html  Pillar 2
│   ├── physical-health.html   Pillar 3
│   ├── mental-wellbeing.html  Pillar 4
│   └── you.html               Pillar 5
├── css/
│   └── style.css          All site styles
├── js/
│   └── main.js            Nav, tabs, accordions, form, reveal animations
├── images/                (Add real images here — see below)
└── README.md
```

## Pillar Pages

The home page features five "Wellness Pillar" cards. Each links to a dedicated page with:

1. Hero with Emily's existing intro paragraph (verbatim from her current site)
2. Three medium-depth subsections that expand the topic
3. An editorial article — 4 expandable accordion sections of longer-form, SEO-rich content
4. Related Services callout that links to relevant tabs on the Services page
5. CTA scrolling to the Charm booking embed on the Contact page

Pillar pages link to the Services page using URL hashes (e.g. `services.html#hormone`). The JavaScript on the services page reads the hash on load and activates the matching tab automatically — so visitors clicking from a pillar page land directly on the relevant service tab.

## Deployment

### First-time setup

1. Push this folder to GitHub (the repository Michelle already created).
2. In Cloudflare Pages → **Create a project** → **Connect to GitHub**.
3. Select the repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` *(root)*
5. Deploy. The site goes live within seconds.

### Custom domain

In Cloudflare Pages → **Custom domains** → add `scriptmewellness.com` and `www.scriptmewellness.com`. Cloudflare will handle SSL automatically.

## Things to Replace Before Launch

Search the codebase for `[` — almost every remaining placeholder is in image divs marked like `[Hero photo<br/>...]`. Highlights:

- **Hero, split, team, and tab images** — currently text placeholders inside accent-colored boxes. Add real photos to `/images/` and replace the placeholder divs with `<img>` tags.
- **Hours** — placeholder hours block on `contact.html` ("Monday–Thursday, 9am–5pm; Friday, by appointment" was a guess).
- **Provider bios** — written using the public information on her current site. Have Emily review and tweak as needed.
- **Pillar page article content** — written from a functional medicine perspective using publicly available information. Recommend Emily review for tone and accuracy. The hero intro paragraphs on each pillar page are pulled verbatim from her current site.

## Booking & Patient Portal

This site uses **Charm** for Emily's appointments and the patient portal, and **Calendly** for the health coaches.

- **Emily's bookings** — embedded directly on `contact.html` via the Charm iframe (`#book-emily` section). All "Book a discovery call" / "Schedule your call" CTAs throughout the site link to this anchor.
- **Olivia's bookings** — Calendly: `https://calendly.com/odelaurentiis`
- **Janice's bookings** — Calendly: `https://calendly.com/wellnessbytc/30min`
- **Patient Portal (existing patients)** — Charm signin URL, used in the Existing Patients banner on `contact.html`, the Practice Information block, and the site footer on every page.

## Image Guidance

For every photo placeholder:

- **Format:** WebP (with JPEG fallback if needed)
- **Hero image:** approx. 1600 × 2000 pixels (4:5 aspect ratio)
- **Split section images:** approx. 1200 × 1440 pixels (5:6 aspect ratio)
- **Team portraits:** approx. 1000 × 1250 pixels (4:5 aspect ratio)
- **Tab panel images:** approx. 1000 × 1250 pixels (4:5 aspect ratio)
- All images should feel calm, natural-light, warm. Avoid stocky-stock-photo energy.

## Contact Form

The contact form on `contact.html` currently uses a `mailto:` fallback that opens the user's email client. To enable proper form submission:

1. Sign up for [Formspree](https://formspree.io) (free tier).
2. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the `<form>` tag.
3. The JavaScript already detects an `action` attribute and lets the form submit normally.

Alternative: **Cloudflare Workers** + a simple email worker can handle this without a third-party service. Happy to set that up if preferred.

## Performance Notes

- Fonts preconnect and `font-display: swap`
- All CSS in one file, all JS in one file — no waterfall
- No external scripts, no analytics yet (add Plausible or Google Analytics if Emily wants them)
- Images need WebP format and `loading="lazy"` on anything below the fold once added

## Browser Support

Modern browsers (last 2 versions). The site degrades gracefully on older browsers — animations and reveals just appear instantly.
