# /new-schema

Scaffold a new Sanity schema type following project conventions.

## Instructions

Ask the user for:
1. **Schema kind** — `singleton` (one-per-site document), `document` (multi-instance list), or `object` (reusable field type)
2. **Name** (e.g. `team`, `faq`, `testimonial`) — camelCase, becomes filename and type name
3. **Fields** — list of fields with names and types

Then generate the schema file and remind the user to register it.

---

## Singleton (`schemas/singletons/[name].ts`)

```ts
import { defineField, defineType } from "sanity";
import { SomeIcon } from "@sanity/icons";

export const [name] = defineType({
  name: "[name]",
  title: "[Title]",
  type: "document",
  icon: SomeIcon,
  fields: [
    defineField({
      name: "fieldName",
      title: "Field Title",
      type: "string",
    }),
    // additional fields
  ],
  preview: {
    prepare() {
      return { title: "[Title]" };
    },
  },
});
```

**After generating, also update:**
1. `schemas/index.ts` — add to `schemaTypes` array
2. `structure/index.js` — add `S.documentTypeListItem("[name]")` entry with `documentId("[name]")`

---

## Document (`schemas/documents/[name].ts`)

Multi-instance document type — appears as a browsable list in the studio desk. Use for content with multiple entries (e.g. posts, projects, team members).

```ts
import { defineField, defineType } from "sanity";
import { SomeIcon } from "@sanity/icons";

export const [name] = defineType({
  name: "[name]",
  title: "[Title]",
  type: "document",
  icon: SomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    // additional fields
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title: title ?? "Untitled" };
    },
  },
});
```

**After generating, also update:**
1. `schemas/index.ts` — add to `schemaTypes` array
2. `structure/index.js` — add `S.documentTypeListItem("[name]").title("[Title]")` (no fixed `documentId`)

---

## Object (`schemas/objects/[name].ts` or `.tsx`)

Use `.tsx` if the schema needs a custom React annotation component. Otherwise use `.ts`.

```ts
import { defineField, defineType } from "sanity";

export const [name] = defineType({
  name: "[name]",
  title: "[Title]",
  type: "object",
  fields: [
    defineField({
      name: "fieldName",
      title: "Field Title",
      type: "string",
    }),
    // additional fields
  ],
});
```

**After generating, also update:**
1. `schemas/index.ts` — add to `schemaTypes` array
2. Reference from parent schema fields where needed

---

## After all schemas are created — run TypeGen

Once all schemas for this session are created and registered, regenerate Sanity types:

```bash
cd studio && npx sanity schema extract && npx sanity typegen generate
```

Output lands at `sveltekit-app/src/lib/sanity.types.ts` (auto-detected by all components via `$lib`). **Never edit this file manually.**

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

## Conventions to follow
- Type name = filename (camelCase)
- Named export matches type name: `export const [name] = defineType(...)`
- Always use `defineField()` wrapper for every field
- Singletons: `preview.prepare()` returns a fixed title (no `select` needed — one instance only)
- Documents: `preview.select` maps data fields; `prepare()` should handle missing values with a fallback
- Singleton vs document: singleton uses a fixed `documentId` in desk structure; document uses a list with no `documentId`
- Use `@sanity/icons` for icons — pick semantically appropriate ones
- Link annotation schemas: `.tsx` extension, `link` prefix in name (`linkExternal`, `linkInternal`)
