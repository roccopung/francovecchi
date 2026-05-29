import { defineField, defineType } from "sanity";

export const callFranco = defineType({
  name: "callFranco",
  title: "Call Franco",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "You can replicate the document title. If possible, keep the title shorter than 50–60 characters",
    }),
    defineField({
      name: "content",
      type: "blockContent",
    }),
    defineField({
      name: "cta",
      type: "cta",
    }),
  ],
});
