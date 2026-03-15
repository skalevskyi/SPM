# Visibility Model — ADMOVE

Methodology and assumptions for daily and monthly visibility estimates. **Current numbers are indicative placeholders;** final numbers will be derived from the methodology and, where available, real traffic and route data.

**Clarification:** *Visibility figures are indicative estimates based on route modelling and will be refined using real traffic and route data.*

---

## Route

The vehicle circulates daily on a defined route covering:

- Montpellier (centre and relevant zones)
- Port Marianne
- Carnon
- Palavas
- La Grande-Motte

The route is fixed to allow consistent exposure modelling. Place names in the UI use curated translations per locale (see website_spec.md or DESIGN_SYSTEM.md).

## Methodology (unchanged)

The methodology remains based on:

- **Traffic exposure** — contacts when the vehicle is in motion (other drivers, pedestrians, cyclists); depends on road type, density and time per segment.
- **Parking exposure** — when the vehicle is stationary (parking, stops), it continues to generate visibility; parking zones and duration are factored in.
- **Peak hour multiplier** — hours of higher traffic (e.g. morning and evening peaks) are weighted more in the model.
- **Route repetition** — fixed route and daily repetition allow consistent modelling.

## Daily Distance

- Total daily distance and time on the route are defined to support exposure calculations.
- Distance and duration feed into traffic and parking exposure estimates.

## Visibility Estimates (Summary) — Indicative Placeholders

| Format | Daily contacts (approx.) | Monthly contacts (approx.) |
| ------ | ------------------------- | -------------------------- |
| **Rear**  | ~5 000  | ~110 000  |
| **Side**  | ~7 000  | ~150 000  |
| **Full**  | ~9 000  | ~200 000  |

- **Rear:** rear only → lower surface and angles of view.
- **Side:** sides added → more surface and viewing angles.
- **Full:** full branding → maximum surface and recognition.

These figures are **indicative placeholders** used for commercial communication and UI (e.g. Parcours methodology block, Offres). They must be presented as estimates. Final numbers will be derived from the methodology above and refined with real route and traffic data where available.

---

**Cross-references:** product_spec.md (formats Rear/Side/Full), pricing_model.md (estimation context), website_spec.md (Parcours section and visibility block).
