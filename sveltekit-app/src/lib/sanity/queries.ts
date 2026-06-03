import { defineQuery } from "@sanity/sveltekit";

export const homeQuery = defineQuery(`*[_type == "home"][0] {
  ...,
  featuredProjects[]->{
  title,
  slug,
  coverImages,
  services[]->{
  title
  },
  shortSummary
  }
  }`);

export const aboutQuery = defineQuery(`*[_type == "about"][0]`);
