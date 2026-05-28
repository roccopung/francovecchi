import {defineType} from 'sanity'

export const elementVideo = defineType({
  name: 'elementVideo',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      description: 'Optional poster image for the video',
    },
    {
      name: 'url',
      title: 'Video Url',
      type: 'url',
    },
    // mobileVideo
    {
      name: 'hasMobile',
      title: 'Does the video change for mobile?',
      type: 'boolean',
    },
    {
      name: 'mobileVideo',
      title: 'Mobile Video',
      type: 'object',
      hidden: ({parent}) => parent?.hasMobile !== true,
      fields: [
        {
          name: 'poster',
          title: 'Poster',
          type: 'image',
          description: 'Optional poster image for the video',
        },
        {
          name: 'url',
          title: 'Video Url',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'poster',
    },
    prepare({media}) {
      return {
        media,
      }
    },
  },
})
