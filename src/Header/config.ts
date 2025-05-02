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
          name: 'menuAnimation',
          label: 'Menu Animation Style',
          type: 'select',
          options: ['None', 'Underline', 'Fade', 'Scale'],
          defaultValue: 'None',
        },
        {
          name: 'enableHoverEffect',
          label: 'Enable Hover Effect',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'transparentHeader',
          label: 'Enable Transparent Header',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'blurAmount',
          label: 'Blur Amount (px)',
          type: 'number',
          admin: {
            condition: (_, siblingData) => siblingData.transparentHeader === true,
          },
        },
        {
          name: 'showSearch',
          label: 'Show Search',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'stickyBehavior',
          label: 'Sticky Behavior',
          type: 'select',
          options: ['None', 'Sticky'],
          defaultValue: 'Sticky',
        },
        // Adding color pickers for background and text colors
        {
          name: 'headerBgColor',
          label: 'Header Background Color',
          type: 'text', // Use a text field to store hex color code
          defaultValue: '#ffffff', // Default white background
          admin: {
            description: 'Pick a background color for the header',
          },
        },
        {
          name: 'headerTextColor',
          label: 'Header Text Color',
          type: 'text', // Use a text field to store hex color code
          defaultValue: '#000000', // Default black text color
          admin: {
            description: 'Pick a text color for the header',
          },
        },
        // Adding font size for header text
        {
          name: 'headerFontSize',
          label: 'Header Font Size',
          type: 'number',
          defaultValue: 16, // Default font size in px
          admin: {
            description: 'Set the font size for the header text (in px)',
          },
        },
        // Adding padding options (top and bottom)
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
          defaultValue: 10, // Default padding-bottom in px
        },
      ],
    },

    // 🟩 Navigation Menu Section
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
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
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
