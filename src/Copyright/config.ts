import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateCopyright } from './hooks/revalidateCopyright'

export const Copyright: GlobalConfig = {
  slug: 'copyright',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
      admin: {
        description: 'Copyright text (e.g., "All rights reserved")',
      },
    },
    {
      name: 'copyrightLinks',
      type: 'array',
      label: 'Add pages',
      maxRows: 3,
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
  hooks: {
    afterChange: [revalidateCopyright],
  },
}
