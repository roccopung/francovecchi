import { defineField, defineType } from "sanity";
import { EarthGlobeIcon, CogIcon } from "@sanity/icons";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "social",
      type: "array",
      of: [{ type: "linkExternal" }],
    }),
  ],
});
