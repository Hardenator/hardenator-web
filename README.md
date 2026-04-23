# hardenator-web

Marketing site + dashboard for [Hardenator](https://hardenator.com) — the security OS for AI-generated code.

## What's here

- `app/page.tsx` — the landing page (hero, stats, how-it-works, rules, pricing, manifesto quote, waitlist CTA, footer)
- `app/waitlist-form.tsx` — client component with form state + API call
- `app/api/waitlist/route.ts` — Route Handler: accepts `{email, ref}`, assigns rank, fires welcome + admin emails via Resend
- `app/layout.tsx` — root layout, loads Fraunces + Inter Tight + JetBrains Mono via `next/font`
- `app/globals.css` — the full brand system (colors, type, sections, components). Brutalist editorial, hazard stripes, grain overlay.

## Local dev

```bash
npm install
npm run dev
```

http://localhost:3000

## Build

```bash
npm run build
```

## Environment variables

Set on Vercel (`vercel env add`) or in `.env.local` for dev:

| Key | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Sends welcome + admin emails via Resend | No — if missing, `/api/waitlist` still works, just logs to console |
| `RESEND_FROM_EMAIL` | Sender address (default `hello@hardenator.com`) | No |

Until the paid tier ships (Week 3), signups are tracked in Vercel Functions logs. Morning Lingesh should wire up Resend + Neon/KV before traffic spikes.

## Deployment

Linked to Vercel Pro (account `lingesh389`). Production branch: `main`. Deploys via `vercel --prod`.

## Brand system

**Colors (CSS variables in `globals.css`):** `--ink #0C0C0C`, `--paper #F4F1EA`, `--hazard #F5C518`, `--danger #E63946`, `--safe #2A9D8F`, `--fog #1A1A1A`, `--whisper #8F8B7E`.

**Fonts:** Fraunces (display), Inter Tight (body), JetBrains Mono (code).

**Aesthetic:** brutalist editorial. Sharp edges, 2px borders, offset shadows, hazard-stripe motifs, subtle grain. No soft SaaS gradients. No neon terminal. No Inter-by-itself.

## Related repos (not yet created)

- `hardenator-rules` — OSS Semgrep rule library (MIT), Week 1
- `hardenator-cli` — `@hardenator/cli` npm package, Week 1
- `hardenator-claude-code` — Claude Code plugin, Week 2
- `hardenator-github-app` — Probot auto-PR bot, Week 3
