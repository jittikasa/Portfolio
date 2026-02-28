# Play Page — Design Research & Findings

Three specialist sub-agents (Illustrator, UX/UI Designer, Product Designer) reviewed the
Play page independently. Their findings are synthesised below.

---

## Context

The Play page is a Moleskine-style open binder — left page for project info (ruled paper),
right page for visuals (dot-grid scrapbook). The broader portfolio aesthetic is Monet/Giverny:
warm parchment, sage greens, editorial calm.

**Important clarification:** Play is not an app-only section. It will hold diverse creative
work — apps, illustrations, physical objects, experiments, visual projects — anything made
out of personal passion. The notebook metaphor is intentionally content-agnostic.

---

## Illustrator's Critique

### Materiality & Tactile Presence

The pages look correct but too sterile. Real Moleskine paper has micro-texture, edge vignette
from thickness, and aging. Specific issues and fixes:

**Hole punches** — currently flat circles. Real binding holes have 4-directional rim depth:
```css
.hole {
  box-shadow:
    inset 0 2px 4px rgba(0,0,0,0.24),
    inset 0 -1.5px 3px rgba(0,0,0,0.16),
    inset 2px 0 3px rgba(0,0,0,0.14),
    inset -2px 0 2px rgba(0,0,0,0.09),
    0 0 0 1px rgba(55,53,30,0.13),
    0 1px 2px rgba(0,0,0,0.09);
}
```

**Scotch tape** — was flat and opaque. Real tape has horizontal wrinkle lines, a warm amber
center-fade gradient, and lifts slightly off the paper:
```css
.tape {
  background:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 1.5px, transparent 3px),
    linear-gradient(90deg, rgba(245,235,205,0.28) 0%, rgba(252,244,222,0.56) 50%, rgba(245,235,205,0.28) 100%);
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  /* + tape swings on hover via CSS spring cubic-bezier */
}
```

**Spine** — gradient is present but could have more drama at the centre crease. Consider
adding embossed text (project title at near-zero opacity) as a craft detail.

### Scrapbook Composition

Current layout is algorithmically placed (centre + bottom-right). Editorial scrapbooks follow
rule-of-thirds rhythm:

- **Primary photo**: left-of-centre anchor in the lower half — creates visual weight and
  natural reading anchor
- **Secondary photo**: upper-right — creates diagonal eye path from anchor to upper corner
- **Empty zones**: top-left and bottom-left breathe and feel intentional, not unfinished

Rotations should be asymmetric (−1.5° and +3.5°), not mirrored.

### Decorative Details

- Add a handwritten "Vol. 2024" label in the top-right area of the dot-grid page, behind
  the photos, at low opacity — gives the page a journal-like personality
- A subtle radial vignette over the entire right page draws the eye inward
- The dot grid should be slightly more visible (opacity 0.22, dot 0.9px) so it reads as
  intentional texture, not a placeholder

### Dot Grid & Color

Increase grid visibility: `radial-gradient(circle, rgba(120,110,75,0.22) 0.9px, transparent 0.9px)`.
Add a bottom-of-page aging gradient: `linear-gradient(transparent 82%, rgba(120,110,75,0.02) 100%)`.
Polaroid paper should be `#FEFBF7` (warm off-white) not pure white.

---

## UX/UI Designer's Critique

### P0 — Do First (Massive Impact)

**Tab discoverability**: A first-time visitor has no signal that tabs are interactive.
Fix with:
1. Tabs slide in from the right on page load (entrance animation, 0.5s delay)
2. Active tab fires a single leftward nudge keyframe at 1.4s — a subtle "tap me" signal
3. Active tab colour accent bar raised to opacity 0.9 — unmistakable

**Page transition** — replace flat `x-slide + opacity` with scale component:
```js
initial: { opacity: 0, x: 18, scale: 0.97 }
animate: { opacity: 1, x: 0, scale: 1 }
exit:    { opacity: 0, x: -18, scale: 0.97 }
```
The scale change gives a physical "pressing in and releasing" feel.

**Redundant year** — year appears in both the tags row and the handwritten footer. Remove
the footer year; keep only in tags.

### P1 — Polish & Delight

**Photo hover micro-interaction**: `whileHover={{ y: -7, rotate: slightly-more }}`
lifts the photo off the page. Pairs with the tape swing for full tactile feedback.

**Typography rhythm** (tighten):
- `binder-header` margin: 2.5rem → 2rem
- `binder-desc` max-width: 44ch → 40ch (tighter text block, easier scanning)
- Subtitle color: `--sage-deep` → `--ink` at 65% opacity (clearer separation from tags)

**Info architecture**:
- Eyebrow counter `1 / 2` is adequate — communicates discrete projects without being verbose
- Year in footer is redundant — remove it
- Links need more breathing room before them (already handled by tag margin)

### P2 — Future Consideration

- One-time "tap tabs to explore" tooltip (localStorage gate, auto-dismiss after 3s)
- Progress dots at the bottom for mobile
- On mobile: replace fixed tabs with a horizontal carousel or swipe gestures
- Idle animation: subtle pulse on active tab after 3s of inactivity

### Mobile UX (Current State Issues)

- Binder metaphor breaks on small screens — tabs at `position: fixed` are disorienting
- No swipe support
- Fixed tabs may overlay content unpredictably with many projects
- **Proposed**: adopt a card/swipe pattern on mobile, keep binder only on ≥768px

---

## Product Designer's Critique

### The Notebook Metaphor — Verdict: Keep It

The Moleskine binder is the right choice *especially* because Play holds diverse creative
work (not just apps). A notebook is content-agnostic — it holds anything worth documenting.
The ruled left page = notes, the dot-grid right page = visual evidence. This structure works
for an app, a photo series, a typeface, a physical prototype, or a written piece.

**No need to change the layout. Only the inner content changes per project.**

### What the Metaphor Gets Right

- Immediately legible structure: notes left, visuals right
- Color-coded tabs suggest distinct projects — good wayfinding
- Typography is consistent with the Monet home page
- Animation is polished (AnimatePresence, Framer Motion)

### What Needs Narrative Depth

The left page reads as a data sheet, not a story. For diverse creative projects, the
description needs a personal voice — *why it was made*, not just what it does.

**Missing fields from `projects.js`** (to add when relevant):
- `motivation` — "I built this because..." (1 sentence)
- `tech` — stack or materials used (e.g., "Swift/SwiftUI" or "risograph print on cotton")
- `status` — "live on App Store", "limited edition", "archived", etc.
- `metrics` — downloads, press, people reached, or even just "personal use"

These don't all need to show on every project — add conditionally like `links`.

### Scalability (Tabs at 6+ Projects)

Current tab system works well at 2 projects. Risks at scale:
- Vertical tab stack exceeds viewport height
- Tab labels become dense, hard to read
- No grouping or filtering
- Mobile `position: fixed` with many tabs overlaps content

**Proposed fallback** (implement when hitting 5+ projects):
- Tabs scroll within their container rather than overflowing
- OR: replace tabs with a horizontal strip of project thumbnails/swatches at the bottom
- OR: add a category filter row above the binder (e.g., "All / iOS / Print / Experiments")

### Brand Alignment

The home page is a Giverny atelier — painterly, organic. The Play page is a structured
notebook — deliberate, curated. The tension is intentional and works: the home page shows
*how Jittika sees the world*, the Play page shows *what she makes*.

The critical bridge: the **right page** should feel painterly and alive, not like a clean
digital filing system. The scrapbook texture, the tape, the handwritten label, the subtle
colour bloom — these are the connective tissue between both pages.

---

## Implemented Improvements (This Session)

| Change | Source | Status |
|--------|--------|--------|
| Photo recomposition (left-anchor + upper-right) | Illustrator | ✅ |
| Tape wrinkle texture + lifted shadow | Illustrator | ✅ |
| Tape swings on hover (CSS spring) | Illustrator | ✅ |
| Hole punch 4-direction rim depth | Illustrator | ✅ |
| Dot grid: 0.22 opacity, 0.9px dot | Illustrator | ✅ |
| Handwritten "Vol. 2024" label (right page) | Illustrator | ✅ |
| Radial vignette over right page | Illustrator | ✅ |
| Polaroid paper: warm off-white `#FEFBF7` | Illustrator | ✅ |
| Tab entrance animation (slide from right) | UX/UI | ✅ |
| Active tab nudge hint keyframe | UX/UI | ✅ |
| Active tab accent bar opacity 0.9 | UX/UI | ✅ |
| Page transition: scale component added | UX/UI | ✅ |
| Photo hover: lift + rotate (whileHover) | UX/UI | ✅ |
| Remove redundant year footer | UX/UI | ✅ |
| Subtitle: `--ink` 65% opacity | UX/UI | ✅ |
| Typography spacing tightened | UX/UI | ✅ |
| Notebook metaphor confirmed correct | Product | ✅ |

## Pending / Future Work

| Item | Source | Priority |
|------|--------|----------|
| Add `motivation`, `tech`, `status`, `metrics` fields to projects.js | Product | P1 |
| Mobile: swipe gesture support | UX/UI | P1 |
| Mobile: horizontal tab carousel below binder | UX/UI | P1 |
| Tab overflow strategy for 5+ projects | Product | P1 |
| One-time "tap tabs" tooltip | UX/UI | P2 |
| Spine embossed text detail | Illustrator | P2 |
| Page corner micro-texture (SVG noise filter) | Illustrator | P2 |
| Idle animation: active tab pulse after 3s | UX/UI | P2 |
