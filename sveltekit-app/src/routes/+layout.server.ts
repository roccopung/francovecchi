import type { LayoutServerLoad } from "./$types";
import { layoutQuery } from "$lib/sanity/queries";

// +layout.server.ts
export const load: LayoutServerLoad = async (event) => {
  const { previewEnabled, loadQuery } = event.locals.sanity;
  const settings = await loadQuery(layoutQuery);

  return { previewEnabled, settings };
};
