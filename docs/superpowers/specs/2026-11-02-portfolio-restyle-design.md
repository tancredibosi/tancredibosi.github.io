# Portfolio restyle design

## Goal
Refresh Tancredi Bosi's personal portfolio without losing its minimal black-and-white technical character. Preserve the existing routes, bilingual content, dark/light mode, public PDFs, project links, GitHub fallback, contact form and 3D-printing catalogue.

## Direction
**Technical editorial / contact-sheet** (draw seed `524997043`). The portfolio's own project imagery is the colour and proof; the layout supplies calm order. The source direction calls for a large contact sheet, but the site only has seven software project assets and two printing photographs, so its grid/strip principle is adapted to a compact, responsive two-column project gallery rather than inventing imagery.

**Idea:** Tancredi's practical AI systems and physical 3D work become an ordered project archive visitors can scan and open.

**Live interactions:** theme and language switches, touch-scrollable media rows on small screens, working project/contact/CV links. No decorative animations or fake product UI.

## Information architecture
- **Home:** clear identity hero, role/location facts, portrait, primary actions; concise biography; selected work (LayerCost and Moth); an "off the screen" strip with the two real 3D prints; closing contact call-to-action.
- **Projects:** one unsegmented archive closing with a contact card as the eighth grid cell. Two-column grid on desktop, one on mobile. Each item: square asset, concise description, small category line, real destination. No GitHub language/date metadata, so all cards render statically from config.
- **CV:** keep content and PDFs intact. Improve scanability and mobile order; avoid browser-default links.
- **3D printing:** concise introductory copy, two real works, corrected Katana metadata, commission/contact action.
- **Contact:** direct email/social list alongside the working form. No decorative icon-card row.

## Visual system
- Default dark, light optional; keep black/white/grey palette and let project images supply colour.
- One content frame: `max-width: 1200px`, symmetric horizontal padding.
- Single readable sans face (DM Sans) across the site; no justified text.
- Square/near-square media, 6px corner radius, tone-step panels, no resting shadows, no decorative borders.
- Clear scale: display identity, page heading, card title, readable body, small metadata. Limit text measure to roughly 65 characters.
- Buttons are flat, high contrast, at least 44px high. Links are high-contrast with underline/focus states.

## Responsive behaviour
- Desktop: compact header; split home hero; project grid two columns; contact split layout; CV supporting column can be sticky.
- Tablet: fluid grid and hero columns.
- Phone: single-column composition; hero text before portrait; cards stack image then content; concise headings avoid three-line titles; drawer navigation remains usable.

## Technical approach
- Refactor shared styles in `styles.css` using tokens and page-specific classes without adding a framework.
- Keep existing vanilla JS. Project cards remain generated from `github-projects.js`, with configured local fallback when GitHub is rate-limited.
- Change only site assets where needed: compress profile image to modern formats and use existing project/printing assets.
- Preserve FormSubmit action and existing language attributes.

## Validation
- Test all routes at desktop, tablet and mobile, in Italian and English where translated.
- Verify navigation, language/theme switches, CV download links, project links, GitHub fallback and FormSubmit markup.
- Run visual inspection/screenshots and `git diff --check` before committing. Keep `.DS_Store` untracked.

## Reversibility
Before editing, the current published commit is preserved by tag `pre-restyle-2026-11` and branch `backup/pre-restyle` at `1de9b33`. Work occurs on `restyle`; `main` is untouched until reviewed and explicitly merged.
