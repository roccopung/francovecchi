import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import { StackedGalleryInput } from "../components/StackedGalleryInput";
import { IMAGES_COL_SPAN } from "../../constants";

export const columnSpan = defineType({
  name: "columnSpan",
  title: "Column Span",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "input",
      type: "string",
      options: {
        list: IMAGES_COL_SPAN,
        layout: "radio",
        direction: "horizontal",
      },
      components: { input: StackedGalleryInput },
    }),
  ],
});
