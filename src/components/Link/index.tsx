import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects' | 'media' | 'users' | 'insights' | 'skillsets' | 'about' | 'blog-posts' 
    value: Page | Post | any | any | any | any | any | any |any
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href = url || '';
  
  if (type === 'reference' && reference) {
    const { relationTo, value } = reference
    
    // Map collection names to URL paths
    const getUrlPath = (collection: string): string => {
      // Special case for blog posts - use '/blog/' instead of '/blog-posts/'
      if (collection === 'blog-posts') return '/blog';
      
      // For other collections, use the collection name
      return collection !== 'pages' ? `/${collection}` : '';
    };
    
    if (typeof value === 'object') {
      if (value.slug) {
        href = `${getUrlPath(relationTo)}/${value.slug}`
      } else if (value.id) {
        // If there's no slug but there is an ID, use ID in the URL
        href = `${getUrlPath(relationTo)}/${value.id}`
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      href = `${getUrlPath(relationTo)}/${value}`
    }
  }
  
  // Add a fallback URL if href is still empty
  if (!href && label) {
    href = `#${label.toLowerCase().replace(/\s+/g, '-')}`
  }

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
