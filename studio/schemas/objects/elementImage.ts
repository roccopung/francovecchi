import { defineType, defineField } from "sanity";

export const elementImage = defineType({
  name: "elementImage",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          if ((context.parent as any)?.asset && !alt) {
            return "Alt text is recommended for accessibility";
          }
          return true;
        }).warning(),
    }),
    // mobileImage
    {
      name: "hasMobile",
      title: "Does the image change for mobile?",
      type: "boolean",
    },
    {
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      hidden: ({ parent }) => parent?.hasMobile !== true,
    },
  ],
  preview: {
    select: {
      media: "asset",
    },
  },
});
