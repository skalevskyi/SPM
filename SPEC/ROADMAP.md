# ADMOVE Project Roadmap

## Current Status

- **Current phase:** Phase 2A — UI / Visual MVP
- **Next focus:** Minor polish, final QA, optional branding refinement as needed. No new section scope in 2A.

---

## Phase 1 — Concept

- ✓ concept defined
- ✓ pricing estimation model (no fixed prices; see pricing_model.md)
- ✓ visibility methodology (indicative placeholders; see visibility_model.md)
- ✓ landing wireframe

## Phase 2A — UI / Visual MVP

- ✓ Navbar (desktop: brand, support, Parcours, Offres, Contact; language/theme)
- ✓ Hero (real imagery, premium rotator, reduced motion support)
- ✓ **Le support publicitaire / How the advertising works** section (id #support; UI titles per locale; medium concept, no route/format repetition)
- ✓ Parcours section (route credibility block; id #parcours; schematic timeline with **live progress visualization** — ACTIVE/FILLED/MUTED; **semi-static right column**: dynamic location title + description, **static** three bullets + note; visibility block **BASIC / PRO / EXCLUSIVE** with localized placement; no map)
- ✓ Offres section (three packages; real mockups; **no fixed prices in UI**; “Calculer” expands calculator **placeholder** only)
- ✓ Calculator placeholder UI inside Offres cards (expandable shell, static fields, CTA to #contact; no real logic)
- ✓ Contact section (visual-only form; id #contact)
- ✓ Footer (compact premium; links to support, Parcours, Offres, Contact)
- ✓ Mobile bottom navigation (support, Parcours, Offres, Contact)
- ✓ **Floating actions: scroll-to-top only** (no floating contact button)
- ✓ Reduced motion support (hero, Parcours, section entrances)
- ✓ Responsive layout; main bottom padding for mobile nav
- ✓ Favicon / app icon metadata; brand asset integration
- ✓ Localization: **FR-first, section-based** under `src/i18n/locales/{fr,en,ua}`; custom LanguageContext; whole-locale fallback; TranslationKeys from FR; curated place names (FR/EN/UA); Manrope typography; UTF-8 clean
- ✓ Mobile navigation hydration stability fix (mounted guard; no SSR/client active-state mismatch)
- ⬜ Minor visual polish (if any)
- ⬜ Final QA

## Phase 2B — Functionality

- ⬜ Contact form submission
- ⬜ **Real calculator / estimation logic** (Phase 2A delivers placeholder UI only; pricing is dynamic per pricing_model.md)
- ⬜ FAQ (interactive if needed; not part of current landing architecture)
- ⬜ Coverage map (interactive if needed; not part of current landing architecture)
- ⬜ Media kit download (not part of current landing architecture)

## Phase 3 — Marketing

- ⬜ media kit
- ⬜ SEO pages
- ⬜ Google Business profile

## Phase 4 — Sales

- ⬜ outreach list
- ⬜ first clients
- ⬜ case study

---

**Legend:** ✓ completed · ⬜ pending

**Note:** Current landing does **not** include: Problem, Solution, Vehicle (as separate sections), Pricing section, Coverage Map, Price Simulator section, FAQ, or Media Kit. Visibility is integrated into Parcours. Pricing is not shown in Offres in Phase 2A.
