# Portfolio Redesign — Work Log

## Overview

Full editorial redesign of jittika.com, inspired by the layout and structure of [West & Co Travel](https://www.westandcotravel.com/). Built with React + Vite + Framer Motion.

---

## Branch Structure

| Branch | Status | Description |
|--------|--------|-------------|
| `main` | **Live** | Coming soon holding page |
| `redesign` | Local only | Full editorial redesign (not yet deployed) |

---

## Live Site (`main`)

A minimal coming soon page replacing the previous interactive typewriter experience.

**Design:**
- Full-viewport centred layout on warm parchment (`#F7F3EC`)
- Display serif headline: *"Something beautiful is coming."*
- Monospaced email link: `hello@jittika.com`
- Entrance animation via Framer Motion

---

## Redesign (`redesign` branch)

### Layout — West & Co Reference

Each section mirrors the editorial structure of the West & Co Travel website:

#### 1. Hero
- **Split two-column layout** — text left, typewriter image top-right
- Left: eyebrow label, large serif headline ("Where design & craft meet."), CTA link
- Right: `typewriter.png` on parchment background, slides in from right on load
- Scroll hint bottom-left

#### 2. Intro (`#intro`)
- **Reversed split** — `typewriter-wide.png` overhead shot on left, text on right
- Prevents duplication with hero (different image, different column order)
- Scroll-triggered fade-in animation

#### 3. Services (`#work`)
- **Three-column layout** — photo | accordion | photo
- Left: `typewriter-wide.png`
- Centre: heading, subtext, animated accordion (01 Product Design / 02 Brand Identity / 03 Web Design & Dev), "Start a Project" link
- Right: `typewriter-grid.png`
- Flanking photos hidden on tablet/mobile, accordion remains

#### 4. Quote
- Centered blockquote on warm beige (`#EDE6D8`)
- *"Good design should feel inevitable — like it couldn't have been done any other way."*

#### 5. About (`#about`)
- **Floating card layout** matching West & Co "Meet Taylor" section
- Centered card (`max-width: 1100px`) with drop shadow, rounded corners
- Left column: `typewriter-grid.png` bleeding to card edge
- Right column: `MEET JITTIKA:` uppercase heading, body copy, "Get in Touch" CTA button

#### 6. Work Grid (`#projects`)
- 4-column project tile grid (2-col on tablet, 1-col on mobile)
- 8 projects: Shellist, PolaMoment, Atelier Lumière, Botanica, Nomad, Muse Magazine, Harmony, Kinfolk Café
- Each tile: colour swatch, type label, year, title, subtitle, "View →" link
- Click opens `ProjectModal` with full project detail

#### 7. Footer
- Three-column: Services links | *J* logo + tagline | Info links
- Social links (Instagram, Dribbble, LinkedIn) + copyright line

---

### Header

- Announcement bar: `DESIGNER & MAKER · AVAILABLE FOR PROJECTS`
- Transparent nav with logo `J` and links: Home / Work / About / Contact

---

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--canvas` | `#F7F3EC` | Page background |
| `--parchment` | `#EDE6D8` | Photo columns, quote section |
| `--ink` | `#2A1F14` | Headings, body text |
| `--ink-muted` | `#6B5E52` | Secondary text |
| `--sage` | `#7A9E7E` | Accent, labels |
| `--border` | `rgba(42,31,20,0.1)` | Section dividers |

---

### Typography

| Role | Font |
|------|------|
| Display / Headings | Cormorant Garamond (serif) |
| Body | Variable serif |
| Labels / Mono | Space Mono |

---

### Animations

All scroll-triggered sections use Framer Motion `whileInView` with the shared `fade` variant:

```js
const fade = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
```

Hero entrance animations use `animate` (mount) with staggered delays (0.2s → 0.35s → 0.65s).

---

### Images

| File | Usage |
|------|-------|
| `public/typewriter.png` | Hero right column (front-facing, mint green) |
| `public/typewriter-wide.png` | Hero background (old), intro left, services left |
| `public/typewriter-grid.png` | Services right, about card left |

---

## To Deploy Redesign

```bash
git checkout redesign
git push origin redesign:main
```

Or merge into main when ready:

```bash
git checkout main
git merge redesign
git push origin main
```
