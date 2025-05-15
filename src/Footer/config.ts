import { fields } from './../blocks/Form/fields'
import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
       {
        name:"title",
        type:"text",
        required:true,
       },
        {
          name: 'subLinks',
          type: 'array',
          label: 'Sub Links',
          maxRows: 10,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'footerContent',
      label: 'Footer Content',
      type: 'richText', // Added rich text field
      required: false,
      admin: {
        // You can customize the rich text editor appearance here if needed
      },
    },
    
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
