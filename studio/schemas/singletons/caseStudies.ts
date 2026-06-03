import { defineField, defineType } from "sanity";

export const caseStudies = defineType({
  name: "caseStudies",
  title: "Case Studies",
  type: "document",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Case Studies",
      };
    },
  },
});
