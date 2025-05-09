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
        style={{
          backgroundColor: footerStyles.footer.background,
          color: footerStyles.footer.color,
          borderColor: footerStyles.footer.borderColor,
        }}
        className="footer-wrapper mt-8"
      >
        {footerContent}
      </div>
      <div
        style={{
          backgroundColor: footerStyles.copyright.background,
          color: footerStyles.copyright.color,
          borderColor: footerStyles.copyright.borderColor,
        }}
        className="copyright-wrapper"
      >
        {copyrightContent}
      </div>

      {/* CSS styles to override the footer styles */}
      <style jsx global>{`
        .footer-wrapper footer {
          background-color: ${footerStyles.footer.background} !important;
          color: ${footerStyles.footer.color} !important;
          border: 1px solid ${footerStyles.footer.borderColorWithOpacity} !important;
        }

        .footer-wrapper .text-white {
          color: ${footerStyles.mainLinks.color} !important;
        }

        .footer-wrapper .hover\\:text-primary:hover {
          color: ${footerStyles.mainLinks.hoverColor} !important;
        }

        .footer-wrapper .text-gray-400 {
          color: ${footerStyles.subLinks.color} !important;
        }

        .footer-wrapper .hover\\:text-white:hover {
          color: ${footerStyles.mainLinks.color} !important;
        }

        .footer-wrapper .border-gray-300 {
          border-color: ${footerStyles.socialIcons.borderColor} !important;
        }

        .copyright-wrapper div {
          background-color: ${footerStyles.copyright.background} !important;
          color: ${footerStyles.copyright.color} !important;
          border-color: ${footerStyles.copyright.borderColor} !important;
        }

        .copyright-wrapper .text-black,
        .copyright-wrapper .dark\\:text-white {
          color: ${footerStyles.copyrightLinks.color} !important;
        }
      `}</style>
    </>
  )
}
