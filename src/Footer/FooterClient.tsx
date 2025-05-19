'use client'

import React from 'react'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

interface FooterClientProps {
  footerContent: React.ReactNode
  copyrightContent: React.ReactNode
}

export function FooterClient({ footerContent, copyrightContent }: FooterClientProps) {
  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  const footerStyles = {
    footer: {
      background: backgroundColor,
      color: primaryColor,
      borderColor: primaryColor,
      borderColorWithOpacity: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.08ss)`,
    },
    mainLinks: {
      color: primaryColor,
      hoverColor: secondaryColor,
    },
    subLinks: {
      color: secondaryColor,
    },
    description: {
      color: secondaryColor,
    },
    socialIcons: {
      borderColor: primaryColor,
    },
    copyright: {
      background: secondaryColor,
      color: backgroundColor,
      borderColor: primaryColor,
    },
    copyrightLinks: {
      color: backgroundColor,
    },
  }

  // Apply the styles with inline style
  return (
    <>
      <div
       
      >
        {footerContent}
      </div>
      <div
       
      >
        {copyrightContent}
      </div>

     
    </>
  )
}
