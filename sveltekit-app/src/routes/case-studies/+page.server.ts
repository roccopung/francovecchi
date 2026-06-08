import { caseStudiesQuery } from "$lib/sanity/queries";
import type { CaseStudiesQueryResult } from "$lib/sanity.types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery<CaseStudiesQueryResult>(caseStudiesQuery);

  return {
    query: caseStudiesQuery,
    options: { initial },
  };
};
