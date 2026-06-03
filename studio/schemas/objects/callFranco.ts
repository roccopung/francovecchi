import { defineField, defineType } from "sanity";

export const callFranco = defineType({
  name: "callFranco",
  title: "Call Franco",
  type: "object",
  fields: [
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
