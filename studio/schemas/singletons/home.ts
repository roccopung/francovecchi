import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
      };
    },
  },
});
