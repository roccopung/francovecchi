# /new-page

Scaffold a new SvelteKit route connected to Sanity CMS following project conventions.

## Instructions

Ask the user for:
1. **Route name** (e.g. `blog`, `contact`, `work`) — becomes the folder name under `src/routes/`
2. **Sanity document type** — the `_type` to query (usually matches the route name)
3. **Fields to fetch** — what GROQ projection to use (or ask them to describe the schema)

Then generate:

### `src/routes/[route]/+page.server.ts`
```ts
import { [routeQuery] } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery([routeQuery]);
  return { query: [routeQuery], options: { initial } };
};
```

### `src/routes/[route]/+page.svelte`
```svelte
<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
</script>

<SEO />

<main class="px-3 py-12">
  <!-- page content here -->
</main>
```

### `src/lib/sanity/queries.ts` — append new query
```ts
export const [routeQuery] = defineQuery(`*[_type == "[docType]"][0] {
  // fields
}`);
```

## Conventions to follow
- Query variable name: `[route]Query` (camelCase)
- Add `SEO` component with fallback empty strings
- Use `$derived` for all reactive values derived from query data
- Do NOT add `// @ts-nocheck` if types are available
- Route folder name: lowercase kebab-case
