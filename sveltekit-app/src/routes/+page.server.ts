import { homeQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery(homeQuery);

  // We pass the data in a format that is easy for `useQuery` to consume in the
  // corresponding `+page.svelte` file, but you can return the data in any
  // format you like.
  return {
    query: homeQuery,
    options: { initial },
  };
};
