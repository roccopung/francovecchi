import {defineType, defineField} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [{type: 'elementImage'}, {type: 'elementVideo'}],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items = []}) {
      return {
        title: `Gallery: ${items?.length || 0} item(s)`,
      }
    },
  },
})
