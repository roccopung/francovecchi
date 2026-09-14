import { defineType, defineField } from "sanity";
import { FaceHappyIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const character = defineType({
  name: "character",
  type: "document",
  icon: FaceHappyIcon,
  fields: [
    orderRankField({
      type: "character",
      newItemPosition: "before",
    }),
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
