import { defineQuery } from "@sanity/sveltekit";

export const homeQuery = defineQuery(`*[_type == "home"][0] {
  ...,
  gallery {
    items[] {
      "url": asset->url,
      caption
    }
  }
  }`);

export const aboutQuery = defineQuery(`*[_type == "about"][0]`);
