import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "content",
      type: "blockContent",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About",
      };
    },
  },
});
