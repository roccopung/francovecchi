import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Seo",
  type: "object",
  description:
    "SEO settings for the page, used for Google search and social media",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "You can replicate the document title. If possible, keep the title shorter than 50–60 characters",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Aim for between 120 and 158 characters.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Recommended dimensions: 1200 x 1200 or 1200 x 630",
    }),
  ],
});
