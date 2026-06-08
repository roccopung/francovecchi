import { lookbookQuery } from "$lib/sanity/queries";
import type { LookbookQueryResult } from "$lib/sanity.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery<LookbookQueryResult>(lookbookQuery);

  return {
    query: lookbookQuery,
    options: { initial },
  };
};
