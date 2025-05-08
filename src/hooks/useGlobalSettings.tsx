'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Setting } from '@/payload-types'

// Create a context for global settings
const GlobalSettingsContext = createContext<{ settings: Setting | null }>({
  settings: null,
})

// Provider component that fetches and provides settings
export function GlobalSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Setting | null>(null)

  useEffect(() => {
    // Fetch settings from API
    async function fetchSettings() {
      try {
        const res = await fetch('/api/globals/settings')
        if (!res.ok) throw new Error('Failed to fetch settings')
        const data = await res.json()
        setSettings(data)
      } catch (error) {
        console.error('Error fetching global settings:', error)
      }
    }

    fetchSettings()
  }, [])

  return (
    <GlobalSettingsContext.Provider value={{ settings }}>{children}</GlobalSettingsContext.Provider>
  )
}

// Hook to use settings in components
export function useGlobalSettings() {
  const context = useContext(GlobalSettingsContext)

  if (context === undefined) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider')
  }

  return context
}
