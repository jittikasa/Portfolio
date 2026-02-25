# Portfolio — Agent Handoff

## Project
Jittika Sakulchit's personal portfolio. React + Vite + Framer Motion.
Branch: `redesign`. Deploy target: Cloudflare Pages.

## Stack
- React 18, Vite
- Framer Motion (animations)
- React Router DOM (single route: `/`)
- CSS custom properties (no Tailwind)
- Google Fonts: Cormorant Garamond, Fraunces, DM Sans, IBM Plex Mono, La Belle Aurore, Caveat

## Active file tree
```
src/
  App.jsx / App.css          — root, single route /
  index.css                  — global CSS vars, palette, typography
  main.jsx
  data/projects.js           — 8 projects (Shellist, PolaMoment, + 6 placeholders)
  components/
    Header.jsx / .css        — sticky header, SignatureName logo, "Work" nav link
    Footer.jsx / .css        — postcard-style footer (floating cream card)
    SignatureName.jsx / .css — animated SVG signature "jittika s." (3 filled paths + clipPath sweep)
    HeroScene.jsx / .css     — fixed beach.jpg bg, zoom 2x→1x over 300vh, fade 370–450vh
    GrainOverlay.jsx / .css  — subtle film grain texture overlay
    CustomCursor.jsx / .css  — custom cursor
    ScrollProgress.jsx / .css— scroll progress indicator
    ProjectModal.jsx / .css  — full-screen project detail modal
  pages/
    Home.jsx / .css          — single page layout (hero → services → work grid)
```

## Design system (index.css)
```
--canvas:      #F7F3EC   warm off-white (page bg)
--cream:       #F2EDE3
--parchment:   #E8E0CF
--sage:        #6B7C5A   primary accent
--sage-deep:   #3E5234
--sage-mist:   #A8B89A
--sage-pale:   #E4EBDF
--water:       #8BAABF
--ink:         #2A1F14   dark brown-black (body text)
--ink-muted:   #7A6E62
--bloom:       #B89870   golden ochre
--font-display: Cormorant Garamond
--font-body:    DM Sans
--font-mono:    IBM Plex Mono
```

## Home page sections
1. **Hero** — 450vh scroll tunnel. beach.jpg zooms 2x→1x. Tagline + bio + CTA button.
2. **Services** — "My Atelier". 3 items: Product Design ◈ / Brand Identity ✧ / Web Development ◌. Hover = sage blur wash.
3. **Work grid** — "Selected Works". 3-col monet grid, click → ProjectModal.
4. **Footer** — postcard. Floating white card on canvas bg. Scalloped sage stamp (JS) top-left. Ruled lines left side (La Belle Aurore message). TO: links right side.

## SignatureName component
- 3 SVG paths: JITTIKA (179×89), LINE/crossbar (121×8), S_DOT (35×29)
- All `fill="currentColor"`, color set to `#2F2F2F` in SignatureName.css
- Animation: clipPath rect sweeps left→right per element, sequenced
- Variants: `logo` (header), `footer`, `hero`
- S_DOT positioned at x=187 y=28 within combined 224×89 viewBox

## Known TODOs / next steps
- Services section — iterate on "My Atelier" layout (option B accordion was tried, reverted — needs rethink)
- Projects data — 6 placeholder projects have no real images/links, only Shellist + PolaMoment are real
- Footer — social links (Instagram, LinkedIn, Dribbble) are all `#` placeholders
- Footer — email is `hello@jittika.com` (confirm this is correct)
- Hero — "See My Work" button style could be refined
- Mobile responsiveness — not fully reviewed since redesign

## Public assets
```
public/
  beach.jpg          — hero background
  about.png          — portrait photo (available, not currently used)
  shellist-icon.png
  shellist-screens.webp
  shellist-screens-2.webp
  pola-icon.png
  pola-image-1.jpeg
  pola-image-2.jpeg
  typewriter.png / typewriter-grid.png / typewriter-wide.png
  favicon.svg
  _redirects         — Cloudflare Pages SPA routing
```
