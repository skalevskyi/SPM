# Mobile UI Audit Report — ADMOVE Landing

**Date:** 2025-03-14  
**Mode:** Read-only analysis. No code or architecture changes.  
**Viewport focus:** 320px – 430px width.

---

## 1. Critical mobile issues

### 1.1 Anchor targets and fixed bottom nav — content hidden when scrolled

| Item | Details |
|------|--------|
| **Section** | Navigation & Safe Area / Contact / Offres |
| **Problem** | When the user taps a bottom-nav link (e.g. #contact, #offres), the browser scrolls so the section id is at the top of the viewport. There is no `scroll-margin-bottom` or `scroll-padding-bottom`. When the user then scrolls down to reach the primary CTA (Contact submit, or Offres “Calculer” / calculator CTA), that CTA can sit at the very bottom of the viewport and be partially or fully covered by the fixed bottom nav. |
| **Reason** | `main` uses `pb-24` (96px) on mobile. The bottom nav height is `py-3` + content (min ~44px) + `pb-[env(safe-area-inset-bottom)]`, so total height is often ≥100px on devices with a home indicator. So 96px does not guarantee that the last visible “content row” (e.g. submit button) sits above the nav. No `scroll-margin-bottom` on `#contact`, `#offres`, etc., and no `scroll-padding-bottom` on `html` to reserve space for the nav. |
| **Suggested UI direction** | (1) Add `scroll-margin-bottom` to section anchors (`#contact`, `#offres`, `#parcours`, `#support`) so that when the user scrolls to the bottom of a section, the last interactive element sits above the nav (e.g. `scroll-margin-bottom: calc(5rem + env(safe-area-inset-bottom))`). (2) Optionally increase `main` bottom padding on mobile to at least match nav height + buffer, e.g. `pb-[calc(5.5rem+env(safe-area-inset-bottom))]`, so the last stretch of content is never under the nav. |

### 1.2 Contact section — submit button can sit under bottom nav

| Item | Details |
|------|--------|
| **Section** | Contact |
| **Problem** | When the user has scrolled down to bring the submit button into view, the button can align with the bottom of the viewport and be partially covered by the fixed bottom nav, making it hard to tap. |
| **Reason** | The section has `py-16` (64px bottom). That padding is below the submit button. There is no extra mobile-only bottom padding to keep the submit clearly above the nav when the user has scrolled to the end of the form. Combined with the lack of scroll-margin (see 1.1), the CTA is at risk of being hidden. |
| **Suggested UI direction** | On mobile (e.g. below `md`), add substantial bottom padding to the Contact section so that when the user scrolls to the bottom of the section, the submit button sits well above the nav (e.g. `pb-28` or `pb-[calc(5rem+env(safe-area-inset-bottom))]`). This keeps the CTA always tappable when in view. |

---

## 2. Moderate UX issues

### 2.1 Main bottom padding vs. nav height and safe area

| Item | Details |
|------|--------|
| **Section** | Navigation & Safe Area |
| **Problem** | `main` uses a fixed `pb-24` (96px) on mobile. On devices with a large `safe-area-inset-bottom` (e.g. ~34px), the total bottom nav height can exceed 96px, so the very bottom of the main content area (e.g. the strip above the footer) can sit under the nav. |
| **Reason** | Nav uses `pb-[env(safe-area-inset-bottom)]` but the main container does not add safe area to its bottom padding. |
| **Suggested UI direction** | Use bottom padding that includes the safe area on mobile, e.g. `pb-[calc(6rem+env(safe-area-inset-bottom))]` or `pb-[calc(5.5rem+env(safe-area-inset-bottom))]`, so the last content is always above the nav and the home indicator. |

### 2.2 Parcours route markers — small touch and visual size on mobile

| Item | Details |
|------|--------|
| **Section** | Parcours |
| **Problem** | Route marker buttons are `h-6 w-6` (24px). The inner dot is `h-2.5 w-2.5` (active), `h-2 w-2` (filled), or `h-1.5 w-1.5` (muted). 24px is below the common 44px minimum recommended for touch targets; the dots are small for quick visual scanning. |
| **Reason** | Layout is compact and not tuned for touch size on small viewports. |
| **Suggested UI direction** | On narrow viewports (e.g. max-width 430px), consider increasing the marker hit area (e.g. min 44px) and/or the dot size so that taps are easier and the route state is easier to read at a glance. The label is also a button, so combined tap area exists but could be clearer. |

### 2.3 Offres cards — fixed min-height can create uneven or excessive height

| Item | Details |
|------|--------|
| **Section** | Offres |
| **Problem** | Each card uses `min-h-[360px]`. On 320px width, when content is short or varies by locale, cards can feel overly tall or uneven in height when stacked. |
| **Reason** | Single min-height for all breakpoints; no mobile-specific reduction or removal. |
| **Suggested UI direction** | On mobile, consider a smaller min-height (e.g. `min-h-0` or a lower value like `min-h-[280px]`) or remove the min so card height follows content and cards stack more naturally. |

### 2.4 Parcours visibility block — note font size

| Item | Details |
|------|--------|
| **Section** | Parcours (right column) |
| **Problem** | The shared note uses `text-[11px]`, which is below common readability guidelines (e.g. 12px minimum) and can be hard to read on small screens. |
| **Reason** | Fixed 11px for compactness. |
| **Suggested UI direction** | On mobile, use at least `text-xs` (12px) for the note to improve readability and accessibility. |

### 2.5 Hero — first-screen density and height on 320px

| Item | Details |
|------|--------|
| **Section** | Hero |
| **Problem** | On 320px, the hero stacks: headline (text-4xl, can wrap to 3–4 lines), subheadline (text-lg), trust line (text-sm), two stacked CTAs (flex-col below sm), then a 4:3 image. The first screen may show only the headline and part of the subheadline; trust line and CTAs can sit below the fold. The hero can feel long before reaching Support. |
| **Reason** | Single-column layout with fixed typography scale and aspect-ratio image; no mobile-specific reduction of vertical spacing or image ratio. |
| **Suggested UI direction** | Optional polish: slightly tighter vertical spacing or a smaller image aspect on very narrow viewports (e.g. 320–375px) so that at least headline + subheadline + one CTA are above the fold, or accept current density and ensure CTAs are discoverable with minimal scroll. |

---

## 3. Minor polish suggestions

### 3.1 Scroll-to-top button position

| Item | Details |
|------|--------|
| **Section** | FloatingActions |
| **Observation** | Button uses `bottom-[calc(4rem+env(safe-area-inset-bottom)+0.5rem)]`, so it sits above the nav. Position is consistent and clear. |
| **Suggested UI direction** | No change required. Optional: ensure the button does not overlap critical content (e.g. last Offres CTA) on 320px; current right positioning is generally safe. |

### 3.2 Support section — bullet list spacing

| Item | Details |
|------|--------|
| **Section** | Support (ConceptSection) |
| **Observation** | Bullets use `space-y-2` (8px). On 320px with long lines, the list can feel slightly tight. |
| **Suggested UI direction** | Consider `space-y-3` on mobile for a bit more vertical rhythm; low priority. |

### 3.3 Parcours visibility card density

| Item | Details |
|------|--------|
| **Section** | Parcours (visibility estimation block) |
| **Observation** | Card uses `px-6 py-5`, `text-xs` for the label, `text-sm` for the list. On 320px the hierarchy is clear but the block could feel a bit dense. |
| **Suggested UI direction** | Optionally increase internal spacing (e.g. `py-6` or `space-y-3`) on mobile for a calmer reading. |

### 3.4 Body overflow on very long words

| Item | Details |
|------|--------|
| **Section** | Global (globals.css / layout) |
| **Observation** | `body` has no `overflow-x: hidden`. Very long unbroken strings (e.g. URLs or long words in some locales) could cause horizontal scroll on 320px. |
| **Suggested UI direction** | Consider `overflow-x-hidden` on `html` or `body` as a safeguard, and ensure long text uses `break-words` or similar where needed. |

### 3.5 Offres calculator placeholder — CTA above nav when expanded

| Item | Details |
|------|--------|
| **Section** | Offres |
| **Observation** | When a card’s calculator is expanded, the inner CTA (“Demander une estimation”) can sit near the bottom of the card. With `main` pb-24, it should usually be above the nav after scroll; see Critical 1.1 for global anchor/padding improvements. |
| **Suggested UI direction** | Once scroll-margin and/or main padding are updated (see 1.1), no extra change needed; optionally add a small bottom padding to the expanded calculator block on mobile so the CTA is clearly above the nav. |

---

## 4. Tailwind / CSS notes (320–430px)

| Topic | Finding |
|-------|--------|
| **Fixed heights** | Offres cards: `min-h-[360px]` — see 2.3. No other problematic fixed heights in Hero or other sections. |
| **Flex / grid** | Hero CTAs use `flex-col` below `sm` (stacked) — good. Parcours uses single-column grid with `gap-12` on mobile — good. Offres stacks cards with `gap-6` — good. |
| **Breakpoints** | 320–430px use default (no `sm`/`md`). No breakpoint-related bugs in the audited components. |
| **Margins / paddings** | Section padding is consistent (`px-4`, `py-16`). Main `pb-24` is the only padding that should be revisited for nav/safe area (see 1.1, 2.1). |

---

## 5. Summary

- **Critical:** Address anchor scrolling and bottom spacing so that CTAs (especially Contact submit and Offres actions) are never covered by the fixed bottom nav; add scroll-margin and/or increase main and Contact bottom padding and respect safe area.
- **Moderate:** Align main bottom padding with nav height + safe area; improve Parcours marker size and Offres card min-height on mobile; increase Parcours note font size on mobile; optionally refine Hero first-screen density.
- **Minor:** Optional tweaks to Support list spacing, visibility card spacing, and body overflow; scroll-to-top is already well placed.

No code was modified; this report is analysis only and can be used to prioritize mobile UX fixes.

---

## 6. Resolved in latest UI iteration

The following items have been addressed in post-audit implementation (documentation updated to match):

| Area | Status | Note |
|------|--------|------|
| **Navigation / hydration** | **FIXED** | MobileBottomNav uses a mounted guard; initial render is neutral (no active item); hash + scroll active-state logic runs only after client mount. SSR and initial client HTML match; hydration mismatch removed. |
| **Mobile nav background** | **Improved** | Nav surface uses **bg-white/80** and **dark:bg-slate-900/80** for slightly more transparency; blur (**backdrop-blur-md**), border, rounded shape, and safe-area handling unchanged. |
| **Parcours mobile alignment** | **Improved** | Route module is a **centered compact block** on mobile: inner container uses **w-fit** (content-sized) on mobile and **md:w-full md:max-w-xs** on desktop so the timeline is visually centered; marker column left, labels right (single-row layout). |
| **Main bottom padding** | **Addressed** | Main uses safe-area–aware bottom padding on mobile (`pb-[calc(6rem+env(safe-area-inset-bottom))]`); scroll-to-top button positioned above floating nav. |

Historical audit sections (1–5) remain for context; the above reflects current implementation state.
