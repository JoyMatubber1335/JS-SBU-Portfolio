'use client'

import Image from 'next/image'
import React from 'react'

interface SocialIconProps {
  platform: string
  url: string
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, url }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback if image doesn't exist
    const target = e.target as HTMLImageElement
    target.style.fontSize = '14px'
    target.style.textTransform = 'uppercase'
    target.alt = platform.charAt(0)
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
      aria-label={`Visit our ${platform} page`}
    >
      <Image 
        src={`/${platform}.svg`} 
        width={20} 
        height={20} 
        alt={`${platform} icon`}
        onError={handleImageError}
      />
    </a>
  )
} 