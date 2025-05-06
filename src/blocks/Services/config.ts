import type { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'key', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'links',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // optional, if you want images
        },
      ],
    },
  ],
}
