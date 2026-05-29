import { defineType, defineField } from "sanity";

export const media = defineType({
  name: "media",
  title: "Media",
  type: "object",
  validation: (rule) =>
    rule.custom((fields) => {
      const hasImage =
        fields?.elementImage && Object.keys(fields.elementImage).length > 0;
      const hasVideo =
        fields?.elementVideo && Object.keys(fields.elementVideo).length > 0;

      if (hasImage && hasVideo) {
        return {
          message:
            "You can't have both an image and a video. Please choose one.",
          path: ["elementVideo"],
        };
      }

      if (!hasImage && !hasVideo) {
        return "You must provide either an image or a video.";
      }

      return true;
    }),
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
