// Define a simplified Block type
type Block = {
  slug: string
  labels: {
    singular: string
    plural: string
  }
  fields: any[]
}

export const featuredPortfolioBlock: Block = {
  slug: 'featuredPortfolio',
  labels: {
    singular: 'Featured Portfolio Projects',
    plural: 'Featured Portfolio Project Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Featured Portfolio Projects',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      defaultValue:
        'Check out our spotlighted case studies that showcase our expertise and capabilities.',
    },
    {
      name: 'projects',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      fields: [
        {
          name: 'title',
          label: 'Project Title',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          label: 'Project Category',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Short Description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'image',
          label: 'Project Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          label: 'Project Link',
          type: 'group',
          fields: [
            {
              name: 'type',
              label: 'Link Type',
              type: 'radio',
              options: [
                {
                  label: 'Internal Page',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
              defaultValue: 'reference',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'reference',
              label: 'Page to Link to',
              type: 'relationship',
              relationTo: ['pages'],
              required: true,
              admin: {
                condition: (_: any, siblingData: { type?: string }) =>
                  siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: true,
              admin: {
                condition: (_: any, siblingData: { type?: string }) =>
                  siblingData?.type === 'custom',
              },
            },
            {
              name: 'label',
              label: 'Link Label',
              type: 'text',
              required: true,
              defaultValue: 'View Case Study',
            },
          ],
        },
        {
          name: 'highlighted',
          label: 'Highlight This Project',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isGlobal',
          label: 'Show Global Tag',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'textColor',
          label: 'Text Color (Regular Cards)',
          type: 'text',
          defaultValue: '#333333',
        },
        {
          name: 'firstItemTextColor',
          label: 'Text Color (Featured Card)',
          type: 'text',
          defaultValue: '#ffffff',
        },
        {
          name: 'cardBackgroundColor',
          label: 'Card Background Color',
          type: 'text',
          defaultValue: '#ffffff',
        },
        {
          name: 'accentColor',
          label: 'Accent Color (Highlights & Buttons)',
          type: 'text',
          defaultValue: '#3b82f6',
        },
      ],
    },
  ],
}
