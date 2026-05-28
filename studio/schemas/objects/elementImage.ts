import {defineType} from 'sanity'

export const elementImage = defineType({
  name: 'elementImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    // mobileImage
    {
      name: 'hasMobile',
      title: 'Does the image change for mobile?',
      type: 'boolean',
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      hidden: ({parent}) => parent?.hasMobile !== true,
    },
  ],
  preview: {
    select: {
      media: 'asset',
    },
  },
})
