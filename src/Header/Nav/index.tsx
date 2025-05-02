'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import clsx from 'clsx'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const animation = data?.menuAnimation || 'None'
  const hoverEffect = data?.enableHoverEffect
  const showSearch = data?.showSearch
  console.log('animation', animation)
  const getAnimationClass = () => {
    switch (animation) {
      case 'Underline':
        return 'border-b-2 border-transparent hover:border-primary transition-all duration-300'
      case 'Fade':
        return 'opacity-80 hover:opacity-100 transition-opacity duration-300'
      case 'Scale':
        return 'transform hover:scale-105 transition-transform duration-300'
      default:
        return ''
    }
  }

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className={clsx(getAnimationClass(), hoverEffect && 'hover:text-primary')}
        />
      ))}

      {showSearch && (
        <Link href="/search" className="flex items-center gap-1 text-primary">
          <SearchIcon className="w-5" />
          <span>Search</span>
        </Link>
      )}
    </nav>
  )
}
