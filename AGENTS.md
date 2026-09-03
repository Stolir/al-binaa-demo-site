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

---

## 7. Conventions for Modifying or Adding Sections
- **Content First:** If creating a new section (e.g. Testimonials, Contact, About), first inspect and update `src/lib/content/en.json` and `src/lib/content/ar.json` with matching structures.
- **Props Typing:** Define explicit TypeScript types for the section's content in the component file (or `types.ts` if shared).
- **Styling Discipline:** Never use inline styles for layout. Rely on CSS classes defined in the component's `.module.css` leveraging `:root` design tokens.
