import { defineQuery } from "@sanity/sveltekit";
import { seo } from "./fragments/seo";

export const homeQuery = defineQuery(`{
  "home": *[_type == "home"][0] {
    ...,
    featuredProjects[]->{
      title,
      slug,
      isNda,
      cover,
      services[]->{ title },
    },
    clientsSection {
      ...,
      logos[]{
      ...,
      asset->
      }
    },
    ${seo}
  },
  "characters": *[_type == "character"]
}
`);

export const infoQuery = defineQuery(`{
  "info": *[_type == "about"][0] {
  ...,
  ${seo}
  },
  "characters": *[_type == "character"]
  }`);

export const caseStudiesQuery = defineQuery(
  `
  {"caseStudiesPage": *[_type == "caseStudies"][0] {
  ...,
  ${seo}
  },
  "projects": *[_type == "project"] | order(orderRank asc) {
  title,
  slug,
  isNda,
  cover,
  services[]->{ title },
  }}`,
);

export const projectAccessQuery = defineQuery(
  `*[_type == "project" && defined(slug.current) && slug.current == $slug][0]{
  title,
  "firstProject": *[_type == "project" && defined(slug.current)]| order(orderRank asc)[0]{
    title,
    slug,
    isNda,
    cover
  },
  "projectIndexes": *[_type == "project"] | order(orderRank asc) {
    slug
  },
  "next": *[_type == "project" && defined(slug.current) && orderRank > ^.orderRank] | order(orderRank asc)[0]{
  "orderRank": ^.orderRank,
    title,
    slug,
    isNda,
    cover
  },
  isNda,
  password
  }`,
);

export const lookbookQuery = defineQuery(`*[_type == "lookbook"][0]`);

export const projectQuery = defineQuery(
  `*[_type == "project" && defined(slug.current) && slug.current == $slug][0] {
  ...,
  "password": null,
  services[]->,
  "next": *[_type == "project" && defined(slug.current) && orderRank > ^.orderRank] | order(orderRank asc)[0]{
  "orderRank": ^.orderRank,
    title,
    slug,
    isNda,
    cover
  },
  "firstProject": *[_type == "project" && defined(slug.current)]| order(orderRank asc)[0]{
    title,
    slug,
    isNda,
    cover
  },
  "projectIndexes": *[_type == "project"] | order(orderRank asc) {
    slug
  },
  ${seo}
  }`,
);

export const layoutQuery = defineQuery(`{
  "settings": *[_type == "settings"][0],
  "caseStudies": *[_type == "project"]{
  slug
  }
}`);
