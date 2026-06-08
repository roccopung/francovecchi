# /check-types

Audit and fix TypeScript errors in this SvelteKit + Sanity monorepo.

## Model allocation

| Role | Model |
|---|---|
| Diagnostics, categorisation, planning fixes | **Sonnet** (current — you) |
| Executing file edits in parallel | **Haiku** — spawn via `Agent({ model: "haiku", ... })` |

Sonnet reads errors, decides what to change and where, then hands off the mechanical edits to one or more Haiku agents running in parallel. Haiku agents receive precise instructions (exact file, exact pattern to apply) — they do not analyse or decide.

---

## Step 1 — Run diagnostics first

```bash
cd sveltekit-app && npx svelte-check --tsconfig ./tsconfig.json 2>&1 | grep -E "ERROR|error" | head -60
```

**If no errors → report "No TypeScript errors found." and stop. Do not run TypeGen.**

If errors exist, categorise every one before touching any file:

| Error pattern | Fix |
|---|---|
| `Cannot find module '@sanity/client'` | `pnpm add -D @sanity/client --filter sveltekit-app` |
| `Cannot find module './$types'` | Stale `.svelte-kit` — delete and restart dev |
| Type name does not exist in `$lib/sanity.types` | Run TypeGen (Step 2), then migrate (Step 3) |
| `QueryResponseInitial<unknown>` in `useQuery` | Add generic to `loadQuery` in server file (Pattern A) |
| `null` not assignable to `undefined` in component prop | Add `\| null` to the prop type (Pattern E) |
| `toHTML` / `PortableText` receives `null \| undefined` | Use `data ?? []` at the call (Pattern F) |
| Anything else structural or unfamiliar | **Stop and ask the user before proceeding** |

---

## Step 2 — Regenerate Sanity types (only if needed)

Run TypeGen from the studio workspace **only when Step 1 reveals missing or stale types**:

```bash
cd studio && npx sanity schema extract && npx sanity typegen generate
```

Output lands at `sveltekit-app/src/lib/sanity.types.ts`. **Never edit this file manually.**

Clean up the build artifact:
```bash
rm studio/schema.json
```

Ensure `schema.json` is in `studio/.gitignore`:
```
# TypeGen artifacts
schema.json
```

---

## Step 3 — Plan all fixes (Sonnet), then execute in parallel (Haiku)

Once every error is categorised, write out the complete fix list before touching any file. Then spawn one Haiku agent per independent file or small group of related files, all in a single message so they run in parallel.

Example agent prompt structure:
> "Edit `src/routes/case-studies/+page.server.ts`. Add `import type { CaseStudiesQueryResult } from '$lib/sanity.types';` and change `loadQuery(caseStudiesQuery)` to `loadQuery<CaseStudiesQueryResult>(caseStudiesQuery)`. No other changes."

Keep each Haiku prompt self-contained: file path, exact old pattern, exact new pattern. Do not ask Haiku to analyse or decide.

### Pattern A — `+page.server.ts`: type the `loadQuery` call

```ts
// Before
const initial = await loadQuery(homeQuery);

// After
import type { HomeQueryResult } from "$lib/sanity.types";
const initial = await loadQuery<HomeQueryResult>(homeQuery);
```

Convention: `homeQuery` → `HomeQueryResult`, `aboutQuery` → `AboutQueryResult`, etc.

Always ensure `query: <queryVar>` is included in the `return` object — `useQuery` requires it.

### Pattern B — `+page.svelte`: use generated type and `PageData`

```ts
// Before
import type { HomePage } from "$lib/types";
let { data }: any = $props();
let query = $derived(useQuery<{ home: HomePage }>(data));

// After
import type { HomeQueryResult } from "$lib/sanity.types";
import type { PageData } from "./$types";
let { data }: { data: PageData } = $props();
let query = $derived(useQuery<HomeQueryResult>(data));
```

### Pattern C — Components: derive types from generated base

```ts
// Before
import type { PageBuilderSection } from "$lib/types";

// After
import type { PageBuilder } from "$lib/sanity.types";
type PageBuilderSection = NonNullable<PageBuilder["sections"]>[number];
```

When a discriminant cast is needed after `.filter()`:
```ts
type SectionType = PageBuilderSection["_type"];
componentMap[section._type as SectionType]()
```

Do not re-declare a type already declared in `<script module>` inside `<script>` — TypeGen concatenates both blocks and will report a duplicate identifier error.

### Pattern D — `{#each}` keys

Generated types include `_key` on array items. Always use it:
```svelte
{#each items as item (item._key)}
```

### Pattern E — Nullable component props

Generated Sanity types use `T | null` for optional fields (GROQ returns `null`, not `undefined`). Update component prop types to match:

```ts
// Before
type Props = { coverImages?: { one?: ElementImage }; services?: any[] };

// After
type Props = { coverImages?: { one?: ElementImage } | null; services?: any[] | null };
```

For optional chaining on nullable slugs: use `slug?.current` not `slug.current`.

### Pattern F — PortableText / toHTML with null

`toHTML` from `@portabletext/to-html` does not accept `null | undefined`. Guard at the call site:

```ts
// In PortableText.svelte
{@html toHTML(data ?? [], { components })}
// And accept null in the prop type:
interface Props { data?: PortableTextBlock[] | null; }
```

---

## Step 4 — Stale `.svelte-kit` recovery

If errors mention missing `$types` or `proxy+*.server.ts` files:

```bash
rm -rf sveltekit-app/.svelte-kit
# restart dev — svelte-kit sync regenerates all proxy files
```

---

## Stop conditions — ask the user before continuing if:

- The error is not covered by any pattern above
- The fix would require changing more than 3 files in a non-mechanical way
- A type mismatch persists after the fix and the root cause is unclear
- You are considering a cast (`as`) that isn't one of the documented patterns
