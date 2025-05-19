import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedDate: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.publishedDate) {
      const now = new Date()
      return {
        ...data,
        publishedDate: now,
      }
    }
  }

  return data
} 