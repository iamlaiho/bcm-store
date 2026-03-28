# Ba Chor Mee Order Form — Design Spec

**Date:** 2026-03-28
**Status:** Approved

---

## Overview

A two-page Next.js 16 app that lets users order Ba Chor Mee with full customization, then shows an animated order confirmation. Built with shadcn/ui, Tailwind CSS v4, Inter font, and a lively light slate/orange aesthetic with an animated SVG bowl illustration.

---

## Pages

### 1. Order Form — `/`

**File:** `src/app/page.tsx` (Server Component wrapper)
**File:** `src/components/order-form.tsx` (`'use client'`)

The server component page renders `<OrderForm />`. The client component manages controlled state and on submit serializes the order to URL search params, then calls `router.push('/order/confirmation?...')`.

### 2. Confirmation — `/order/confirmation`

**File:** `src/app/order/confirmation/page.tsx` (Server Component)

Receives `searchParams: Promise<Record<string, string | string[] | undefined>>` as a prop, awaits it, calls `parseOrder()`, and either renders `<OrderSummary order={order} />` or calls `redirect('/')` from `next/navigation` directly in the async server component body.

---

## Data Flow

Order state is passed between pages via URL search params — stateless, refresh-safe, and shareable. No server, no global store.

**Params schema:**

- `noodle` — `"mee-pok" | "mee-kia" | "bee-hoon"`
- `style` — `"dry" | "soup"`
- `size` — `"small" | "medium" | "large"`
- `spice` — `"1" | "2" | "3"` (string in URL, coerced to `number` by `parseOrder`)
- `addons` — comma-separated string of zero or more: `"lard" | "chili" | "vinegar" | "fishballs" | "egg" | "ribs"`. Empty string → empty array.

---

## Shared Module

### `src/lib/order.ts`

**Types:**

```ts
export type NoodleType = 'mee-pok' | 'mee-kia' | 'bee-hoon'
export type Style = 'dry' | 'soup'
export type Size = 'small' | 'medium' | 'large'
export type Addon = 'lard' | 'chili' | 'vinegar' | 'fishballs' | 'egg' | 'ribs'

export interface Order {
  noodle: NoodleType
  style: Style
  size: Size
  spice: number // 1–3
  addons: Addon[]
}
```

**Functions:**

- `serializeOrder(order: Order): URLSearchParams` — converts all fields to string params; `addons` joined with `,`.
- `parseOrder(params: Record<string, string | string[] | undefined>): Order | null` — validates all five required fields. `spice` must be 1–3. Returns `null` if any field is missing or invalid.

**Constants:**

```ts
export const DEFAULT_ORDER: Order = {
  noodle: 'mee-pok',
  style: 'dry',
  size: 'medium',
  spice: 1,
  addons: [],
}

export const PRICES: Record<Size, number> = {
  small: 3,
  medium: 4,
  large: 5,
}
```

---

## Visual Theme

**Font:** Inter (Google Fonts via `next/font/google`, `--font-sans` CSS variable)

**Color palette:** Light slate/orange

- Background: white / `slate-50`
- Text: `slate-900`, `slate-600`, `slate-400`
- Accent: `orange-500` (selected states, CTA button, price labels)
- Borders: `slate-200`
- Spice: `red-500` (filled), `opacity-20` (empty)

---

## UI Components (shadcn)

| Component   | Used in                             |
| ----------- | ----------------------------------- |
| `Button`    | Form submit CTA                     |
| `Card`      | Confirmation receipt container      |
| `Checkbox`  | Add-ons grid                        |
| `Badge`     | Add-on display on confirmation page |
| `Separator` | Confirmation receipt dividers       |

**Note on Slider:** `@base-ui/react/slider` renders an inline `<script>` tag in `SliderThumb` causing a React 19 hydration error. `src/components/ui/slider.tsx` is replaced with a native `<input type="range">` implementation. Spice level uses pill buttons, not a slider.

**Note on Button height:** shadcn `Button` default size sets `h-8` (fixed height), preventing `py-*` from working. Use `h-auto` in className to override.

**Note on Checkbox data attributes:** `@base-ui/react` uses `data-checked`, not `data-[state=checked]`. Tailwind variants must use `data-[checked]:`.

---

## Layout — Responsive Split

**Desktop (`md+`):** Full-viewport horizontal split

- Left (65%) — `BowlIllustration`, white background
- Right (35%) — form panel on `slate-50` with scrollable fields and sticky footer button

**Mobile (< `md`):** Vertical stack

- Top — bowl illustration strip, `h-72` (288px)
- Bottom — scrollable form fields + "CONFIRM" pinned to bottom

```tsx
<div className="flex h-screen flex-col overflow-hidden md:flex-row">
  <div className="h-72 flex-shrink-0 md:h-auto md:w-[65%]"> {/* bowl */} </div>
  <div className="flex flex-1 flex-col overflow-hidden border-t ... md:border-l md:border-t-0">
    <div className="flex flex-1 flex-col gap-[14px] overflow-y-auto px-6 py-6">
      {' '}
      {/* fields */}{' '}
    </div>
    <div className="border-t border-slate-200 px-6 py-4">
      {' '}
      {/* sticky button */}{' '}
    </div>
  </div>
</div>
```

---

## Bowl Illustration (`src/components/bowl-illustration.tsx`)

A `'use client'` component rendering a 300×300 SVG bowl that responds to every field of the `Order` prop.

### Structure

Two nested wrappers around the SVG:

1. **Outer div** — applies `transform: scale()` for size (small=0.78, medium=1.0, large=1.18)
2. **Inner div** (`ref={wrapRef}`) — target for the `bowl-pop` CSS animation on noodle/add-on changes

These must be separate: the pop animation resets `transform`, overriding size scale if on the same element.

### Bowl anatomy (SVG layers, bottom to top)

1. **Shadow** — ellipse below bowl
2. **Broth** — `<g>` with `translateY()` transition: soup=0, dry=72px
3. **Bowl body** — `fill="transparent"`, grey outline stroke only
4. **Noodle strands** — one group per type, opacity 0/1:
   - Mee Pok: thick wavy amber paths
   - Mee Kia: thin springy yellow paths
   - Bee Hoon: warm tan paths (`#d4b896`, `#c9a87a`)
5. **Toppings** — 6 groups with opacity transitions:
   - lard: cream ellipses; chili: red ellipses; vinegar: dark `#1c0a00` pools
   - fishballs: white circles; egg: amber ellipses; ribs: dark brown rects
6. **Spice oil** — 3 red circles: opacity 0.18 at level 2, 0.36 at level 3
7. **Steam** — 3 SVG paths with `.steam` CSS class, staggered delays

---

## Order Form UI (`/`)

All controls share the same pill button style: `rounded-full border-[1.5px] py-[7px] text-[11px] font-bold`. Selected: `border-orange-500 bg-orange-500 text-white`. Unselected: `border-slate-200 bg-white text-slate-600`.

1. **Noodle Type** — 3 pill buttons in a row
2. **Style** — 2 pill buttons: Dry / Soup
3. **Size** — 3 pill buttons: Small ($3) / Medium ($4) / Large ($5)
4. **Spice Level** — 3 pill buttons: 1 / 2 / 3
5. **Add-ons** — 2-column chip grid. Selected: `border-orange-400 bg-orange-50 text-orange-800`. Orange checkbox via `data-[checked]:bg-orange-500`.
6. **Submit** — Sticky footer. "CONFIRM". `h-auto py-4 rounded-full bg-orange-500`.

---

## Confirmation UI (`/order/confirmation`)

1. **Animated header** — "ORDER RECEIVED!" with `animate-header-pop`. 🎉 below.
2. **Receipt card** — `border-slate-200 bg-white font-mono`: dish name, size + price (orange), spice as 3 chili icons, add-on badges.
3. **Wait time** — "~8 mins" with `from-orange-400 to-red-500` progress bar filling over 8s via `requestAnimationFrame`.
4. **"Order Again"** — plain `<Link>` styled as rounded border button, `py-4 text-sm`.

---

## Error Handling

- Confirmation page: `parseOrder(await searchParams)` returning `null` → `redirect('/')` in Server Component.
- All fields initialised to `DEFAULT_ORDER` so submission always produces valid params.

---

## File Structure

```
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx                    # Inter font
│   ├── globals.css                   # Tailwind v4 + keyframes
│   └── order/confirmation/page.tsx
├── components/
│   ├── bowl-illustration.tsx         # animated SVG bowl
│   ├── order-form.tsx                # responsive split layout + sticky footer
│   ├── noodle-type-selector.tsx
│   ├── spice-slider.tsx              # 3 pill buttons (1/2/3)
│   ├── addons-grid.tsx
│   └── order-summary.tsx
└── lib/
    └── order.ts
```

---

## Constraints

- No backend — fully client-side
- No external images — CSS/SVG/emoji only
- Next.js 16 App Router, TypeScript strict mode, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- Tailwind CSS v4 (CSS-based config, `@import "tailwindcss"`, tokens in `@theme {}`)
