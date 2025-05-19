import type { CollectionConfig } from 'payload/types'
import { slugField } from '@/fields/slug'
import { populatePublishedDate } from '@/hooks/populatePublishedDate'

export const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
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
      defaultValue: 'About Us',
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
      name: 'aboutCompany',
      type: 'group',
      label: 'About JS SBU',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'About JS SBU',
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Image',
        },
      ],
    },
    {
      name: 'visionMission',
      type: 'group',
      label: 'Our Vision & Mission',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Our Vision & Mission',
        },
        {
          name: 'vision',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Our Vision',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          name: 'mission',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Our Mission',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'team',
      type: 'group',
      label: 'Our Team',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Our Team',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'members',
          type: 'array',
          label: 'Team Members',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
              required: true,
            },
            {
              name: 'bio',
              type: 'textarea',
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                {
                  name: 'linkedin',
                  label: 'LinkedIn URL',
                  type: 'text',
                },
                {
                  name: 'twitter',
                  label: 'Twitter URL',
                  type: 'text',
                },
                {
                  name: 'github',
                  label: 'GitHub URL',
                  type: 'text',
                },
                {
                  name: 'website',
                  label: 'Personal Website',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} 