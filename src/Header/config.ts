import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
// import { HexColorPicker } from 'react-colorful' // assuming you use react-colorful for color picking

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    // 🟦 Header Settings Section (Top)
    {
      type: 'collapsible',
      label: 'Header Settings',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'stickyBehavior',
          label: 'Sticky Behavior',
          type: 'select',
          options: ['None', 'Sticky'],
          defaultValue: 'Sticky',
        },

        {
          name: 'headerPaddingTop',
          label: 'Padding Top (px)',
          type: 'number',
          defaultValue: 10, // Default padding-top in px
        },
        {
          name: 'headerPaddingBottom',
          label: 'Padding Bottom (px)',
          type: 'number',
          defaultValue: 10, 
        },
      ],
    },

   
    {
      type: 'collapsible',
      label: 'Navigation Menu',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'navItems',
          type: 'array',
          maxRows: 6,
          fields: [
            {
              name: 'itemType',
              type: 'radio',
              options: [
                {
                  label: 'Link',
                  value: 'link',
                },
                {
                  label: 'Collection',
                  value: 'collection',
                }
              ],
              defaultValue: 'link',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'link',
              type: 'group',
              admin: {
                condition: (_, siblingData) => siblingData?.itemType === 'link',
              },
              fields: [
                link({ appearances: false }),
              ],
            },
            {
              name: 'collection',
              type: 'group',
              admin: {
                condition: (_, siblingData) => siblingData?.itemType === 'collection',
              },
              fields: [
                {
                  name: 'collectionType',
                  label: 'Collection Type',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Projects',
                      value: 'projects',
                    },
                    {
                      label: 'Insights',
                      value: 'insights',
                    },
                    {
                      label: 'Skills',
                      value: 'skills',
                    },
                    {
                      label: 'Blog Posts',
                      value: 'posts',
                    },
                  ],
                },
                {
                  name: 'label',
                  label: 'Navigation Label',
                  type: 'text',
                  required: true,
                }
              ],
            },
            {
              name: 'subNavItems',
              type: 'array',
              label: 'Sub Navigation Items',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'itemType',
                  type: 'radio',
                  options: [
                    {
                      label: 'Link',
                      value: 'link',
                    },
                    {
                      label: 'Collection',
                      value: 'collection',
                    }
                  ],
                  defaultValue: 'link',
                  admin: {
                    layout: 'horizontal',
                  },
                },
                {
                  name: 'link',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData?.itemType === 'link',
                  },
                  fields: [
                    link({ appearances: false }),
                  ],
                },
                {
                  name: 'collection',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData?.itemType === 'collection',
                  },
                  fields: [
                    {
                      name: 'collectionType',
                      label: 'Collection Type',
                      type: 'select',
                      required: true,
                      options: [
                        {
                          label: 'Projects',
                          value: 'projects',
                        },
                        {
                          label: 'Insights',
                          value: 'insights',
                        },
                        {
                          label: 'Skills',
                          value: 'skills',
                        },
                        {
                          label: 'Blog Posts',
                          value: 'posts',
                        },
                      ],
                    },
                    {
                      name: 'label',
                      label: 'Navigation Label',
                      type: 'text',
                      required: true,
                    }
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media', // make sure you have a 'media' collection
                  label: 'Sub Menu Image',
                },
                {
                  name: 'subSubNavItems',
                  type: 'array',
                  label: 'Sub-Sub Navigation Items',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    link({ appearances: false }),
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Sub-Sub Menu Image',
                    },
                  ],
                },
              ],
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
