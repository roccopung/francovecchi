import { infoQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";
import type { InfoQueryResult } from "$lib/sanity.types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery<InfoQueryResult>(infoQuery);

  return {
    query: infoQuery,
    options: { initial },
  };
};
