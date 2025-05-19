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

export const HeaderClient: React.FC<HeaderClientProps | any> = ({ data, settingsData }) => {
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
    transparentHeader,
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
        background: 'rgba(0,0,0,0.3)',
        color: '#fff',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        fontSize: '16px',
      }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className="w-full max-w-screen-xl mx-auto flex items-center p-4"
        style={{ minHeight: 48 }}
      >
        <Link href="/" className="flex items-center gap-2 mr-8 w-[10%]">
          {logoUrl ? (
            <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-[60px] w-auto" />
          ) : (
            <span className="text-2xl font-bold">Logo</span>
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
