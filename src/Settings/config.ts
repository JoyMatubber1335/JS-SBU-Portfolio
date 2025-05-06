import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Site Logo',
      type: 'upload',
      relationTo: 'media', // make sure you have a media collection
      required: false,
    },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'group',
      fields: [
        {
          name: 'primaryColor',
          label: 'Primary Color',
          type: 'text',
        },
        {
          name: 'secondaryColor',
          label: 'Secondary Color',
          type: 'text',
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'text',
        },
      ],
    },
    {
      name: 'fontSettings',
      label: 'Font Settings',
      type: 'group',
      fields: [
        {
          name: 'fontFamily',
          label: 'Font Family',
          type: 'text',
        },
        {
          name: 'baseFontSize',
          label: 'Base Font Size (px)',
          type: 'number',
        },
        {
          name: 'headingFontSize',
          label: 'Heading Font Size (px)',
          type: 'number',
        },
      ],
    },
    // Social Media Links Section
    {
      name: 'socialMediaLinks',
      label: 'Social Media Links',
      type: 'group',
      admin: {
        description: 'Add links to your social media profiles.',
      },

      fields: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text', // URL type could be used to enforce valid URLs

          required: false,
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
          required: false,
        },
        {
          name: 'tiktok',
          label: 'TikTok',
          type: 'text',
          required: false,
        },
        {
          name: 'twitter',
          label: 'Twitter (X)',
          type: 'text',
          required: false,
        },
        {
          name: 'snapchat',
          label: 'Snapchat',
          type: 'text',
          required: false,
        },
        {
          name: 'pinterest',
          label: 'Pinterest',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}
