import type { Block } from 'payload'

export const AboutUs: Block = {
  slug: 'aboutus',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      minRows: 3,
      fields: [ {
        name: 'icon',
        type: 'upload',
        relationTo: 'media', // or your media collection name
        required: true,
      },],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
