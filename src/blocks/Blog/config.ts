import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Blog: Block = {
  slug: 'blog',
  fields: [
    {
      name: 'blogItems',
      label: 'Blog Items',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'date',
          type: 'date',
          required: false,
        },
        {
          name: 'author',
          type: 'text',
          required: false,
        },
        link({ appearances: false }),
      ],
    },
  ],
}
