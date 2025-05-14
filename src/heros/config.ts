import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'hero',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        // {
        //   label: 'High Impact',
        //   value: 'highImpact',
        // },
        // {
        //   label: 'Medium Impact',
        //   value: 'mediumImpact',
        // },
        // {
        //   label: 'Low Impact',
        //   value: 'lowImpact',
        // },
        {
          label: 'Hero',
          value: 'hero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'hero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'teamContent',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'hero',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading Text',
          defaultValue: 'In Need of Highly Skilled Developers at a Lower Cost?',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description Text',
          defaultValue:
            'We provide you with a dedicated remote development team with some of the top developers in Bangladesh!',
        },
        {
          name: 'headingSize',
          type: 'select',
          label: 'Heading Size',
          defaultValue: '5xl',
          options: [
            {
              label: 'Small (text-3xl)',
              value: '3xl',
            },
            {
              label: 'Medium (text-4xl)',
              value: '4xl',
            },
            {
              label: 'Large (text-5xl)',
              value: '5xl',
            },
            {
              label: 'Extra Large (text-6xl)',
              value: '6xl',
            },
          ],
        },
        {
          name: 'descriptionSize',
          type: 'select',
          label: 'Description Size',
          defaultValue: 'lg',
          options: [
            {
              label: 'Small (text-sm)',
              value: 'sm',
            },
            {
              label: 'Medium (text-base)',
              value: 'base',
            },
            {
              label: 'Large (text-lg)',
              value: 'lg',
            },
            {
              label: 'Extra Large (text-xl)',
              value: 'xl',
            },
          ],
        },
        {
          name: 'buttonType',
          type: 'select',
          label: 'Button Type',
          defaultValue: 'solid',
          options: [
            {
              label: 'Solid',
              value: 'solid',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
        {
          name: 'buttonBgColor',
          type: 'text',
          label: 'Button Background Color (Hex code, e.g. #10b981)',
          defaultValue: '#10b981',
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          label: 'Button Text Color (Hex code, e.g. #ffffff)',
          defaultValue: '#ffffff',
        },
        {
          name: 'buttonFontSize',
          type: 'select',
          label: 'Button Font Size',
          defaultValue: 'text-base',
          options: [
            {
              label: 'Small',
              value: 'text-sm',
            },
            {
              label: 'Medium',
              value: 'text-base',
            },
            {
              label: 'Large',
              value: 'text-lg',
            },
            {
              label: 'Extra Large',
              value: 'text-xl',
            },
          ],
        },
        {
          name: 'buttonBorderRadius',
          type: 'select',
          label: 'Button Border Radius',
          defaultValue: 'rounded-md',
          options: [
            {
              label: 'None',
              value: 'rounded-none',
            },
            {
              label: 'Small',
              value: 'rounded-sm',
            },
            {
              label: 'Medium',
              value: 'rounded-md',
            },
            {
              label: 'Large',
              value: 'rounded-lg',
            },
            {
              label: 'Extra Large',
              value: 'rounded-xl',
            },
            {
              label: 'Full',
              value: 'rounded-full',
            },
          ],
        },
        {
          name: 'buttonHoverBgColor',
          type: 'text',
          label: 'Button Hover Background Color (Hex code, e.g. #059669)',
          defaultValue: '#059669',
        },
        {
          name: 'buttonBorderColor',
          type: 'text',
          label: 'Button Border Color (Hex code, e.g. #10b981)',
          defaultValue: '#10b981',
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'hero',
      },
      label: 'Slides',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'slideType',
          type: 'select',
          label: 'Slide Type',
          required: true,
          defaultValue: 'motto',
          options: [
            {
              label: 'Motto',
              value: 'motto',
            },
            {
              label: 'Product Highlight',
              value: 'product',
            },
            {
              label: 'Services',
              value: 'services',
            },
          ],
        },
        {
          name: 'motto',
          type: 'text',
          label: 'Motto Text',
          required: true,
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'motto',
          },
        },
        {
          name: 'productTitle',
          type: 'text',
          label: 'Product Title',
          required: true,
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'product',
          },
        },
        {
          name: 'productDescription',
          type: 'textarea',
          label: 'Product Description',
          required: true,
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'product',
          },
        },
        {
          name: 'productImage',
          type: 'upload',
          label: 'Product Image',
          relationTo: 'media',
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'product',
          },
        },
        {
          name: 'servicesContent',
          type: 'richText',
          label: 'Services Content',
          required: true,
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'services',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'servicesTitle',
          type: 'text',
          label: 'Services Title',
          defaultValue: 'Our Services',
          required: true,
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'services',
          },
        },
        {
          name: 'techStacks',
          type: 'array',
          label: 'Technology Stacks',
          admin: {
            condition: (_, { slideType } = {}) => slideType === 'services',
          },
          fields: [
            {
              name: 'stackName',
              type: 'text',
              label: 'Stack Name',
              required: true,
            },
            {
              name: 'stackDescription',
              type: 'textarea',
              label: 'Short Description',
              required: true,
            },
            {
              name: 'technologies',
              type: 'text',
              label: 'Technologies (comma separated)',
              required: true,
            },
          ],
          defaultValue: [
            {
              stackName: 'Frontend Development',
              stackDescription: 'Modern, responsive interfaces with the latest frameworks',
              technologies: 'React, Angular, Vue, Next.js, TypeScript',
            },
            {
              stackName: 'Backend Development',
              stackDescription: 'Scalable and secure server solutions',
              technologies: 'Node.js, Python, Java, .NET, PHP',
            },
          ],
        },
      ],
      defaultValue: [
        {
          slideType: 'motto',
          motto: 'Empowering Your Business with Top Talent',
        },
        {
          slideType: 'product',
          productTitle: 'Custom Software Development',
          productDescription:
            'Build tailored software solutions to meet your unique business needs.',
        },
        {
          slideType: 'services',
          servicesContent: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Our Services',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'heading',
                  version: 1,
                  tag: 'h3',
                },
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'We offer a wide range of services including web development, mobile app development, and cloud solutions.',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
        },
      ],
    },
    {
      name: 'testimonialStyle',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'hero',
      },
      label: 'Testimonial Styling',
      fields: [
        {
          name: 'textSize',
          type: 'select',
          label: 'Text Size',
          defaultValue: 'base',
          options: [
            {
              label: 'Small',
              value: 'sm',
            },
            {
              label: 'Medium',
              value: 'base',
            },
            {
              label: 'Large',
              value: 'lg',
            },
            {
              label: 'Extra Large',
              value: 'xl',
            },
          ],
        },
        {
          name: 'textColor',
          type: 'text',
          label: 'Text Color (Hex code, e.g. #374151)',
          defaultValue: '#374151',
        },
        {
          name: 'borderColor',
          type: 'text',
          label: 'Border Color (Hex code, e.g. #1e3a8a)',
          defaultValue: '#1e3a8a',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Card Background Color (Hex code, e.g. #ffffff)',
          defaultValue: '#ffffff',
        },
        {
          name: 'transitionDuration',
          type: 'select',
          label: 'Slide Transition Duration',
          defaultValue: '500',
          options: [
            {
              label: 'Fast (300ms)',
              value: '300',
            },
            {
              label: 'Medium (500ms)',
              value: '500',
            },
            {
              label: 'Slow (800ms)',
              value: '800',
            },
            {
              label: 'Very Slow (1200ms)',
              value: '1200',
            },
          ],
        },
        {
          name: 'autoplay',
          type: 'checkbox',
          label: 'Autoplay Slideshow',
          defaultValue: true,
        },
        {
          name: 'interval',
          type: 'number',
          label: 'Autoplay Interval (in seconds)',
          defaultValue: 5,
          admin: {
            condition: (_, { autoplay } = {}) => autoplay === true,
          },
        },
      ],
    },
  ],
  label: false,
}
