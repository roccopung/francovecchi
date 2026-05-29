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
              subtitle: "columnSpan.input",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title ? String(title) : "Image",
                subtitle: subtitle ? String(subtitle) : "",
                media: media,
              };
            },
          },
        },
      ],
      options: {
        layout: "list",
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
