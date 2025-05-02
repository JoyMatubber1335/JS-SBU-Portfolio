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
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

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
    <header
      className="container relative z-20 "
      style={{
        backgroundColor: headerBgColor || 'transparent',
        color: headerTextColor || '#000',
        fontSize: `${headerFontSize || 16}px`,
        paddingTop: `${headerPaddingTop || 10}px`,
        paddingBottom: `${headerPaddingBottom || 10}px`,
        backdropFilter: blurAmount ? `blur(${blurAmount}px)` : 'none',
        WebkitBackdropFilter: blurAmount ? `blur(${blurAmount}px)` : 'none',
        position: stickyBehavior === 'Sticky' ? 'sticky' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
      }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
