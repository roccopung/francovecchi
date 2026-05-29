import { InfoOutlineIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const info = defineField({
  name: "info",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      content: "content",
    },
    prepare({ title, content }) {
      const firstBlockText = content[0].children[0].text;
      return {
        title,
        subtitle: firstBlockText,
      };
    },
  },
});
