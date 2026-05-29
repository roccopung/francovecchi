---
paths:
  - "studio/**/*"
---

# Sanity Studio Conventions

## Naming Conventions

| What | Convention | Examples |
|------|-----------|---------|
| Singleton schemas | camelCase, type name = filename | `home.ts` → type `"home"` |
| Object schemas | camelCase | `blockContent.tsx`, `elementImage.ts` |
| Link schemas | `link` prefix + camelCase | `linkExternal.tsx`, `linkEmail.tsx` |
| Schema exports | named export matching type name | `export const home = ...` |
| TSX files | used when schema has custom React components (annotations) | |

## Schema Architecture

**Singletons (`schemas/singletons/`):**
- `home` — gallery field (carouselImages)
- `about` — content field (blockContent)
- `settings` — email, phone, social links array

**Objects (`schemas/objects/`):**
- `blockContent` — rich text with italic decorator, linkEmail + linkExternal annotations
- `elementImage` — image with hotspot, alt, optional mobile variant (hasMobile toggle)
- `elementVideo` — video url + poster, optional mobile variant
- `gallery` — mixed array of elementImage + elementVideo
- `seo` — title (50-60 chars), description (120-158 chars), OG image

**Link annotations (`schemas/objects/link/`):**
- `linkExternal` — url field (https/mailto/tel), custom annotation component with icon
- `linkEmail` — email field, custom annotation component with icon
- `linkInternal` — internal reference, custom annotation component with icon

## Desk Structure

Singleton pattern — each document rendered as a single fixed document:

```
Content (root)
├── Home        (documentId: "home")
├── About       (documentId: "about")
├── ─────────── (divider)
└── Settings    (documentId: "settings")
```

## Plugins

| Plugin | Purpose |
|--------|---------|
| `structureTool` | Custom desk structure (singletons) |
| `presentationTool` | Visual editing with SvelteKit preview URLs |
| `media` (sanity-plugin-media) | Enhanced media library management |
| `visionTool` | GROQ query editor (dev only) |

## Environment Variables

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_PREVIEW_URL` (production frontend URL)
- `SANITY_STUDIO_STUDIO_HOST` (studio deployment URL)
