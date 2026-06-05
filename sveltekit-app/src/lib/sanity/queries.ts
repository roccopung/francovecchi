import { defineQuery } from "@sanity/sveltekit";

export const homeQuery = defineQuery(`{
  "home": *[_type == "home"][0] {
    ...,
    featuredProjects[]->{
      title,
      slug,
      coverImages,
      services[]->{
      title
      },
      shortSummary
    },
    clientsSection {
      ...,
      logos[]{
      asset->
      }
    }
  },
  "characters": *[_type == "character"]
}
`);

export const aboutQuery = defineQuery(`*[_type == "about"][0]`);

export const layoutQuery = defineQuery(`{
  "settings": *[_type == "settings"][0],
  "caseStudies": *[_type == "project"]{
  slug
  }
}`);
