import { defineType, defineField } from "sanity";
import { FaceHappyIcon } from "@sanity/icons";

export const character = defineType({
  name: "character",
  type: "document",
  icon: FaceHappyIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "cover",
      type: "elementImage",
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
