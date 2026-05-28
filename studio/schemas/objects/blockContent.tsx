import { defineArrayMember, defineType, defineField } from "sanity";

export const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        decorators: [{ title: "Italic", value: "em" }],
        annotations: [
          {
            name: "linkEmail",
            type: "linkEmail",
          },
          {
            name: "linkExternal",
            type: "linkExternal",
          },
        ],
      },
    }),
  ],
});
