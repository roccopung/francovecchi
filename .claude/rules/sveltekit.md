---
paths:
  - "sveltekit-app/**/*"
---

# SvelteKit App Conventions

## Naming Conventions

| What | Convention | Examples |
|------|-----------|---------|
| Components | PascalCase | `Modal.svelte`, `SEO.svelte` |
| Component subdirs | lowercase by domain | `element/`, `seo/` |
| TS/JS modules | camelCase | `client.ts`, `queries.ts` |
| Server-only modules | `.server.ts` suffix | `api.server.ts`, `client.server.ts` |
| Route folders | lowercase / kebab-case | `about/`, `sitemap.xml/` |
| Route files | SvelteKit conventions | `+page.svelte`, `+layout.server.ts`, `+server.js` |
| CSS files | kebab-case | `main.css`, `theme.css` |
| Directories | lowercase | `components/`, `sanity/`, `utils/` |

## CSS Architecture

Tailwind CSS v4 with the Vite plugin (not PostCSS plugin). Entry point is `src/assets/css/main.css`, imported in `+layout.svelte`.

- `theme.css` — design tokens via `@theme`: fonts, typography scales, colors, spacing, durations
- `utilities.css` — custom `@utility` classes: grid shortcuts (`grid-12` through `grid-2`), `typo-base`, `transition-fast/medium/slow`
- `cookie-banner.css` — cookie consent styles

Component styles use `<style>` blocks (scoped) or `<style lang="postcss">`.

## Svelte 5 Patterns

Runes used throughout: `$props()`, `$derived()`, `$state()`, `$bindable()`, `$effect()`, `{@render children()}` (snippet replacement for slots).

## Data Loading Pattern

**Server-side (`+page.server.ts`):**
```ts
export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery(homeQuery);
  return { query: homeQuery, options: { initial } };
};
```

**Client-side (`+page.svelte`):**
```ts
let { data } = $props();
let query = $derived(useQuery(data));
let page = $derived($query.data);
```

`loadQuery()` fetches on the server for SSR. `useQuery()` subscribes to live updates when preview mode is active.

## Environment Variables

**Public (client + server) — `PUBLIC_` prefix, accessed via `$env/static/public`:**
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SANITY_STUDIO_URL`

**Private (server only), accessed via `$env/static/private`:**
- `SANITY_API_VIEWER_TOKEN`

Validated with `assertEnvVar()` in `src/lib/sanity/api.ts`.
