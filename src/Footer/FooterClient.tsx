'use client'

import React from 'react'

interface FooterClientProps {
  footerContent: React.ReactNode
  copyrightContent: React.ReactNode
}

export function FooterClient({ footerContent, copyrightContent }: FooterClientProps) {
  // Apply the styles with inline style
  return (
    <>
      <div>{footerContent}</div>
      <div>{copyrightContent}</div>
    </>
  )
}
