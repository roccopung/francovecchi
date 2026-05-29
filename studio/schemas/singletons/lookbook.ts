import { defineField, defineType } from "sanity";
import { InlineIcon } from "@sanity/icons";

export const lookbook = defineType({
  name: "lookbook",
  title: "Look Book",
  type: "document",
  icon: InlineIcon,
  fields: [
    defineField({
      name: "stackedGallery",
      type: "stackedGallery",
    }),
    defineField({
      name: "callFranco",
      type: "callFranco",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Look Book",
      };
    },
  },
});
