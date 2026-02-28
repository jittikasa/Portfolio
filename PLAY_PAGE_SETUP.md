# Play Page Setup

This is the agreed baseline for the `/play` page on the `redesign` branch.

## Structure

- Route stays at `/play`.
- The page uses the open-binder layout:
  - Left page: project info, tags, features, utility links.
  - Right page: hero image.
  - Below binder: full preview image, then CTA section.

## Left Binder Page

- Do not use the old inline App Store button inside the left page.
- Replace that slot with two lightweight utility links:
  - `Privacy Policy`
  - `Support`
- These links should feel integrated with the notebook system:
  - `var(--font-mono)`
  - small uppercase styling
  - muted ink tone by default
  - subtle underline
  - `var(--sage-deep)` hover
- If a project does not yet have real support/privacy URLs, use `/contact` as the fallback instead of dead `#` links.

## Binder Tabs

- The selected project tab should be subtle.
- Do not use a chunky active border, heavy shadow, or width jump.
- Active state should only use:
  - a slight paper tint shift
  - the slim color marker
  - stronger label color

## CTA Section

- Keep the lower CTA button in the bottom CTA section.
- The CTA should be flat and editorial, not card-heavy:
  - no bulky panel chrome
  - no oversized rounded card treatment
  - very light atmospheric wash only
- Container overflow must stay visible so the button shadow is not clipped.

## CTA Typography

- CTA typography should be self-contained in `Play.css`.
- Do not rely on `Home.css` for this section.
- Font usage:
  - Eyebrow (`AVAILABLE NOW`): `var(--font-mono)`
  - Headline: `Shorelines Script`
  - Body copy: `var(--font-body)`
  - Detail labels: `var(--font-mono)`
  - Detail values: `var(--font-body)`
  - CTA button text: `var(--font-body)`

## CTA Headline

- The headline `Ready to track beautifully?` should use `Shorelines Script`.
- It must stay much smaller than the earlier oversized serif version.
- Treat it as an accent headline, not the dominant visual element.

## CTA Detail Rows

- `PRICE`, `PRIVACY`, and `PLATFORM` must be clearly readable.
- Use `var(--ink)` for the detail labels.
- Do not fade these labels with low-opacity styling.
- Keep the detail rows aligned and structured, not collapsed into one text block.

## Brand Notes

- The Play page should stay within the existing brand system:
  - `var(--font-display)`
  - `var(--font-body)`
  - `var(--font-mono)`
  - `Shorelines Script` only as a deliberate accent
- Avoid generic utility-button styling inside the binder.
- Prefer editorial, light-touch styling over heavy UI chrome.
