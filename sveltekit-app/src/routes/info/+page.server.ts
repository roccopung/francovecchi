import { aboutQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery(aboutQuery);

  return {
    query: aboutQuery,
    options: { initial },
  };
};
