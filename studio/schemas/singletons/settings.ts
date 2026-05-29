import { defineField, defineType } from "sanity";
import { EarthGlobeIcon, CogIcon } from "@sanity/icons";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [{ title: "Footer", name: "footer" }],
  fieldsets: [
    {
      name: "footer",
      title: "Footer",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "animationTop",
      type: "lottie",
      group: "footer",
      fieldset: "footer",
    }),
    defineField({
      name: "animationBottom",
      type: "lottie",
      group: "footer",
      fieldset: "footer",
    }),
    defineField({
      name: "email",
      type: "email",
    }),
    defineField({
      name: "phone",
      type: "string",
    }),
    defineField({
      name: "social",
      type: "array",
      of: [{ type: "linkExternal" }],
    }),
  ],
});
