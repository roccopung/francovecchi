import { projectQuery } from "$lib/sanity/queries";
import type { ProjectQueryResult } from "$lib/sanity.types";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ params, locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const { slug } = params;
  const initial = await loadQuery<ProjectQueryResult>(projectQuery, { slug });

  return {
    query: projectQuery,
    options: { initial },
    params: { slug },
  };
};
