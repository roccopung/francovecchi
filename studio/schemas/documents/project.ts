import { defineType, defineField } from "sanity";
import { DashboardIcon } from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const project = defineType({
  name: "project",
  type: "document",
  icon: DashboardIcon,
  groups: [
    {
      name: "overview-thumbnail",
      title: "Overview Thumbnail",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({
      type: "project",
      newItemPosition: "before",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "isNda",
      title: "NDA / password protected",
      description:
        "Protect this project's page behind a password. In listings only the title shows — the cover is replaced by a color block.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "password",
      type: "string",
      description:
        "Password required to view this project. Stored as plain text — anyone with Studio access can read it.",
      hidden: ({ parent }) => !parent?.isNda,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isNda?: boolean };
          if (parent?.isNda && !value)
            return "Password is required for NDA projects";
          return true;
        }),
    }),
    defineField({
      name: "years",
      type: "string",
    }),
    defineField({
      name: "cover",
      type: "elementImage",
      description: "Displayed in the Project page",
    }),
    defineField({
      name: "description",
      description: "Displayed in the Project page",
      type: "blockContent",
    }),
    defineField({
      name: "collaboration",
      type: "object",
      fields: [
        defineField({
          name: "title",
          type: "string",
          placeholder: "In collaboration with",
          initialValue: "In collaboration with",
        }),
        defineField({
          name: "description",
          type: "blockContent",
        }),
      ],
    }),
    defineField({
      name: "services",
      type: "array",
      group: "overview-thumbnail",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "pageBuilder",
      type: "pageBuilder",
    }),
    defineField({
      name: "result",
      type: "object",
      fields: [
        defineField({
          name: "content",
          type: "blockContent",
        }),
        defineField({
          name: "media",
          type: "media",
        }),
      ],
    }),
    defineField({
      name: "credits",
      type: "array",
      of: [
        defineField({
          name: "credit",
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
            }),
            defineField({
              name: "name",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "name",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      cover: "cover",
    },
    prepare({ title, cover }) {
      return {
        title,
        media: cover,
      };
    },
  },
});
