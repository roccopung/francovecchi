import { projectQuery, projectAccessQuery } from "$lib/sanity/queries";
import type { ProjectQueryResult } from "$lib/sanity.types";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

type AccessResult = {
  title: string | null;
  isNda: boolean | null;
  password: string | null;
} | null;

const cookieName = (slug: string) => `nda_${slug}`;

export const load: PageServerLoad = async ({
  params,
  locals: { sanity },
  cookies,
}) => {
  const { loadQuery } = sanity;
  const { slug } = params;

  const access = await loadQuery<AccessResult>(projectAccessQuery, { slug });
  const project = access.data;

  // Gate NDA projects: no valid cookie => never load or return the content.
  if (project?.isNda && cookies.get(cookieName(slug)) !== project.password) {
    return {
      locked: true,
      slug,
      title: project.title,
      projectIndexes: project.projectIndexes,
      firstProject: project.firstProject,
      next: project.next,
    };
  }

  const initial = await loadQuery<ProjectQueryResult>(projectQuery, { slug });

  return {
    query: projectQuery,
    options: { initial },
    params: { slug },
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals: { sanity }, cookies }) => {
    const { slug } = params;
    const form = await request.formData();
    const password = form.get("password");

    const access = await sanity.loadQuery<AccessResult>(projectAccessQuery, {
      slug,
    });
    const project = access.data;

    if (!project?.isNda) throw redirect(303, `/case-studies/${slug}`);

    if (typeof password !== "string" || password !== project.password) {
      return fail(401, { incorrect: true });
    }

    cookies.set(cookieName(slug), project.password, {
      httpOnly: true,
      sameSite: "lax",
      path: `/case-studies/${slug}`,
      maxAge: 60 * 60 * 24 * 30,
    });

    throw redirect(303, `/case-studies/${slug}`);
  },
};
