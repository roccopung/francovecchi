# CLAUDE.md

Reference for the SvelteKit + Sanity Studio monorepo stack. Use this to scaffold new projects with the same conventions.

---

## Monorepo Layout

```
/
├── sveltekit-app/       # SvelteKit frontend
├── studio/              # Sanity Studio (standalone)
├── package.json         # Root: pnpm workspaces, shared scripts
├── .claude
├── .mcp.json
```

**Package manager:** `pnpm` (workspaces)

**Root scripts:**
- `dev` — runs both workspaces concurrently via `concurrently`
- `postinstall` — runs `svelte-kit sync` in sveltekit-app

**Shared dev tooling (root devDependencies):**
- eslint + eslint-plugin-svelte + typescript-eslint
- prettier + prettier-plugin-svelte + prettier-plugin-packagejson
- @sanity/eslint-config-studio, @sanity/prettier-config

---

## SvelteKit App (`sveltekit-app/`)

### Folder Structure

```
sveltekit-app/
├── src/
│   ├── app.html                    # HTML shell
│   ├── app.d.ts                    # Global TS types
│   ├── hooks.server.ts             # Server hooks (Sanity preview + query loader)
│   ├── assets/
│   │   └── css/
│   │       ├── main.css            # Entry: imports tailwind, theme, utilities
│   │       ├── theme.css           # @theme vars, @font-face
│   │       ├── utilities.css       # Custom @utility classes
│   │       └── cookie-banner.css   # Cookie consent styles
│   ├── lib/
│   │   ├── components/             # UI components (PascalCase)
│   │   │   ├── Modal.svelte
│   │   │   ├── Menu.svelte
│   │   │   ├── element/            # Content-rendering components
│   │   │   │   └── PortableText.svelte
│   │   │   └── seo/
│   │   │       └── SEO.svelte
│   │   ├── sanity/                 # Sanity client & query layer
│   │   │   ├── api.ts              # Public env vars (projectId, dataset, apiVersion, studioUrl)
│   │   │   ├── api.server.ts       # Server-only env vars (token)
│   │   │   ├── client.ts           # Public client (CDN, stega)
│   │   │   ├── client.server.ts    # Server client (token, no CDN)
│   │   │   ├── image.ts            # urlFor() image URL builder
│   │   │   └── queries.ts          # GROQ queries via defineQuery()
│   │   └── utils/
│   │       ├── index.ts            # formatDate()
│   │       └── portabletext.ts     # HTML entity decoding
│   └── routes/
│       ├── +layout.svelte          # Root layout: CSS import, preview wrappers, Menu
│       ├── +layout.server.ts       # Exposes previewEnabled to client
│       ├── +page.svelte            # Home (gallery + modal)
│       ├── +page.server.ts         # Home data loader
│       ├── about/
│       │   ├── +page.svelte
│       │   └── +page.server.ts
│       ├── sitemap.xml/
│       │   └── +server.js          # Dynamic XML sitemap
│       └── robots.txt/
│           └── +server.js          # Environment-aware robots.txt
├── static/
│   ├── fonts/                      # Custom WOFF fonts
│   │   ├── Times_regular.woff
│   │   └── Times_italic.woff
│   ├── favicon.png / .svg / .ico
│   └── site-preferences.js         # Pre-app theme script
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── postcss.config.cjs
├── netlify.toml
└── .env
```

### Naming Conventions

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

### Key Packages

**Dependencies:**
| Package | Purpose |
|---------|---------|
| `tailwindcss` + `@tailwindcss/vite` | Tailwind CSS v4 with Vite plugin |
| `@sanity/image-url` | Image URL builder for Sanity assets |
| `embla-carousel-svelte` | Carousel/slider component |
| `@svelte-put/lockscroll` | Lock body scroll (modals) |
| `groq` | GROQ query validation |
| `@sveltejs/adapter-netlify` | Netlify deployment adapter |

**DevDependencies:**
| Package | Purpose |
|---------|---------|
| `svelte` ^5 | Svelte 5 with runes |
| `@sveltejs/kit` ^2 | SvelteKit framework |
| `@sanity/sveltekit` | Sanity integration (preview, visual editing, query loading) |
| `@portabletext/svelte` | Portable Text Svelte components |
| `@sanity/types` | Sanity TypeScript types |
| `vite` ^8 | Build tool |
| `typescript` ^5 | TypeScript compiler |
| `postcss` + `autoprefixer` | PostCSS processing |

### Config Files

**`svelte.config.js`** — adapter-netlify, vitePreprocess()
**`vite.config.ts`** — plugins: tailwindcss(), sveltekit()
**`tsconfig.json`** — extends .svelte-kit/tsconfig.json, strict mode, allowJs + checkJs
**`postcss.config.cjs`** — autoprefixer
**`netlify.toml`** — base: sveltekit-app, command: vite build

### CSS Architecture

Tailwind CSS v4 with the Vite plugin (not PostCSS plugin).

**`main.css`** is the entry point, imported in `+layout.svelte`:
```css
@import "tailwindcss";
@import "./theme.css";
@import "./utilities.css";
@import "./cookie-banner.css";
```

**`theme.css`** defines design tokens via `@theme`:
- Fonts: `--font-body` (custom Times via @font-face)
- Typography: `--text-base`, `--text-m-base` with line-heights
- Colors: `--color-white`, `--color-black`
- Spacing: `--spacing`, `--spacing-s`, `--spacing-m`, `--spacing-l`
- Durations: `--default-transition-duration`, `--duration-fast`

**`utilities.css`** defines custom `@utility` classes:
- Grid shortcuts: `grid-12` through `grid-2` (each applies grid + cols + gap)
- Typography: `typo-base` (responsive text size)
- Transitions: `transition-fast`, `transition-medium`, `transition-slow`

Component styles use `<style>` blocks (scoped) or `<style lang="postcss">`.

### Svelte 5 Patterns

Runes used throughout:
- `$props()` — component prop declarations
- `$derived()` — computed/reactive values
- `$state()` — local reactive state
- `$bindable()` — two-way bindable props
- `$effect()` — side effects
- `{@render children()}` — slot replacement via snippets

### Data Loading Pattern

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

### Environment Variables

**Public (client + server) — `PUBLIC_` prefix:**
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SANITY_STUDIO_URL`

**Private (server only):**
- `SANITY_API_VIEWER_TOKEN`

Accessed via `$env/static/public` and `$env/static/private`. Validated with `assertEnvVar()` in `api.ts`.

---

## Sanity Studio (`studio/`)

### Folder Structure

```
studio/
├── schemas/
│   ├── index.ts                    # Exports schemaTypes array
│   ├── singletons/                 # One-per-site document types
│   │   ├── home.ts
│   │   ├── about.ts
│   │   └── settings.ts
│   └── objects/                    # Reusable field types
│       ├── blockContent.tsx        # Rich text array definition
│       ├── elementImage.ts         # Image with hotspot + optional mobile variant
│       ├── elementVideo.ts         # Video with poster + optional mobile variant
│       ├── gallery.ts              # Mixed image/video array
│       ├── seo.ts                  # SEO metadata (title, description, image)
│       └── link/
│           ├── linkExternal.tsx    # External URL annotation
│           └── linkEmail.tsx       # Email link annotation
├── structure/
│   └── index.js                    # Custom desk structure
├── static/                         # Studio static assets
├── sanity.config.ts                # Studio config (plugins, schema)
├── sanity.cli.ts                   # CLI config
├── tsconfig.json
├── .env
└── package.json
```

### Naming Conventions

| What | Convention | Examples |
|------|-----------|---------|
| Singleton schemas | camelCase, type name = filename | `home.ts` -> type `"home"` |
| Object schemas | camelCase | `blockContent.tsx`, `elementImage.ts` |
| Link schemas | `link` prefix + camelCase | `linkExternal.tsx`, `linkEmail.tsx` |
| Schema exports | named export matching type name | `export const home = ...` |
| TSX files | used when schema has custom React components (annotations) |

### Schema Architecture

**Singletons (documents):**
- `home` — gallery field (carouselImages)
- `about` — content field (blockContent)
- `settings` — email, phone, social links array

**Objects:**
- `blockContent` — rich text with italic decorator, linkEmail + linkExternal annotations
- `elementImage` — image with hotspot, alt, optional mobile variant (hasMobile toggle)
- `elementVideo` — video url + poster, optional mobile variant
- `gallery` — mixed array of elementImage + elementVideo
- `seo` — title (50-60 chars), description (120-158 chars), OG image

**Link annotations:**
- `linkExternal` — url field (https/mailto/tel), custom annotation component with icon
- `linkEmail` — email field, custom annotation component with icon

### Desk Structure

Singleton pattern — each document type rendered as a single fixed document:

```
Content (root)
├── Home        (documentId: "home")
├── About       (documentId: "about")
├── ─────────── (divider)
└── Settings    (documentId: "settings")
```

### Plugins

| Plugin | Purpose |
|--------|---------|
| `structureTool` | Custom desk structure (singletons) |
| `presentationTool` | Visual editing with SvelteKit preview URLs |
| `media` (sanity-plugin-media) | Enhanced media library management |
| `visionTool` | GROQ query editor (dev only) |

### Key Packages

| Package | Purpose |
|---------|---------|
| `sanity` ^5.18 | Core Sanity framework |
| `@sanity/client` ^7 | Sanity API client |
| `@sanity/vision` ^5 | GROQ query tool |
| `@sanity/icons` ^3 | Icon library for schema definitions |
| `@sanity/ui` ^3 | UI component library |
| `@sanity/orderable-document-list` | Document ordering plugin |
| `sanity-plugin-media` ^4 | Media management plugin |
| `react` ^19 + `react-dom` ^19 | React runtime |
| `styled-components` ^6 | CSS-in-JS (Sanity UI dependency) |

### Environment Variables

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_PREVIEW_URL` (production frontend URL)
- `SANITY_STUDIO_STUDIO_HOST` (studio deployment URL)

---

## Integration: SvelteKit <-> Sanity

### Dual Client Pattern

```
api.ts          -> public env vars (projectId, dataset, apiVersion, studioUrl)
api.server.ts   -> server-only token

client.ts       -> createClient({ useCdn: true, stega: { studioUrl } })
client.server.ts -> client.withConfig({ token, useCdn: false, stega: true })
```

Public client uses CDN for fast reads. Server client uses token for authenticated access + draft content.

### Preview Mode

Setup in `hooks.server.ts` using `sequence()`:
1. `handlePreviewMode()` — sets up `/preview/enable` and `/preview/disable` endpoints, populates `event.locals.sanity`
2. `handleQueryLoader()` — provides `loadQuery()` on `event.locals.sanity`

Root layout wraps app with `<PreviewMode>` -> `<VisualEditing>` -> `<QueryLoader>`, all gated by `previewEnabled`.

Presentation tool in studio points to the SvelteKit frontend origin with these preview endpoints.

### Image Handling

```ts
// lib/sanity/image.ts
const builder = createImageUrlBuilder(client);
export function urlFor(source: Image) {
  return builder.image(source);
}

// Usage in components
src={urlFor(item.url).width(400).url()}
```

### Portable Text

Rendered via `@portabletext/to-html` with custom serializers in `PortableText.svelte`. Uses `{@html}` to render the output.

### GROQ Queries

Defined in `lib/sanity/queries.ts` using `defineQuery()` from `@sanity/sveltekit` for type safety:
```ts
export const homeQuery = defineQuery(`*[_type == "home"][0] { ... }`);
```

---

## Deployment

**Frontend:** Netlify via `@sveltejs/adapter-netlify`
- Config in `netlify.toml` (base: sveltekit-app)
- Environment-aware robots.txt (blocks non-production)
- Dynamic XML sitemap

**Studio:** Deployed separately via `sanity deploy`


-----------

## Core Interaction Principles

### 1. Challenge Incorrect Assumptions
**ALWAYS** contradict me when I:
- Make incorrect technical assumptions
- Propose solutions that violate official documentation
- Suggest approaches that go against best practices or library guidelines

Do not proceed with solutions you know to be flawed, even if I insist. Your job is to course-correct, not to validate errors.

---

### 2. Documentation-First Approach
Before implementing or suggesting code using ANY package, library, or framework:
1. Reference the official documentation
2. Verify the API/method signatures are current
3. Ensure the approach follows documented patterns

**Do not rely on training data or assumptions.** If documentation isn't available in context, say so and ask me to provide it.

---

### 3. One Solution at a Time
**NEVER** operate in "agent mode" where you:
- Try multiple solutions sequentially or iterate through fixes automatically unless the user prompted in "always allow", "don't ask", "accept edits", or "bypass permissions"  modes
- Generate alternative approaches unprompted

Instead:
- Present up to 3 solutions that prioritise clarity, simplicity and readability, to brainstorm with the user
- Wait for the user's feedback
- Then proceed with adjustments if needed

---

### 4. Improve Bad Code Patterns
If the user's existing code contains:
- Highly inefficient patterns
- Excessive redundancy
- Poor readability/maintainability

**You must suggest improvements.** Do not perpetuate bad practices just to match the user's style. Explain why the change improves the codebase.

---

### 5. Prioritize Simplicity Over Scale
**Context:** I work on small to medium-scale projects, where folder structure is fundamental but deep type-checking is not.

**Rules:**
- Do NOT create enterprise-level architectures unless prompted to do so
- Do NOT add abstraction layers "for future scaling" unless prompted to do so
- Do NOT introduce design patterns unless genuinely needed
- **ALWAYS** prioritise the solution that solves the immediate problem while keeping a severe methodic minimalism

**Hierarchy of values:**
1. Minimalism
2. Clarity
3. Simplicity
4. Maintainability
5. Robustness (only when actually required)

---

### 6. Avoid Overengineering Spirals
**Critical Rule:** Before suggesting complex solutions:

**STOP and ASK** if:
- The solution involves >50 lines of new code
- You're adding new abstractions, classes, or utilities
- The fix feels disproportionate to the problem
- You're working around an issue rather than fixing root cause

Instead:
- Ask clarifying questions about the actual error
- Request to see specific error messages or logs
- Propose we debug together to find the simple fix
- Consider if changing 1-2 lines could solve it

**Remember:** I may have made a small mistake that needs a small fix. Your instinct to "properly solve" things often creates unnecessary complexity.

---

### 7. Confidence-Based Responses
**Only provide solutions when you are confident they will work.**

If you're uncertain:
- Say so explicitly
- Explain what you're unsure about
- Suggest we brainstorm together
- Propose diagnostic steps to gather more information

**Never** adopt a "try this and see" approach without transparency.

---

### 8. Consequence of Non-Compliance
If you consistently ignore these guidelines, I will:
- Stop using AI assistance for development
- Return to simpler resources (documentation, Stack Overflow, human developers)
- Lose trust in your ability to understand project-appropriate solutions

**These principles exist because:**
- Overcomplication wastes the user's time
- Following the user's bad code wastes both our time
- Complex solutions for simple problems create technical debt
- I need a collaborative partner, not an auto-pilot

---

## Quick Reference

✅ **Do:**
- Challenge the user's mistakes
- Check documentation first
- Suggest one clear solution
- Improve bad patterns
- Keep it simple
- Ask questions before overengineering
- Admit uncertainty

❌ **Don't:**
- Validate wrong approaches
- Assume API behavior
- Provide multiple solutions unprompted
- Copy inefficient code patterns
- Overengineer for scale
- Create complex fixes for simple problems
- Guess when uncertain

---

## Response Format When Uncertain

When you need to stop and ask questions, use this format:
```
⚠️ Before I suggest a solution, I need to understand:

1. [Specific question about the error/requirement]
2. [Request for logs, error messages, or context]
3. [Clarification about constraints or goals]

This will help me give you a targeted, simple solution instead of overcomplicating things.
```

---

*Last Updated: March 2026*
*For use with: Claude Models and compatible LLMs*
