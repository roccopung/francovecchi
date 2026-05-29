import { defineType, defineField } from "sanity";
import { ImageIcon, ImagesIcon } from "@sanity/icons";

export const stackedGallery = defineType({
  name: "stackedGallery",
  title: "Stacked Gallery",
  icon: ImagesIcon,
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Gallery Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "itemImage",
          title: "Image",
          icon: ImageIcon,
          fields: [
            {
              name: "columnSpan",
              type: "columnSpan",
            },
            { name: "image", type: "elementImage" },
          ],
          preview: {
            select: {
              title: "image.alt",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title ? String(title) : "Image",
                media: media,
              };
            },
          },
        },
      ],
      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items = [] }) {
      return {
        title: `Stacked Gallery: ${items?.length || 0} image(s)`,
      };
    },
  },
});
