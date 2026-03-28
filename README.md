# bcm-store

A simple form app built entirely by Claude, used to explore what Claude Code can do end-to-end.

## Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **pnpm**
- **ESLint 9** + **Prettier**
- **Husky** + **lint-staged** + **commitlint** (Conventional Commits)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Description                  |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start dev server             |
| `pnpm build`      | Production build             |
| `pnpm start`      | Serve production build       |
| `pnpm lint`       | Run ESLint                   |
| `pnpm format`     | Run Prettier on all files    |
| `pnpm type-check` | Run TypeScript type checking |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored. Never commit real secrets.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). The `commit-msg` hook will reject non-conforming messages.

```
feat: add dark mode
fix: correct layout shift on mobile
chore: update dependencies
docs: update README
```
