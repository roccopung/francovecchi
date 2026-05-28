import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const cta = defineField({
  title: "CTA",
  name: "cta",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "ctaType",
      title: "CTA Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Link", value: "linkInternal" },
          { title: "External Link", value: "linkExternal" },
          { title: "Email Link", value: "linkEmail" },
          { title: "Popup", value: "popup" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "linkInternal",
      type: "linkInternal",
      title: "Internal Link",
      hidden: ({ parent }) => parent?.ctaType !== "linkInternal",
      options: {
        collapsible: false,
      },
    }),
    defineField({
      name: "linkExternal",
      type: "linkExternal",
      title: "External Link",
      hidden: ({ parent }) => parent?.ctaType !== "linkExternal",
      options: {
        collapsible: false,
      },
    }),
    defineField({
      name: "linkEmail",
      type: "linkEmail",
      title: "Email Link",
      hidden: ({ parent }) => parent?.ctaType !== "linkEmail",
      options: {
        collapsible: false,
      },
    }),
  ],
  preview: {
    select: {
      title: "ctaType",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
