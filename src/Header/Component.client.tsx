'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface HeaderClientProps {
  data: Header
  settingsData: {
    logo?: {
      url?: string
      filename?: string
      alt?: string
    }
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, settingsData }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const logo = settingsData?.logo
  const logoUrl =
    logo?.url ||
    (logo?.filename ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${logo.filename}` : null)

  // Dynamically fetch header settings
  const {
    stickyBehavior,
    headerBgColor,
    headerTextColor,
    headerFontSize,
    headerPaddingTop,
    headerPaddingBottom,
    blurAmount,
  } = data

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link className="flex items-center" href="/">
          {logoUrl ? (
            <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-10 w-auto" />
          ) : (
            <span className="text-xl font-bold">Logo</span>
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
