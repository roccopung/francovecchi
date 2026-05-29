import { defineType, defineField } from "sanity";
import { DatabaseIcon } from "@sanity/icons";

export const service = defineType({
  name: "service",
  type: "document",
  icon: DatabaseIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      cover: "cover",
    },
    prepare({ title, cover }) {
      return {
        title,
        media: cover,
      };
    },
  },
});
