import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getFontSettings() {
  try {
    const payload = await getPayload({ config: configPromise })

    const settingsData = await payload.findGlobal({
      slug: 'settings',
    })

    const fontFamily = settingsData?.fontFamily || 'Inter, system-ui, sans-serif'
    return { fontFamily }
  } catch (error) {
    console.error('Error fetching font settings:', error)
    return { fontFamily: 'Inter, system-ui, sans-serif' }
  }
}
