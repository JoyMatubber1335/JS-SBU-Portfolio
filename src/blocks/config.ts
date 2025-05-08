// Define a simplified Block type
type Block = {
  slug: string
  labels: {
    singular: string
    plural: string
  }
  fields: any[]
}

export const trustedByBlock: Block = {
  slug: 'trustedBy',
  labels: {
    singular: 'Trusted By Section',
    plural: 'Trusted By Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: '',
    },
    {
      name: 'brands',
      type: 'array',
      minRows: 5,
      maxRows: 20,
      labels: {
        singular: 'Brand',
        plural: 'Brands',
      },
      fields: [
        {
          name: 'name',
          label: 'Brand Name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          label: 'Brand Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'category',
          label: 'Category',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      fields: [
        {
          name: 'hoverBackgroundColor',
          label: 'Hover Background Color',
          type: 'text',
          defaultValue: '#ffffff',
        },
        {
          name: 'scrollSpeed',
          label: 'Scroll Speed (1-10, 1=slow, 10=fast)',
          type: 'number',
          defaultValue: 5,
          min: 1,
          max: 10,
        },
      ],
    },
  ],
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
      maxRows: 5,
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
