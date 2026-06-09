import { defineQuery } from "@sanity/sveltekit";

export const homeQuery = defineQuery(`{
  "home": *[_type == "home"][0] {
    ...,
    featuredProjects[]->{
      title,
      slug,
      cover,
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

export const infoQuery = defineQuery(`*[_type == "about"][0]`);

export const caseStudiesQuery = defineQuery(
  `*[_type == "project"]{
  title,
  slug,
  coverImages,
  services[]->{
  title
  },
  shortSummary
  }`,
);

export const lookbookQuery = defineQuery(`*[_type == "lookbook"][0]`);

export const projectQuery = defineQuery(
  `*[_type == "project" && defined(slug.current) && slug.current == $slug][0] {
  ...,
  services[]->,
  "next": *[_type == "project" && defined(slug.current) && orderRank > ^.orderRank] | order(orderRank asc)[0]{
  "orderRank": ^.orderRank,
    title,
    slug,
    cover
  },
  "firstProject": *[_type == "project" && defined(slug.current)]| order(orderRank asc)[0]{
    title,
    slug,
    cover
  },
  "projectIndexes": *[_type == "project"] | order(orderRank asc) {
    slug
  }
  }`,
);

export const layoutQuery = defineQuery(`{
  "settings": *[_type == "settings"][0],
  "caseStudies": *[_type == "project"]{
  slug
  }
}`);
