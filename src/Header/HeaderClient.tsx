'use client'

import React from 'react'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

interface HeaderClientWrapperProps {
  headerContent: React.ReactNode
}

export function HeaderClientWrapper({ headerContent }: HeaderClientWrapperProps) {
  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  // Apply only color overrides, keeping original styling
  return (
    <>
      <div className="header-wrapper">{headerContent}</div>

      {/* CSS styles to override only the colors */}
      <style jsx global>{`
        /* Navigation links */
        .header-wrapper nav a span {
          color: ${primaryColor} !important;
        }

        .header-wrapper nav a:hover span {
          color: ${secondaryColor} !important;
        }

        /* Dropdown menu text - keep original styling */
        .header-wrapper .text-white {
          color: ${backgroundColor} !important; /* Use background color for text on colored background */
        }

        /* Dropdown hover states */
        .header-wrapper .hover\\:bg-\\[\\#31363b\\]:hover {
          background-color: ${primaryColor} !important;
        }

        /* Logo color */
        .header-wrapper .text-2xl {
          color: ${primaryColor} !important;
        }

        /* Keep any other original styling */
      `}</style>
    </>
  )
}
