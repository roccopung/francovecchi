import { defineType, defineField } from "sanity";

export const media = defineType({
  name: "media",
  title: "Media",
  description:
    "Pick either an image or a video. If both are present, the component will not show",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "elementImage",
    }),
    defineField({
      name: "video",
      type: "elementVideo",
    }),
  ],
});
