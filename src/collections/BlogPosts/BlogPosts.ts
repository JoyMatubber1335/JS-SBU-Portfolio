/* eslint-disable @typescript-eslint/no-explicit-any */
import { slugField } from '@/fields/slug'
import { populatePublishedDate } from '@/hooks/populatePublishedDate'

export const BlogPosts: any = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    ...slugField(),
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Technology',
          value: 'technology',
        },
        {
          label: 'Business',
          value: 'business',
        },
        {
          label: 'Design',
          value: 'design',
        },
        {
          label: 'Development',
          value: 'development',
        },
        {
          label: 'News',
          value: 'news',
        },
      ],
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      filterOptions: ({ id }: any) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
  ],
}
