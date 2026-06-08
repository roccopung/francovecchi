import { homeQuery } from "$lib/sanity/queries";
import type { HomeQueryResult } from "$lib/sanity.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery<HomeQueryResult>(homeQuery);

  const characters = initial.data?.characters ?? [];
  const featuredCharacters = [...characters]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return {
    query: homeQuery,
    options: { initial },
    featuredCharacters,
  };
};
