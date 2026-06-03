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
    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
