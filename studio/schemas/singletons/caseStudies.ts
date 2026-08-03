import { defineField, defineType } from "sanity";

export const caseStudies = defineType({
  name: "caseStudies",
  title: "Case Studies",
  type: "document",
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
      name: "seo",
      title: 'SEO',
      type: "seo",
      group: "seo",
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
