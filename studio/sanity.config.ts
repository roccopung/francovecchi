// saniy core
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
// plugins
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset = process.env.SANITY_STUDIO_DATASET!;

export default defineConfig({
  name: "francovecchi",
  title: "Franco Vecchi",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin:
          process.env.NODE_ENV == "production"
            ? process.env.SANITY_STUDIO_PREVIEW_URL
            : "http://localhost:5173",
        previewMode: {
          enable: "/preview/enable",
          disable: "/preview/disable",
        },
      },
    }),
    media(),
    ...(process.env.NODE_ENV == "development" ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
  },
});
