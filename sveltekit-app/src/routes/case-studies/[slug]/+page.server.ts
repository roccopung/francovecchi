import { projectQuery } from "$lib/sanity/queries";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ params, locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const { slug } = params;
  const initial = await loadQuery(projectQuery, { slug });

  return {
    options: { initial },
    params: { slug },
  };
};
