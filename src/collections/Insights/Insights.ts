import type { CollectionConfig } from 'payload';

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Tech Blog',
          value: 'blog',
        },
        {
          label: 'Tutorial',
          value: 'tutorial',
        },
      ],
      required: true,
      defaultValue: 'blog',
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
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => data.type === 'blog',
      },
    },
    {
      name: 'contentType',
      type: 'radio',
      options: [
        {
          label: 'External Blog Link',
          value: 'external',
        },
        {
          label: 'Internal Content',
          value: 'internal',
        },
      ],
      defaultValue: 'internal',
      admin: {
        condition: (data) => data.type === 'blog',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      admin: {
        condition: (data) => data.type === 'blog' && data.contentType === 'external',
      },
    },
    {
      name: 'videoType',
      type: 'radio',
      options: [
        {
          label: 'Upload Video',
          value: 'upload',
        },
        {
          label: 'Embed Video (YouTube, Vimeo, etc.)',
          value: 'embed',
        },
      ],
      defaultValue: 'embed',
      admin: {
        condition: (data) => data.type === 'tutorial',
      },
    },
    {
      name: 'videoEmbed',
      type: 'text',
      label: 'Video URL (YouTube, Vimeo, etc.)',
      admin: {
        condition: (data) => data.type === 'tutorial' && data.videoType === 'embed',
        description: 'Enter the full URL of the video (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.type === 'tutorial' && data.videoType === 'upload',
      },
    },
    {
      name: 'tutorialContent',
      type: 'richText',
      label: 'Tutorial Description',
      admin: {
        condition: (data) => data.type === 'tutorial',
      },
    },
    {
      name: 'relatedSkills',
      type: 'relationship',
      relationTo: 'skillsets',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            }
            return value;
          },
        ],
      },
    },
  ],
}; 