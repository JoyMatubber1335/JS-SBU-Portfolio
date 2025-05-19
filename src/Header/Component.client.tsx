/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logo = settingsData?.logo
  const logoUrl = logo?.url || (logo?.filename ? `/media/${logo.filename}` : null)

  const { stickyBehavior } = data

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`
        z-50 w-full transition-all duration-300 bg-white shadow-md 
        ${stickyBehavior === 'Sticky' ? 'sticky top-0 backdrop-blur-sm' : ''}
        md:flex /* Show normally on desktop */
      `}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className="w-full max-w-screen-xl mx-auto flex items-center justify-between p-4"
        style={{ minHeight: 48 }}
      >
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-[60px] w-auto" />
          ) : (
            <span className="text-2xl font-bold">Logo</span>
          )}
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto flex items-center text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Desktop Navigation - Only visible on md screens and up */}
        <div className="hidden md:block flex-1 w-full">
          <HeaderNav data={data} />
        </div>
      </div>

      {/* Mobile menu - Only visible when toggled on mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full animate-slide-down">
          <div className="p-4 bg-black bg-opacity-90 mobile-menu-container">
            <HeaderNav data={data} />
          </div>
        </div>
      )}
    </header>
  )
}
