import type { CollectionConfig } from 'payload/types'
import { slugField } from '@/fields/slug'
import { populatePublishedDate } from '@/hooks/populatePublishedDate'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    ...slugField(),
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      label: 'Physical Address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'group',
      label: 'Map Location',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude',
          defaultValue: 23.8103, // Default latitude for Dhaka
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude',
          defaultValue: 90.4125, // Default longitude for Dhaka
          required: true,
        },
        {
          name: 'zoom',
          type: 'number',
          label: 'Zoom Level',
          min: 1,
          max: 20,
          defaultValue: 14,
        }
      ],
    },
    {
      name: 'contactFormSettings',
      type: 'group',
      label: 'Contact Form Settings',
      fields: [
        {
          name: 'enableContactForm',
          type: 'checkbox',
          label: 'Enable Contact Form',
          defaultValue: true,
        },
        {
          name: 'emailRecipient',
          type: 'email',
          label: 'Form Submission Email Recipient',
          admin: {
            condition: (_, siblingData) => siblingData?.enableContactForm,
          },
        },
        {
          name: 'formSuccessMessage',
          type: 'textarea',
          label: 'Success Message',
          defaultValue: 'Thank you for your message. We will get back to you soon!',
          admin: {
            condition: (_, siblingData) => siblingData?.enableContactForm,
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'Twitter URL',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
        },
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'businessHours',
      type: 'array',
      label: 'Business Hours',
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
        },
        {
          name: 'isOpen',
          type: 'checkbox',
          label: 'Open',
          defaultValue: true,
        },
        {
          name: 'openTime',
          type: 'text',
          label: 'Opening Time',
          admin: {
            condition: (_, siblingData) => siblingData?.isOpen,
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          label: 'Closing Time',
          admin: {
            condition: (_, siblingData) => siblingData?.isOpen,
          },
        },
      ],
    }
  ],
} 