import { getPayload } from 'payload'
import config from '@payload-config'

// This is a singleton to ensure we only instantiate Payload once
let cachedPayload: any = null

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  const payload = await getPayload({ config })

  cachedPayload = payload
  return payload
}

// Simple convenience wrapper around getPayload to use in components
export const payload = {
  find: async (args: any) => {
    const client = await getPayloadClient()
    return client.find(args)
  },
  findByID: async (args: any) => {
    const client = await getPayloadClient()
    return client.findByID(args)
  },
  create: async (args: any) => {
    const client = await getPayloadClient()
    return client.create(args)
  },
  update: async (args: any) => {
    const client = await getPayloadClient()
    return client.update(args)
  },
  delete: async (args: any) => {
    const client = await getPayloadClient()
    return client.delete(args)
  },
} 