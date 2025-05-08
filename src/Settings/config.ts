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
          defaultValue: '#334155',
          admin: {
            description: 'Used for headings and important text throughout the site',
          },
        },
        {
          name: 'secondaryColor',
          label: 'Secondary Color',
          type: 'text',
          defaultValue: '#4b5563',
          admin: {
            description: 'Used for descriptions and secondary text throughout the site',
          },
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'text',
          defaultValue: '#ffffff',
          admin: {
            description: 'Used for backgrounds throughout the site',
          },
        },
      ],
    },
    {
      name: 'fontFamily',
      label: 'Global Font Family',
      type: 'select',
      defaultValue: 'Inter, system-ui, sans-serif',
      admin: {
        description:
          'Select a font family for the entire site. This will affect all text including headings and paragraphs.',
      },
      options: [
        {
          label: 'Inter (Modern Sans-Serif)',
          value: 'Inter, system-ui, sans-serif',
        },
        {
          label: 'Arial (Classic Sans-Serif)',
          value: 'Arial, sans-serif',
        },
        {
          label: 'Helvetica (Clean Sans-Serif)',
          value: 'Helvetica, Arial, sans-serif',
        },
        {
          label: 'Georgia (Elegant Serif)',
          value: 'Georgia, serif',
        },
        {
          label: 'Times New Roman (Classic Serif)',
          value: 'Times New Roman, Times, serif',
        },
        {
          label: 'Verdana (Readable Sans-Serif)',
          value: 'Verdana, sans-serif',
        },
        {
          label: 'Tahoma (Clear Sans-Serif)',
          value: 'Tahoma, sans-serif',
        },
        {
          label: 'Trebuchet MS (Modern Sans-Serif)',
          value: 'Trebuchet MS, sans-serif',
        },
        {
          label: 'Courier New (Monospace)',
          value: 'Courier New, monospace',
        },
        {
          label: 'Roboto (Google Sans-Serif)',
          value: 'Roboto, sans-serif',
        },
        {
          label: 'Open Sans (Readable Sans-Serif)',
          value: 'Open Sans, sans-serif',
        },
        {
          label: 'Lato (Modern Sans-Serif)',
          value: 'Lato, sans-serif',
        },
        {
          label: 'Montserrat (Bold Sans-Serif)',
          value: 'Montserrat, sans-serif',
        },
        {
          label: 'Poppins (Geometric Sans-Serif)',
          value: 'Poppins, sans-serif',
        },
        {
          label: 'Merriweather (Modern Serif)',
          value: 'Merriweather, serif',
        },
      ],
    },
    {
      name: 'fontSettings',
      label: 'Font Settings',
      type: 'group',
      fields: [
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
