---
description: UI styling must use Tailwind CSS and shadcn/ui only. No other styling or component libraries. Exceptions for SVG illustrations and dynamic computed values.
paths:
  - '**/*.tsx'
---

All UI must be styled with **Tailwind CSS utility classes** and **shadcn/ui components** only.

- Do not use inline `style` props, CSS modules, styled-components, or any other styling mechanism for static visual values.
- Tailwind arbitrary values (`text-[11px]`, `py-[7px]`, `border-[1.5px]`) are valid Tailwind syntax and are allowed.
- Do not hardcode raw hex colour values in `style` props or outside Tailwind (e.g. `style={{ color: '#ff0000' }}` is a violation; `text-[#ff0000]` as a Tailwind class is acceptable).
- Do not install additional component libraries (e.g. Radix standalone, MUI, Chakra, Headless UI) — shadcn already wraps the primitives we need.
- Use `@theme {}` in `globals.css` for recurring design tokens. Prefer named Tailwind tokens over arbitrary values when a value is reused across many components.
- When a shadcn component does not exist, build from plain HTML elements + Tailwind — do not reach for another library.

**Exception — illustrations:** SVG illustrations (e.g. `bowl-illustration.tsx`) may use inline `style` props and raw SVG attributes where Tailwind cannot express the required visual (e.g. animated `transform`, `stopColor`, `strokeWidth`). This exception applies only to illustrative/decorative SVG, not to layout or interactive UI.

**Exception — dynamic computed values:** Utility components that compute visual state at runtime (e.g. a range slider's progress track width or thumb position) may use inline `style` for values that cannot be expressed as static Tailwind classes. Prefer CSS custom properties over direct property values where possible.
