# Gemini Prompt — Monet-Style Portfolio UX/UI Redesign

> Paste this into Gemini (optionally attach `Home.jsx`, `index.css`, `Home.css` as files).
> Work section-by-section for best results — paste the "Section-by-Section" block one section at a time.

---

You are a senior UI/UX engineer and motion designer. Your task is to redesign
and implement a portfolio website for Jittika S., a product designer and maker
based in Phuket, Thailand, using React + Vite + Framer Motion. The entire
aesthetic must be deeply inspired by Claude Monet's Impressionist paintings —
not as a literal "painting filter", but as a living design language that permeates
every color choice, texture, animation, and interaction.

---

## I. THE MONET DESIGN LANGUAGE

Monet's world is defined by five sensory pillars. Every design decision must
trace back to at least one of these:

1. **LIGHT** — Impressionism is the study of light. Colors are never flat; they
   shimmer, bleed, and glow. Nothing has a hard edge. Backgrounds feel
   sun-touched, not screen-lit.

2. **WATER** — The Giverny pond is ever-present. Reflections, ripples, and the
   subtle distortion of things seen through water. Use this for hover states,
   page transitions, and shimmer effects.

3. **BLOOM** — Wisteria, water lilies, poppies, irises. Organic shapes that drift.
   Petals that fall. Color that bleeds at its edges like wet paint into wet canvas.

4. **TEXTURE** — Raw linen canvas. Visible brushstrokes. Impasto imperfection.
   Film grain. Nothing is pixel-perfect; everything has a hand-made soul.

5. **TIME OF DAY** — Monet painted the same subjects at dawn, noon, dusk, and
   twilight to capture how light changes them. The site should feel like
   morning light on the water — soft, golden, contemplative.

---

### Color Palette — Monet's Garden

Use these exact CSS custom properties. They are already in `index.css`.

```css
--canvas:        #F7F3EC   /* warm primed linen — page background */
--cream:         #F2EDE3   /* aged cream — card backgrounds */
--parchment:     #E8E0CF   /* aged parchment — section fills */

--sage:          #6B7C5A   /* garden sage — primary accent */
--sage-deep:     #3E5234   /* deep foliage */
--sage-hover:    #5A6A4A   /* hover state */
--sage-mist:     #A8B89A   /* light garden mist */
--sage-pale:     #E4EBDF   /* near-white green tint */

--water:         #8BAABF   /* Giverny pond — blue-grey */
--water-deep:    #5B7A96   /* deep water */
--water-mist:    #C5D8E8   /* sky reflection */

--petal:         #C9A8A8   /* dusty rose — pink accent */
--bloom:         #B89870   /* golden ochre — warm highlight */
--bloom-pale:    #EDE4D5   /* pale bloom */

--ink:           #2A1F14   /* dark walnut — headings and body */
--ink-muted:     #7A6E62   /* faded ink — secondary text */
--border:        rgba(42,31,20,0.10)
--border-strong: rgba(42,31,20,0.22)
```

**NEVER** use pure white (`#FFF`), pure black (`#000`), or any saturated modern
color (no `#FF0000`, no electric blue). Keep everything within Monet's palette.

---

### Typography

```
--font-display: 'Cormorant Garamond', Georgia, serif   (all headings)
--font-body:    'DM Sans', system-ui, sans-serif        (all body copy)
--font-mono:    'IBM Plex Mono', monospace              (labels, eyebrows)
```

Rules:
- All display headings: weight 300–400, letter-spacing `-0.02em`, line-height `1.1`
- Italic emphasis (`<em>`) in headings uses genuine italic cuts, not oblique
- Labels / eyebrows: IBM Plex Mono, `0.68rem`, uppercase, letter-spacing `0.12em`
- Body: DM Sans 16–18px, line-height `1.7`, max-width `60ch`
- Never bold a serif heading above weight 500

---

### Global Texture Layer

There is already a `<GrainOverlay />` component. Enhance it:

- SVG `feTurbulence` grain overlay: opacity `0.038`, blendMode `"overlay"`
- A second subtle CSS radial gradient vignette on `<body>`: very faint warm
  darkening at the corners, mimicking the darkened edges of a canvas
- Optional: an animated "canvas weave" — an extremely subtle repeating
  CSS `background-image` pattern using tiny diagonal lines at 3% opacity,
  simulating linen texture

---

## II. SECTION-BY-SECTION DESIGN SPECIFICATION

The site uses React Router with two routes:
- `/`           → `Home.jsx`  (one-page scroll with all sections)
- `/collection` → `CollectionPage.jsx`

Current structure of `Home.jsx`:

```
<Header />              ← fixed, transparent-to-solid on scroll
<section.hero>          ← split: text left / image right
<section.s-intro>       ← photo left / copy right
<section.s-services>    ← photo | accordion | photo (3-col)
<section.s-quote>       ← full-width centered blockquote
<section.s-about>       ← floating card: photo + bio panel
<section.s-work>        ← 4-col project tile grid
<footer.footer>         ← 3-col
<ProjectModal />        ← overlay modal (project detail)
```

---

### HEADER

Structure:
- Announcement bar (top): `"DESIGNER & MAKER · AVAILABLE FOR PROJECTS"`
  — IBM Plex Mono, 10px, letter-spacing 0.15em
  — Background: `--sage-pale`, text: `--sage-deep`
- Nav bar: transparent over hero, transitions to `--cream` + `border-bottom`
  on scroll (threshold: 60px)
- Left: `"J"` logo in Cormorant Garamond, 1.6rem
- Right: links — Home / Work / About / Contact

Monet touch:
- Nav background transition: NOT a hard color snap. Use `backdrop-filter: blur(12px)`
  combined with `background: rgba(242,237,227,0.88)` — like light diffusing
  through frosted glass
- The `"J"` logo should have a very subtle watercolor-bleed CSS shadow:
  `text-shadow: 0 0 24px rgba(107,124,90,0.18)`

---

### HERO SECTION

Layout: two-column split (60% text / 40% image). Background: `--canvas`

**Left column:**
- Eyebrow: `"Jittika S. · Phuket, Thailand"` — IBM Plex Mono
- H1: `"Where design &\ncraft meet."` — Cormorant Garamond, ~4.5rem
- CTA link: `"See My Work"` with an animated underline
- Scroll hint: `"Scroll to explore"` + vertical line

**Right column:**
- `typewriter.png` on a `--parchment` panel

**Monet enhancements:**

1. **WATERCOLOR WASH BACKGROUND:**
   Behind the entire hero, add a full-bleed CSS "watercolor wash" element
   using multiple layered radial gradients:
   - A soft bloom of `--water-mist` (blue) centered at `80% 20%`
   - A bloom of `--sage-pale` (green) at `20% 80%`
   - A bloom of `--bloom-pale` (ochre) at `60% 90%`

   All at 30–40% opacity, with `blur(80px)`. Animate these blobs with a slow
   CSS keyframe animation (duration: 18s, infinite, ease-in-out alternating
   between 2 positions) — sunlight moving across a canvas.

2. **PETAL DRIFT:**
   Render 8–12 absolutely positioned SVG petals (simple organic teardrop
   shapes) in `--petal`, `--sage-mist`, or `--bloom` at 15–25% opacity.
   Animate with Framer Motion:
   - Random y drift: `-30px` to `+30px`, duration 6–12s, `repeatType: "mirror"`
   - Random x drift: `±15px`, offset phase so they don't sync
   - Random rotation: `±8deg`

3. **IMAGE TREATMENT:**
   - `filter: sepia(0.08) brightness(1.04) contrast(0.95) saturate(0.9)`
   - A subtle vignette `::after` overlay:
     `radial-gradient(ellipse at center, transparent 55%, rgba(232,224,207,0.5))`
   - Image panel background: `--parchment`
   - `border-radius: 2px`

4. **H1 ENTRANCE ANIMATION:**
   Each word enters as a separate Framer Motion `<span>`:
   ```js
   initial: { opacity: 0, y: 30, filter: "blur(4px)" }
   animate: { opacity: 1, y: 0,  filter: "blur(0px)" }
   // staggered 0.12s per word, ease: [0.22, 1, 0.36, 1]
   ```

---

### INTRO SECTION (s-intro) — "Design that feels as intentional as it looks"

Layout: reversed split — image left (45%) / copy right (55%). Background: `--parchment`

**Monet enhancements:**

1. Image gets the same sepia/contrast treatment as hero. Add a soft
   `border-left: 4px solid --sage` at 40% opacity.

2. The section background transitions from `--canvas` at top to `--parchment`
   via a CSS `mask-image` or gradient on the section's `::before` pseudo-element:
   `linear-gradient(to bottom, --canvas, --parchment)`, height: 120px overlap.
   This creates a soft section "bleed" like watercolor at the edge of a wash.

3. The copy column's H2 heading: the word `"intentional"` renders in `--sage`
   with a hand-drawn-style SVG wave as the CSS `text-decoration` underline image.

---

### SERVICES SECTION (s-services) — 3-column: photo | accordion | photo

Background: `--cream`

Current structure:
- Left: `typewriter-wide.png`
- Centre: H2 + services accordion (01/02/03)
- Right: `typewriter-grid.png`

**Monet enhancements:**

1. **PHOTO PANELS:**
   Both flanking panels get gradient overlays to blend into the centre:
   - Left: `linear-gradient(to right, transparent 70%, --cream)`
   - Right: `linear-gradient(to left, transparent 70%, --cream)`

2. **ACCORDION:**
   - Trigger border: `1px solid --border-strong`
   - On hover: background bleeds in from left using
     `background-size: 0% 100% → 100% 100%` on a `linear-gradient(to right, --sage-pale, transparent)`. Duration 0.3s.
   - Accordion number (01, 02, 03): IBM Plex Mono, `--bloom` color
   - Open state: body text fades in with `blur(4px) → blur(0)` transition
   - Open trigger: `border-left: 2px solid --sage`, animated over 0.2s
   - Number shifts from `--ink-muted` to `--bloom` on open

3. **"Start a Project" CTA:**
   Animated SVG path underline that draws itself on hover via `stroke-dashoffset`.

---

### QUOTE SECTION (s-quote)

Background: `--parchment` (with linen texture overlay)

**Monet enhancements:**

1. Blockquote: Cormorant Garamond, italic, 2–2.4rem, `--ink`. Max-width 800px, centered.

2. Two decorative SVG "lily pad" shapes — flat oval outlines in `--sage` at 12%
   opacity — positioned top-left and bottom-right. They rotate very slowly
   (1 full rotation / 40s, infinite).

3. Entrance animation:
   ```js
   hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" }
   show:   { opacity: 1, scale: 1,    filter: "blur(0px)" }
   transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
   ```

---

### ABOUT SECTION (s-about) — floating card

Background: `--canvas`. Card: max-width 1100px, centered. Photo left / bio panel right.

**Monet enhancements:**

1. **Card:**
   - Background: `--cream`
   - `box-shadow: 0 8px 48px rgba(42,31,20,0.07), 0 2px 8px rgba(42,31,20,0.04)`
   - `border: 1px solid --border`
   - `border-radius: 4px`
   - `::before` pseudo-element with `radial-gradient` of `--water-mist` at 8% opacity

2. **Photo panel:**
   - Same sepia/contrast image treatment
   - Organic-edge CSS `clip-path` on the right edge so the photo bleeds
     softly into the bio panel (slight curve, not a hard cut)

3. **Text:**
   - `"MEET JITTIKA:"` in IBM Plex Mono, `--sage-deep`
   - H2 in Cormorant Garamond — word `"expert"` italicized in `--sage`

4. **"Get in Touch" button:**
   - Background: `--sage-deep`, color: `--canvas`
   - Padding: `14px 32px`, border-radius: `2px`
   - Hover: background shifts to `--sage`, a small SVG iris slides in from
     the right with a 0.2s delay

---

### WORK GRID (s-work) — project tiles

4-column grid. Each tile: color swatch, type label, year, title, subtitle, "View →" link.

**Monet enhancements:**

1. **WATERCOLOR SWATCH:**
   Replace the flat `--c` swatch with multiple layered radial gradients mixing
   `--c` and `--a` (accent) at ~70% opacity, with `filter: blur(0.5px) saturate(0.9)`.

2. **Tile styles:**
   - Background: `--cream`, `border: 1px solid --border`, `border-radius: 3px`
   - Hover: `transform: translateY(-4px)`,
     `box-shadow: 0 16px 48px rgba(42,31,20,0.10)`,
     swatch scales to `1.03` with `overflow: hidden`

3. **Grid entrance:**
   Staggered Framer Motion entrance per row (0.1s delay between rows, not per-tile).

4. **"View →" arrow:**
   Slides right 4px on tile hover, returns on mouse leave. Duration 0.2s.

---

### PROJECT MODAL (ProjectModal.jsx)

**Monet enhancements:**

1. Backdrop: `backdrop-filter: blur(16px)`, `background: rgba(242,237,227,0.72)`

2. Modal panel:
   - Background: `--cream`, max-width 900px
   - `::before` watercolor wash using the project's `--c` color at 15% opacity (top-right)
   - `border-left: 3px solid var(--c)` at 60% opacity

3. Entrance:
   ```js
   initial: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }
   animate: { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" }
   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
   ```

4. Exit: reverse of entrance, duration 0.35s

---

### FOOTER

Background: `--sage-deep`. Text: `--canvas` and `--sage-mist`

**Monet enhancements:**

1. Top edge: CSS `mask-image` with an irregular gradient creating a soft organic
   top border between `--canvas` and `--sage-deep` — like a wet wash meeting paper.

2. `"J"` logo: Cormorant Garamond, 3rem, `--canvas`,
   `text-shadow: 0 0 32px rgba(168,184,154,0.3)`

3. Links: hover color transitions to `--sage-mist` over 0.2s

---

## III. GLOBAL ANIMATION SYSTEM

Define these shared Framer Motion variants and reuse them throughout:

```js
// Standard scroll-triggered fade
const fade = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

// Impressionist "materialise from mist" — hero text, quote
const mist = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
  show:   { opacity: 1, scale: 1,    filter: "blur(0px)",
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
}

// Image entrance — all section photos
const imgReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show:   { opacity: 1, scale: 1,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
}

// Stagger container — grids and lists
const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } }
}
```

All `whileInView` animations use: `viewport={{ once: true, margin: "-80px" }}`

---

### Custom Cursor

On desktop only (`pointer: fine`):
- Default: 14px circle in `--sage` at 40% opacity
- On hoverable elements (`a`, `button`, `.project-tile`): expands to 36px,
  opacity 0.25, spring transition `{ stiffness: 200, damping: 20 }`
- The cursor lags slightly behind the mouse using a spring with low stiffness (100)
  — mimicking the soft, delayed movement of a paintbrush tip
- Disabled on touch devices: `@media (pointer: coarse)`

---

### Page Transitions (React Router)

Use `AnimatePresence` in `App.jsx`. Each page:
```js
entry: { opacity: 0, filter: "blur(8px)" } → { opacity: 1, filter: "blur(0px)" }
       // duration 0.6s, ease-out
exit:  { opacity: 0, filter: "blur(8px)" }
       // duration 0.35s
```

---

### Scroll Progress Bar

A 2px bar at the very top of the viewport (above the header):
- `background: linear-gradient(to right, --sage, --water, --petal)`
- Width driven by `window.scrollY / document.body.scrollHeight`

---

## IV. INTERACTIVE MICRO-INTERACTIONS

1. **Link underlines** (`.underline-link`):
   - Default: 1px underline in `--border-strong`, 3px below text
   - Hover: underline slides left-to-right via
     `background-size: 0% 1px → 100% 1px` on a `linear-gradient` in `--sage`, 0.3s ease-out

2. **Accordion items:** (see Services section above for full spec)

3. **Scroll hint arrow** (hero):
   - The vertical line pulses: grows 0 → full height → 0, duration 1.8s, infinite ease-in-out

4. **Image hover** (all section photos):
   - `filter: sepia(0.14) brightness(1.06)`, 0.4s ease
   - `scale(1.01)` on image with `overflow: hidden` on wrapper

5. **Nav links:**
   - A 4px dot in `--sage` appears beneath the active/hovered link
   - Animated: `scale(0) → scale(1)`, spring `{ stiffness: 300, damping: 20 }`

---

## V. RESPONSIVE DESIGN

| Breakpoint | Value |
|---|---|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

Rules:
- Hero: single column on mobile (image above text)
- `s-intro`: image hidden on mobile, copy full-width
- `s-services`: flanking photos hidden below 1024px, accordion full-width
- `s-about` card: single column below 768px
- Work grid: 4-col → 2-col (tablet) → 1-col (mobile)
- Petal drift: reduce to 4 petals on mobile
- Custom cursor: disabled on touch devices
- Blobs / watercolor wash: opacity reduced 30% on mobile for performance

---

## VI. TECHNICAL CONSTRAINTS

**Tech stack (do NOT change):**
- React 18+ with functional components and hooks
- Vite as bundler
- Framer Motion for all animations
- React Router DOM for routing
- Pure CSS (`.css` files per component) — NO Tailwind, NO styled-components
- CSS custom properties (`var(--token)`) for ALL color/spacing references

**Files to modify:**
```
src/
  index.css
  App.css
  App.jsx
  components/
    Header.jsx / Header.css
    Footer.jsx / Footer.css
    GrainOverlay.jsx / GrainOverlay.css
    ProjectModal.jsx / ProjectModal.css
  pages/
    Home.jsx / Home.css
```

**New files to create (only if necessary):**
```
src/components/CustomCursor.jsx + CustomCursor.css
src/components/ScrollProgress.jsx + ScrollProgress.css
src/components/WatercolorBlobs.jsx + WatercolorBlobs.css
src/components/PetalDrift.jsx + PetalDrift.css
```

**Performance:**
- Watercolor blob animations use CSS keyframes (not JS setInterval)
- Petal drift uses Framer Motion with `will-change: transform`
- All images use `loading="lazy"` except hero
- Grain overlay SVG is inlined (no network request)
- Respect `prefers-reduced-motion`: disable all decorative animations

**Accessibility:**
- All motion components check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Decorative SVGs (petals, lily pads, blobs): `aria-hidden="true"`
- Focus-visible outline: `2px solid --sage`, offset `3px`
- Verify `--ink-muted` on `--cream` passes WCAG AA contrast

---

## VII. SPIRIT & JUDGMENT GUIDELINES

When in doubt, ask: **"What would Monet do?"**

- Monet never painted hard lines. When you want a section divider, use a
  gradient fade — not a border.
- Monet's palette is never flat. When you want a background, layer two or
  three radial gradients at low opacity instead of a single solid.
- Monet painted the same scene twelve times to capture the light. Animate
  slowly and subtly — 12+ second loops, not 0.5s flashes.
- Monet worked outdoors. The site should feel **alive**, never static.
  Even when idle, something should be gently moving.
- Monet's paintings are never busy. They have vast calm areas punctuated by
  intense detail. White space is sacred.

> The goal is a portfolio that feels like standing in the Orangerie in Paris,
> looking at the Water Lilies — immersive, serene, luminous, and unmistakably
> hand-made.

---

## VIII. OUTPUT EXPECTATIONS

Deliver:
1. All modified and new `.jsx` and `.css` files, complete and production-ready
2. A brief comment block at the top of each new component explaining its Monet design rationale (one sentence)
3. No placeholder lorem ipsum — use the real copy already in `Home.jsx`
4. No extra npm packages beyond what is already installed (`framer-motion`, `react-router-dom`)

**Begin with `index.css` and work section by section downward through the page.**
