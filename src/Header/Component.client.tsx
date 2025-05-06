'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

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
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const logo = settingsData?.logo
  const logoUrl =
    logo?.url ||
    (logo?.filename ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${logo.filename}` : null)

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
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    <header
      className={`
        z-50 w-full transition-all duration-300
        ${stickyBehavior === 'Sticky' ? 'sticky top-0 backdrop-blur-sm' : ''}
      `}
      style={{
        backgroundColor: headerBgColor || 'white',
        color: headerTextColor || 'black',
        paddingTop: headerPaddingTop ? `${headerPaddingTop}px` : '1rem',
        paddingBottom: headerPaddingBottom ? `${headerPaddingBottom}px` : '1rem',
        backdropFilter: blurAmount ? `blur(${blurAmount}px)` : undefined,
      }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto flex items-center  px-4 ">
        <Link className="flex items-center gap-2 w-[20%]" href="/">
          {logoUrl ? (
            <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-16 w-auto" />
          ) : (
            <span className="text-xl font-bold">Logo</span>
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
