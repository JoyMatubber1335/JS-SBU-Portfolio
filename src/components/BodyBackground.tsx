'use client'

import { useEffect } from 'react'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

export const BodyBackground: React.FC = () => {
  const { settings } = useGlobalSettings()
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  useEffect(() => {
    // Apply the background color to the body
    if (document.body) {
      document.body.style.backgroundColor = backgroundColor
    }

    // Clean up when component unmounts
    return () => {
      if (document.body) {
        document.body.style.backgroundColor = ''
      }
    }
  }, [backgroundColor])

  // This component doesn't render anything
  return null
}
