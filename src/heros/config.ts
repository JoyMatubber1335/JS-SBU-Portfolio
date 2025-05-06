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
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Team Impact',
          value: 'teamImpact',
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
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'teamImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'teamContent',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'teamImpact',
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
          name: 'headingColor',
          type: 'text',
          label: 'Heading Color (Hex code, e.g. #334155)',
          defaultValue: '#334155',
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
          name: 'descriptionColor',
          type: 'text',
          label: 'Description Color (Hex code, e.g. #4b5563)',
          defaultValue: '#4b5563',
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
        {
          name: 'fontFamily',
          type: 'select',
          label: 'Font Family',
          defaultValue: 'font-sans',
          options: [
            {
              label: 'Sans Serif',
              value: 'font-sans',
            },
            {
              label: 'Serif',
              value: 'font-serif',
            },
            {
              label: 'Mono',
              value: 'font-mono',
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'teamImpact',
      },
      label: 'Testimonials',
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Testimonial Text',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author Name and Title',
          required: true,
        },
      ],
      defaultValue: [
        {
          text: 'Cefalo´s business model was what we needed to give it a try. It has worked beyond belief for us!',
          author: 'Leif Arild Åsheim, CEO | Promineo',
        },
        {
          text: "Cefalo understood what we were looking for and found skilled developers for us. We gained quick access to the right qualifications for the project we were about to start. It's worth its weight in gold!",
          author: 'Eivind Olsen, Director of Customer Deliveries at Prokom',
        },
        {
          text: 'Working with Cefalo has been a game-changer for our development needs. Their team consistently delivers high-quality work on time and within budget.',
          author: 'Anna Johnson, VP of Engineering | TechSolutions',
        },
      ],
    },
    {
      name: 'testimonialStyle',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'teamImpact',
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
          name: 'authorColor',
          type: 'text',
          label: 'Author Text Color (Hex code, e.g. #1f2937)',
          defaultValue: '#1f2937',
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
