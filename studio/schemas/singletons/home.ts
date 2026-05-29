import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "pushingKeyframes",
      type: "lottie",
    }),
    defineField({
      name: "cover",
      type: "media",
    }),
    defineField({
      name: "heading",
      type: "blockContent",
    }),
    defineField({
      name: "aboutSection",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          type: "blockContent",
        }),
        defineField({
          name: "paragraphOne",
          type: "blockContent",
        }),
        defineField({
          name: "paragraphTwo",
          type: "blockContent",
        }),
        defineField({
          name: "animation",
          description: "Add a Lottie .json file",
          type: "lottie",
        }),
      ],
    }),
    defineField({
      name: "clientsSection",
      type: "object",
      fields: [
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          type: "blockContent",
        }),
        defineField({
          name: "logos",
          type: "array",
          of: [
            defineField({
              name: "logo",
              type: "image",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "callFranco",
      type: "callFranco",
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
