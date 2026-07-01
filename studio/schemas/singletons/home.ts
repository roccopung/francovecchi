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
      description: "Add a Lottie .json file",
      type: "file",
    }),
    defineField({
      name: "cover",
      type: "media",
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),
    defineField({
      name: "featuredProjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
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
          name: "cta",
          type: "cta",
        }),
        defineField({
          name: "animation",
          description: "Add a Lottie .json file",
          type: "file",
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
        defineField({
          name: "logosTwo",
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
      name: "endingBlock",
      type: "object",
      fields: [
        defineField({
          name: "animation",
          description: "Add a Lottie .json file",
          type: "file",
        }),
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
          name: "description",
          type: "blockContent",
        }),
        defineField({
          name: "cta",
          type: "cta",
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
