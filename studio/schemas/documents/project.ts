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
      name: "isHighlighted",
      description: "Is this project highlighted in the Case Studies page?",
      type: "boolean",
    }),
    defineField({
      name: "years",
      type: "string",
    }),
    defineField({
      name: "coverImages",
      type: "object",
      description: "Displayed in the Thumbnail Overview only",
      group: "overview-thumbnail",
      fields: [
        defineField({
          name: "one",
          type: "elementImage",
        }),
        defineField({
          name: "two",
          type: "elementImage",
        }),
      ],
    }),
    defineField({
      name: "shortSummary",
      description: "Displayed in the Thumbnail Overview only",
      type: "blockContent",
      group: "overview-thumbnail",
    }),
    defineField({
      name: "cover",
      type: "elementImage",
      description: "Displayed in the Project page",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Displayed in the Project page",
      type: "blockContent",
    }),
    defineField({
      name: "description",
      description: "Displayed in the Project page",
      type: "blockContent",
    }),
    defineField({
      name: "services",
      type: "array",
      group: "overview-thumbnail",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "problem",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      type: "blockContent",
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
