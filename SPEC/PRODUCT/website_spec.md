# Website Specification — ADMOVE Landing Page

B2B landing page structure. Goal: generate advertising leads.

**Current architecture only.** The following sections are **not** part of the current UI: Problem, Solution, Vehicle (as standalone sections), Pricing section, Coverage Map, Price Simulator section, FAQ, Media Kit. They may be added in later phases per roadmap.

---

## Page Structure (Sections)

### 1. Navbar

- Logo / ADMOVE name.
- Navigation links: **Le média** (or “Le média mobile”), Parcours, Offres, Contact.
- Language switcher and theme toggle.
- CTA or scroll to contact where appropriate.

### 2. Hero

- Headline presenting ADMOVE (mobile advertising in Montpellier / Littoral). **Hero headline **MUST** contain the phrase “publicité mobile Montpellier”** (or equivalent per locale) for SEO.
- **Supporting line** — short value proposition.
- **Trust line** — explains: visibility estimation, Rear / Side / Full formats, possibility to request a quote.
- Primary CTA (e.g. contact or quote request); secondary CTA (e.g. view offers).

**SEO:** Landing targets: mobile advertising, vehicle advertising, Montpellier, Littoral.

### 3. Le média

- **Concept name:** *média mobile*. **Section label in UI:** “Le média” or “Le média mobile” (id #support in DOM).
- Explains the **advertising medium** (not the route or the formats):
  - Mobile visibility.
  - Presence in daily traffic flows.
  - Message exposure without digital saturation.
- **Avoid** repeating full route information or format descriptions (those live in Parcours and Offres).

### 4. Parcours

- **Section id:** #parcours.
- Schematic route credibility block (no map).
- **Route (curated place names per locale):** Montpellier → Port Marianne → Carnon → Palavas → La Grande-Motte.
- **Left column:** Interactive timeline / route points.
- **Right column: dynamic per active route point.** For each active location display:
  - **Location name** (from curated translations).
  - **Short description** (one line).
  - **Three visibility bullets** (traffic flow, repeated exposure, presence in zones of passage / parking). Use outline icons: Car, Repeat, MapPin. Focus on advertising exposure (traffic flow, daily circulation, visibility repetition, local audience); avoid architecture, tourism or generic descriptions.
  - **Small visibility note** (e.g. indicative visibility based on daily flows).
- **Visibility methodology block** is integrated in this section (how visibility is estimated; see visibility_model.md). No separate “Visibility” section.

### 5. Offres

- **Section id:** #offres.
- Three formats: **Rear**, **Side**, **Full** (primary names).
- Per format: name, positioning, description, benefits, compatibility/exclusivity note (Rear/Side: may coexist under conditions; Full: exclusive).
- **Pricing is not shown directly** in Phase 2A. Calculator is a **placeholder** (expandable shell, static fields, CTA to contact); real calculator logic in Phase 2B (see pricing_model.md).

### 6. Contact

- Contact form (name, company, email, message, optional phone).
- Form submission is out of scope in Phase 2A (visual only).

### 7. Footer

- Compact premium footer: brand, short positioning line, navigation recap (Le média, Parcours, Offres, Contact), minimal meta line.

### Floating actions

- **Scroll-to-top only.** No floating contact/mail button.

---

## Localization Strategy

**Proper nouns must not rely on automatic translation.** Curated labels per locale:

| Location        | FR              | EN              | UA                |
|----------------|-----------------|-----------------|-------------------|
| Montpellier    | Montpellier     | Montpellier     | Монпельє          |
| Port Marianne  | Port Marianne   | Port Marianne   | Порт-Маріанн      |
| Carnon         | Carnon          | Carnon          | Карнон            |
| Palavas        | Palavas         | Palavas         | Палавас           |
| La Grande-Motte| La Grande-Motte | La Grande-Motte | Ла-Гранд-Мотт     |

Use a `locations` (or equivalent) translation object; all place names in the UI must use these values.

---

## Reference

- **Architecture and content** must stay aligned with product_spec.md, pricing_model.md and visibility_model.md.
- **Roadmap:** ROADMAP.md.
- **Design:** DESIGN_SYSTEM.md (typography: Manrope; colors: slate + sky; floating actions: scroll-to-top only).
