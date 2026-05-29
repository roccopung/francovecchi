import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "portrait",
      type: "elementImage",
    }),
    defineField({
      name: "intro",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          type: "blockContent",
        }),
        defineField({
          name: "content",
          type: "blockContent",
        }),
        defineField({
          name: "earlyCareer",
          type: "blockContent",
        }),
        defineField({
          name: "workExperience",
          type: "blockContent",
        }),
        defineField({
          name: "cta",
          type: "cta",
        }),
      ],
    }),
    defineField({
      name: "collaborations",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          type: "blockContent",
        }),
        defineField({
          name: "content",
          type: "blockContent",
        }),
        defineField({
          name: "brands",
          type: "array",
          of: [
            defineField({
              name: "brand",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "agencies",
          type: "array",
          of: [
            defineField({
              name: "agency",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "animation",
          description: "Add a Lottie .json file",
          type: "file",
        }),
      ],
    }),
    defineField({
      name: "hobbies",
      type: "array",
      of: [
        defineField({
          name: "hobby",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "skillsSection",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          type: "blockContent",
        }),
        defineField({
          name: "content",
          type: "blockContent",
        }),
        defineField({
          name: "skills",
          type: "array",
          of: [
            defineField({
              name: "skill",
              type: "info",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reviewsSection",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          type: "blockContent",
        }),
        defineField({
          name: "content",
          type: "blockContent",
        }),
        defineField({
          name: "reviews",
          type: "array",
          of: [
            defineField({
              name: "review",
              type: "object",
              fields: [
                defineField({
                  name: "author",
                  type: "string",
                }),
                defineField({
                  name: "companyRole",
                  type: "string",
                }),
                defineField({
                  name: "content",
                  type: "blockContent",
                }),
              ],
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
        title: "About",
      };
    },
  },
});
