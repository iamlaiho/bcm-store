# Ba Chor Mee Order Form Implementation Plan

**Date:** 2026-03-28
**Goal:** Build a two-page Ba Chor Mee order form app — full customization on `/`, animated confirmation on `/order/confirmation`.

**Architecture:** Order state flows via URL search params. No server, no global store.

**Tech Stack:** Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui, Inter font, pnpm

---

## File Map

| File                                      | Action | Responsibility                                                                       |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `src/lib/order.ts`                        | Create | Types, `serializeOrder`, `parseOrder`, `DEFAULT_ORDER`, `PRICES`                     |
| `src/app/globals.css`                     | Modify | Light theme, keyframes (steam, bowl-pop, progress-fill, header-pop, bowl-bounce)     |
| `src/app/layout.tsx`                      | Modify | Inter font via `next/font/google`                                                    |
| `src/components/ui/slider.tsx`            | Modify | Replace `@base-ui/react/slider` with native `<input type="range">` (React 19 compat) |
| `src/components/bowl-illustration.tsx`    | Create | `'use client'` 300×300 SVG bowl reacting to `Order` prop                             |
| `src/components/noodle-type-selector.tsx` | Create | `'use client'` 3 pill buttons                                                        |
| `src/components/spice-slider.tsx`         | Create | `'use client'` 3 pill buttons (1/2/3)                                                |
| `src/components/addons-grid.tsx`          | Create | `'use client'` 2-column chip grid                                                    |
| `src/components/order-form.tsx`           | Create | `'use client'` responsive split layout + sticky footer                               |
| `src/app/page.tsx`                        | Modify | Server Component — renders `<OrderForm />`                                           |
| `src/components/order-summary.tsx`        | Create | `'use client'` animated receipt card                                                 |
| `src/app/order/confirmation/page.tsx`     | Create | Server Component — reads `searchParams`, renders `<OrderSummary />`                  |

---

## Task 1: Install shadcn/ui and add components

- [x] Initialize shadcn (Default style, Zinc base, CSS variables)
- [x] Add components: `button card slider checkbox badge separator switch`
- [x] Verify type-check passes

---

## Task 2: Apply light theme with Inter font

- [x] Add Inter font via `next/font/google` with `--font-sans` CSS variable
- [x] Light slate/orange palette (no dark tokens)
- [x] Add keyframes: `steam-rise`, `bowl-pop`, `progress-fill`, `header-pop`, `bowl-bounce`
- [x] Replace `src/components/ui/slider.tsx` with native `<input type="range">` (same `value[]`/`onValueChange` API) — `@base-ui/react/slider` renders a `<script>` tag rejected by React 19

---

## Task 3: Order data model (`src/lib/order.ts`)

- [x] Types: `NoodleType`, `Style`, `Size`, `Addon`, `Order`
- [x] `DEFAULT_ORDER`: spice defaults to `1`
- [x] `serializeOrder` / `parseOrder`: spice validated as 1–3
- [x] `PRICES` constant

---

## Task 4: Sub-components

### NoodleTypeSelector

- [x] 3 pill buttons in a row
- [x] Selected: `border-orange-500 bg-orange-500 text-white`

### SpiceSlider (pill buttons, not a slider)

- [x] 3 buttons labeled "1", "2", "3"
- [x] Same pill style as noodle/size/style selectors

### AddonsGrid

- [x] 2-column chip grid
- [x] Selected: `border-orange-400 bg-orange-50 text-orange-800`
- [x] Orange checkbox: `data-[checked]:bg-orange-500` (base-ui uses `data-checked`, not `data-[state=checked]`)

---

## Task 5: Bowl illustration (`src/components/bowl-illustration.tsx`)

- [x] 300×300 SVG (matches viewBox — avoids fixed-size overflow on mobile)
- [x] Two nested wrappers: outer for size scale, inner (`ref`) for pop animation (must be separate)
- [x] Transparent bowl body, white panel background
- [x] Broth: `translateY(72px)` for dry, `translateY(0)` for soup, 0.7s transition
- [x] Noodle groups per type (bee-hoon uses `#d4b896`/`#c9a87a`, not white)
- [x] 6 add-on topping groups with opacity transitions
- [x] Spice oil: 0.18 opacity at level 2, 0.36 at level 3
- [x] Steam paths with staggered `.steam` CSS animation

---

## Task 6: Order form (`src/components/order-form.tsx`)

- [x] Responsive layout: vertical stack on mobile, 65/35 split on `md+`
- [x] Mobile bowl strip: `h-72` (288px) — enough to show full 300px SVG
- [x] All controls use uniform pill button style
- [x] Dry/Soup: 2 pill buttons (not a Switch component)
- [x] Form fields in scrollable inner div (`overflow-y-auto`)
- [x] "CONFIRM" button in sticky footer (`border-t` + fixed padding)

---

## Task 7: Confirmation page

- [x] `order-summary.tsx`: light receipt card, 3 chili icons for spice, orange badges, progress bar
- [x] "Order Again": plain `<Link>` as rounded border button, `py-4 text-sm`
- [x] Server Component reads `searchParams`, redirects to `/` on invalid params

---

## Done

All tasks complete. Two-page BCM order form with responsive layout, animated SVG bowl, and receipt confirmation.
