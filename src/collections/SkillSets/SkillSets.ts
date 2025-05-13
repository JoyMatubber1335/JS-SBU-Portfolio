import type { CollectionConfig } from 'payload';

export const SkillSets: CollectionConfig = {
  slug: 'skillsets',
  admin: {
    useAsTitle: 'title',
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
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'skillType',
      type: 'select',
      options: [
        {
          label: 'Full Stack Development',
          value: 'full-stack',
        },
        {
          label: 'UI/UX Research',
          value: 'ui-ux',
        },
        {
          label: 'System Architecture',
          value: 'system-architecture',
        },
        {
          label: 'Cloud Native Apps',
          value: 'cloud-native',
        },
        {
          label: 'Machine Learning Implementation',
          value: 'machine-learning',
        },
        {
          label: 'Performance Optimization',
          value: 'performance-optimization',
        },
      ],
      required: true,
    },
    {
      name: 'relatedBlogPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description: 'Related blog posts for this skill set',
      },
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order in which the skill should appear',
      },
    },
  ],
}; 