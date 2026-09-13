# AGENTS.md — Developer & AI Agent Context

## 1. Project Overview & Domain
- **Project Purpose:** A responsive landing page demo for **Al-Binaa Engineering**, a fictional premier civil, structural, and infrastructure engineering firm operating across the Arabian Gulf.
- **Tone & Aesthetic:** Industrial, refined, authoritative, and clean. Dark and light high-contrast surfaces, bold typography, warm amber accents (`--secondary`), and meticulous attention to structural elegance.
- **Multilingual Support:** Native bilingual support for **English (`en`)** and **Arabic (`ar`)** with complete bidirectional layout adaptation (LTR and RTL).

---

## 2. Tech Stack & Environment
- **Framework:** Next.js 16 (App Router)
- **Runtime / UI Library:** React 19 (`reactCompiler: true` enabled in `next.config.ts`)
- **Language:** TypeScript (`strict: true`, path alias `@/*` -> `./src/*`)
- **Package Manager:** `pnpm` (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)
- **Styling Paradigm:** Pure CSS Modules (`*.module.css`) + CSS Custom Properties (Design Tokens). No Tailwind, no CSS-in-JS, no styled-components.
- **CSS Reset:** Josh W. Comeau's Modern CSS Reset incorporated directly at the top of `src/app/[lang]/globals.css`.

---

## 3. Localization (i18n) & Layout Direction (RTL / LTR)
- **Routing:** Handled via the dynamic route segment `src/app/[lang]/`.
- **Allowed Locales:** Defined in `src/lib/types.ts`:
  ```ts
  export type Lang = "en" | "ar";
  ```
- **Static Pre-rendering:** Configured in `src/app/[lang]/layout.tsx`:
  - `generateStaticParams()` returns `[{ lang: "en" }, { lang: "ar" }]`.
  - `dynamicParams = false` restricts dynamic paths to these two locales.
- **Root Redirection:** `src/app/page.tsx` permanently redirects `/` to `/en`.
- **Content Dictionaries:**
  - Content is structured as JSON in `src/lib/content/en.json` and `src/lib/content/ar.json`.
  - Loaded synchronously via `getDictionary(lang)` in `src/lib/utils.ts`.
  - Never hardcode user-facing strings directly in components; always access them from the dictionary slice passed via props.
- **Directional CSS Rule:**
  - **Always use CSS Logical Properties** instead of physical left/right to guarantee seamless RTL support:
    - Use `margin-inline-start` / `margin-inline-end` instead of `margin-left` / `margin-right`.
    - Use `padding-inline-start` / `padding-inline-end` instead of `padding-left` / `padding-right`.
    - Use `border-inline-start` / `border-inline-end` instead of `border-left` / `border-right`.
    - Use `inset-inline-start` / `inset-inline-end` instead of `left` / `right`.
  - For transforms or locale-specific layout overrides, use `:lang(en)` and `:lang(ar)` selectors (see `BurgerMenu.module.css` for examples).

---

## 4. Typography & Font System
Configured in `src/lib/fonts.ts` via `next/font/google`:
- **English (`en`):**
  - Display / Headings: **Sora** (`--font-sora`)
  - Body: **Inter** (`--font-inter`)
  - Labels & Subheadings: **IBM Plex Sans** (`--font-ibm-plex-sans`)
  - Base Font Size: `16px`
- **Arabic (`ar`):**
  - Display / Headings: **Almarai** (`--font-almarai`)
  - Body: **Tajawal** (`--font-tajawal`)
  - Labels & Subheadings: **IBM Plex Sans Arabic** (`--font-ibm-plex-sans-arabic`)
  - Base Font Size: `18px` (adjusted for Arabic letterform legibility)
- Font classes are applied to the `<html>` root in `src/app/[lang]/layout.tsx`, mapping to CSS variables `--font-display`, `--font-body`, and `--font-label`.

---

## 5. Design Tokens & CSS Variables
All global variables reside in `src/app/[lang]/globals.css`:
- **Color Palette:**
  - `--background`: `#121414` (Deep charcoal/black for hero/footer/dark blocks)
  - `--background-alt`: `#f2f0f0` (Light off-white section background)
  - `--surface`: `#1e2020`
  - `--surface-alt`: `#282a2b`
  - `--text`: `#e2e2e2` (Primary light text on dark backgrounds)
  - `--text-muted`: `#c4c7c7`
  - `--text-alt`: `#616161` (Subdued gray text for badges / secondary info)
  - `--primary`: `#c8c6c5` (Muted industrial steel/concrete)
  - `--secondary`: `#ffb956` (Signature construction amber/gold accent)
  - `--border`: `#444748`
  - `--error`: `#ffb4ab`
- **Spacing Scale:**
  - `--space-1`: `4px`, `--space-2`: `8px`, `--space-3`: `12px`, `--space-4`: `16px`, `--space-6`: `24px`, `--space-8`: `32px`, `--space-12`: `48px`, `--space-16`: `64px`
- **Container Paddings & Layout:**
  - `--container-padding`: `16px`
  - `--container-padding-m`: `32px`
  - `--container-padding-lg`: `64px`
  - `--container-padding-xlg`: `96px`
  - `--section-gap`: `96px` (desktop) / `64px` (mobile `<= 768px`)
  - `--content-width`: `1200px`
  - `--radius`: `8px`
  - `--transition`: `200ms ease`

---

## 6. Architecture & Component Guidelines
1. **Directory Structure:**
   - Group components in `src/components/<ComponentName>/`.
   - Each folder holds `<ComponentName>.tsx` and `<ComponentName>.module.css`.
2. **Server vs. Client Components:**
   - Default to **React Server Components (RSC)**. Do NOT add `"use client"` unless the component manages state, effects, or DOM events.
   - Interactive components currently: `BurgerMenu.tsx` (state) and `FocusTrap.tsx` (DOM event listeners).
3. **Semantic HTML & Accessibility:**
   - Always prefer semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<nav>`.
   - For dialogs/drawers, ensure focus trapping, `Escape` key handling, and toggle `inert` / `aria-hidden` attributes appropriately.
4. **Images:**
   - Use `next/image` with static imports or properly configured dimensions.
   - When images are placeholders or waiting for assets, construct clean container wrappers styled with `--surface` or gradient placeholders with descriptive `aria-label`s.
5. **Page Composition (`src/app/[lang]/page.tsx`):**
   - The localized home page retrieves dictionary data once and passes dedicated content slices to each section component:
     - `HeroSection`: `content.hero`
     - `StatBar`: `content.statBar`
     - `IntroSection`: `content.Intro`
     - `SpecializationsSection`: `content.specializations`
     - `ProjectsSection`: `content.projects`
6. **Sub-Component Extraction for Complex Cards:**
   - When a section iterates over multi-part cards (e.g. `SpecializationCard`, `DisciplineCard`, `ProjectCard`), extract the card into its own typed sub-component rather than inlining complex layouts inside `.map()`.
   - Co-locate the sub-component inside the same directory (or file) to keep `src/components/` clean and maintain clear separation between section framing and card-level rendering.

---

## 7. Conventions for Modifying or Adding Sections
- **Content First:** If creating a new section (e.g. Testimonials, Contact, About), first inspect and update `src/lib/content/en.json` and `src/lib/content/ar.json` with matching structures.
- **Props Typing Pattern:** Section components must receive their content slice as a single `content` prop. Define explicit TypeScript types for the content slice, and keep the component props interface clean:
  ```ts
  export type SectionContent = { ... };

  interface SectionProps {
    content: SectionContent;
  }
  ```
  **Do NOT** re-declare individual content fields as top-level optional or separate props alongside `content` (e.g., avoid `interface Props { title?: string; content: Content; }`). Always access user-facing text directly from `content.<field>`.
- **Styling Discipline:** Never use inline styles for layout. Rely on CSS classes defined in the component's `.module.css` leveraging `:root` design tokens.

---

## 8. Multi-Page Architecture & Sub-Page Design Plan
The site expands beyond the landing page into four dedicated routes: **Services** (`/[lang]/services`), **Projects** (`/[lang]/projects`), **About** (`/[lang]/about`), and **Contact** (`/[lang]/contact`). All sub-pages must maintain the established brutalist-industrial aesthetic, bilingual parity, accessibility, and high-contrast section rhythm.

### A. Shared Layout & Component Standards
1. **Section Wrapper & Container Standard:**
   ```css
   .sectionWrapper {
     padding: var(--container-padding-xlg) 0;
     font-family: var(--font-body);
   }
   .container {
     max-width: var(--content-width);
     margin-inline: auto;
     padding-inline: var(--container-padding-lg);
   }
   @media (max-width: 768px) {
     .sectionWrapper {
       padding: var(--section-gap) 0;
     }
     .container {
       padding-inline: var(--container-padding);
     }
   }
   ```
2. **Standard Sub-Page Hero Banner (`PageHeader`):**
   - Dark surface (`#000000` / `--background`).
   - Category / breadcrumb eyebrow in `--secondary` (`font-family: var(--font-label); text-transform: uppercase; letter-spacing: 1.5px; font-size: var(--text-label)`).
   - Main H1 in `var(--font-display)` (`font-size: var(--text-hero); text-transform: uppercase; font-weight: bold; color: #ffffff`).
   - Lead paragraph in `var(--font-body)` (`color: var(--text-muted); max-width: 680px; line-height: 1.6`).
3. **Cross-Page Shared Components:**
   - `PageHeader` (`src/components/PageHeader/`): Unified dark top banner with eyebrow, H1, and description.
   - `CtaSection` (`src/components/CtaSection/`): Site-wide conversion banner mounted at the bottom of pages before the footer.
   - `Footer` (`src/components/Footer/`): Site-wide footer with semantic landmarks and localized links.
   - `ButtonLink` (`src/components/ButtonLink/`): Action buttons (`primary` amber / `secondary` white outline).
4. **Navbar Link Routing:**
   - Update dummy `href={""}` links in `Navbar.tsx` to dynamic localized paths: `/${lang}/projects`, `/${lang}/services`, `/${lang}/about`, and `/${lang}/contact`.

---

### B. Sub-Page Specifications

#### 1. Services (`/[lang]/services`)
- **Route:** `src/app/[lang]/services/page.tsx`
- **Section Flow & Visual Contrast:**
  1. `PageHeader` (Dark `#000000`): Eyebrow "TECHNICAL DISCIPLINES & CAPABILITIES", H1 "ENGINEERED FOR EXTREMES", climate narrative.
  2. `DisciplinesDetail` (Light `#f2f0f0`): 4 full-width discipline cards (Residential, Commercial, Infrastructure, Industrial) with technical schematics/icons, capability lists with checkmarks, and service-life metrics (e.g. "75+ Yrs Design Life").
  3. `CapabilitiesGrid` (Light Grey `#e2e2e2`): 6-card grid of competencies (Seismic/Wind Tunnel Simulation, High-Salinity Marine Foundations, MEP & Thermal Envelope, Digital Twinning/BIM, Value Engineering, Regional Permitting).
  4. `StandardsBar` (Dark `#121414`): Compliance codes (Saudi Building Code SBC, Eurocodes, ASTM, LEED Gold, Estidama).
  5. `CtaSection` (Dark `#000000`): Project feasibility & consultation CTA.
- **Content Dictionary Key:** `servicesPage` in `en.json` and `ar.json`.

#### 2. Projects (`/[lang]/projects`)
- **Route:** `src/app/[lang]/projects/page.tsx`
- **Section Flow & Visual Contrast:**
  1. `PageHeader` (Dark `#000000`): Eyebrow "PORTFOLIO & SIGNATURE WORKS", H1 "LANDMARKS ACROSS THE ARABIAN GULF".
  2. `ProjectsFilter` (Light `#f2f0f0` / Sticky): Client Component filter tabs (`[All]`, `[Residential]`, `[Commercial]`, `[Infrastructure]`, `[Industrial]`) with accessible `role="tablist"` / `aria-selected` and project count indicator.
  3. `ProjectsGrid` (Light `#f2f0f0`): 2- or 3-column brutalist card grid with 1px black borders, 16:10 aspect ratio image containers, monospaced metadata ("DOHA, QATAR | 2024"), title, scope description, tag cluster, and key technical metric chips (e.g. "Height: 240m", "Span: 620m").
  4. `PortfolioStats` (Dark `#121414`): High-contrast delivery metrics (2M+ SQM Delivered, 100% Safety Compliance, 4 Jurisdictions, $1.8B+ Engineered Assets).
  5. `CtaSection` (Dark `#000000`): Inquire about a custom build.
- **Content Dictionary Key:** `projectsPage` in `en.json` and `ar.json`.

#### 3. About (`/[lang]/about`)
- **Route:** `src/app/[lang]/about/page.tsx`
- **Section Flow & Visual Contrast:**
  1. `PageHeader` (Dark `#000000`): Eyebrow "OUR HERITAGE & MISSION", H1 "QUARTER-CENTURY OF STRUCTURAL MASTERY".
  2. `AboutValues` (Light `#f2f0f0`): 3-column value pillars with Roman numerals (01. Technical Diligence, 02. Climate Resilience, 03. Zero-Defect Delivery) and amber accent rules.
  3. `MilestonesTimeline` (Light Grey `#e2e2e2`): Sequential engineering timeline (1999 Inception in Riyadh, 2008 Regional Gulf Expansion, 2018 BIM Level 3, 2024 150th Major Landmark).
  4. `LeadershipGrid` (Dark `#121414`): Executive technical principals with monochrome portraits/placeholders, professional registrations (PE, CEng, FICE), and credentials.
  5. `AccreditationStrip` (Light `#f2f0f0`): Certification badges (ISO 9001, ISO 14001, ISO 45001, AIA).
  6. `CtaSection` (Dark `#000000`).
- **Content Dictionary Key:** `aboutPage` in `en.json` and `ar.json`.

#### 4. Contact (`/[lang]/contact`)
- **Route:** `src/app/[lang]/contact/page.tsx`
- **Section Flow & Visual Contrast:**
  1. `PageHeader` (Dark `#000000`): Eyebrow "PROJECT INQUIRY & CONSULTATION", H1 "START A TECHNICAL DIALOGUE", 24-hour turnaround commitment.
  2. `SplitContactSection` (Light `#f2f0f0`):
     - **Left Column (60%):** `ContactForm` (Client component) with accessible `<label htmlFor>`, `aria-required`, inputs with crisp 1px borders (Full Name, Company, Email, Phone, Project Sector select dropdown, Scope & Location textarea), and full-width amber submit button.
     - **Right Column (40%):** Direct Channels card with central technical dispatch email, RFP submission line, direct phone, and GMT+3 operating hours.
  3. `OfficeLocationsGrid` (Light Grey `#e2e2e2`): 4 regional office cards with 1px black borders (Riyadh HQ, Abu Dhabi, Doha, Muscat) displaying physical addresses, local direct lines, and emails.
  4. `FaqAccordion` (Light `#f2f0f0`): 4 pre-consultation technical FAQs (RFP documentation requirements, feasibility timelines, on-site PMC supervision, regional permitting processes).
- **Content Dictionary Key:** `contactPage` in `en.json` and `ar.json`.

---

### C. Implementation Checklist for AI Agents
1. **Content First:** Always add the new page dictionary slice (`servicesPage`, `projectsPage`, `aboutPage`, `contactPage`) to both `src/lib/content/en.json` and `src/lib/content/ar.json` simultaneously with identical key hierarchies.
2. **Logical Properties Discipline:** Never use physical `left`, `right`, `margin-left`, `margin-right`, `padding-left`, or `padding-right`. Use `margin-inline-*`, `padding-inline-*`, `border-inline-*`, and `inset-inline-*`.
3. **Component Separation:** Maintain server components as default. Only mark client interactive elements (`BurgerMenu`, `ContactForm`, `ProjectsFilter`, `FaqAccordion`) with `"use client"`.
4. **Accessibility First:** Ensure form fields have visible `<label>` bindings, interactive buttons have explicit focus rings, and tablists/accordions follow ARIA patterns.
5. **Strict Content Props Pattern:** Section components must strictly take `{ content: SpecificContent }`. Never split or duplicate dictionary fields into individual top-level props on the component props interface.
6. **Zero Hardcoded Copy:** 100% of user-facing UI text, subheadings, labels, checklist titles, and button strings must be defined in the content dictionaries (`en.json` & `ar.json`). Never leave static English strings inside component markup.

