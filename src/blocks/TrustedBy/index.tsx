'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type Brand = {
  name: string
  logo: any
  category?: string
}

type Props = {
  heading?: string
  brands: Brand[]
  appearance?: {
    backgroundColor?: string
    textColor?: string
    hoverBackgroundColor?: string
    scrollSpeed?: number
  }
  id?: string
}

export const TrustedBy: React.FC<Props> = ({ heading, brands = [], appearance = {}, id }) => {
  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'

  // Function to convert hex to rgba for opacity
  const hexToRgba = (hex: string, opacity: number) => {
    // Remove # if present
    hex = hex.replace('#', '')

    // Parse the hex values to get r, g, b
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // Generate secondary color with opacity
  const secondaryColorWithOpacity = hexToRgba(secondaryColor, 0.3)

  const {
    backgroundColor = primaryColor,
    textColor = primaryColor,
    hoverBackgroundColor = '#ffffff',
    scrollSpeed = 5,
  } = appearance || {}

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [duplicatedBrands, setDuplicatedBrands] = useState<Brand[]>([])

  // Create duplicated brands array for smoother scrolling
  useEffect(() => {
    if (brands && brands.length > 0) {
      setDuplicatedBrands([...brands, ...brands, ...brands])
    }
  }, [brands])

  // Calculate actual scroll speed based on the input (1-10)
  const speed = 0.5 + scrollSpeed * 0.2

  // Automatic scrolling functionality with improved reset
  useEffect(() => {
    if (!scrollContainerRef.current || duplicatedBrands.length === 0) return

    let animationFrameId: number
    let scrollPos = 0
    const brandItemWidth = 180 + 48 // width + spacing

    const scroll = () => {
      if (!scrollContainerRef.current || isPaused) {
        animationFrameId = requestAnimationFrame(scroll)
        return
      }

      scrollPos += speed

      // Check if we need to reset
      const originalBrandsWidth = brands.length * brandItemWidth

      if (scrollPos >= originalBrandsWidth) {
        // Reset position without visual jump
        scrollPos = 0
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPos
        }
      } else {
        // Normal scroll
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPos
        }
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, isPaused, duplicatedBrands, brands.length])

  if (!brands || brands.length === 0) {
    return null
  }

  return (
    <div
      id={id}
      className="overflow-hidden"
      style={{ backgroundColor: settings?.colorScheme?.backgroundColor }}
    >
      <div className="container mx-auto py-4 px-2 sm:py-6 sm:px-3 md:py-12 md:px-6">
        {heading && (
          <h2 className="text-2xl font-bold text-center" style={{ color: primaryColor }}>
            {heading}
          </h2>
        )}
      </div>

      {/* Full width section with primary color background */}
      <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
        <div
          className="w-full py-12"
          style={{ background: primaryColor, zIndex: 2, position: 'relative' }}
        >
          <div
            className="mx-auto px-2 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollContainerRef}
              className="flex items-center space-x-12 overflow-x-hidden whitespace-nowrap"
            >
              {/* Using duplicatedBrands for smoother looping */}
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="inline-block relative overflow-hidden transition-all duration-300"
                  style={{ minWidth: '180px', height: '120px' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 hover:opacity-0">
                    {brand.logo && (
                      <img
                        src={typeof brand.logo === 'string' ? brand.logo : brand.logo.url}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain"
                        width="auto"
                        height="auto"
                        style={{ width: '150px', height: '150px' }}
                      />
                    )}
                  </div>

                  <div
                    className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
                    style={{ backgroundColor: hoverBackgroundColor }}
                  >
                    <div className="text-center">
                      <span className="font-medium block" style={{ color: secondaryColor }}>
                        {brand.name}
                      </span>
                      {brand.category && (
                        <span
                          className="text-xs block mt-1"
                          style={{ color: secondaryColor, opacity: 0.7 }}
                        >
                          {brand.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal section - using secondary color with opacity */}
        <div
          className="w-full"
          style={{
            height: '40px',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '-15px',
            transform: 'rotate(-1deg)',
          }}
        >
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            style={{
              width: '100%',
              height: '30px',
              display: 'block',
            }}
          >
            <path fill={secondaryColorWithOpacity} d="M0,0 L1440,40 L1440,40 L0,40 Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
