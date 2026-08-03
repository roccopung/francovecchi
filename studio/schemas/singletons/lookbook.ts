import { defineField, defineType } from "sanity";
import { InlineIcon } from "@sanity/icons";

export const lookbook = defineType({
  name: "lookbook",
  title: "Look Book",
  type: "document",
  icon: InlineIcon,
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "slug",
      type: "slug",
      readOnly: true,
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "stackedGallery",
      type: "stackedGallery",
    }),
    defineField({
      name: "callFranco",
      type: "callFranco",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Look Book",
      };
    },
  },
});
