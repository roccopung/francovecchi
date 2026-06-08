/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || "",
  deployment: { autoUpdates: true, appId: "s0mtoxpejffh1rly4mhtgyhf" },
  typegen: {
    path: "../sveltekit-app/src/**/*.{ts,svelte}",
    generates: "../sveltekit-app/src/lib/sanity.types.ts",
  },
});
