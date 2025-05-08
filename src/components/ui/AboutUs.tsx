'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type Feature = {
  icon?: { url: string }
  lineLength?: number // optional, for custom line length
  description?: string | { root?: any }
}

type AboutUsProps = {
  heading: string
  description: string
  features: Feature[]
  logo?: { url: string }
}

// Helper to extract all text from deeply nested description
function extractTextFromDescription(desc: any): string {
  if (typeof desc === 'string') return desc
  if (desc?.root?.children) {
    return desc.root.children
      .map((child: any) =>
        Array.isArray(child.children)
          ? child.children.map((c: any) => c.text || '').join('')
          : child.text || '',
      )
      .join(' ')
  }
  return ''
}

export const AboutUs: React.FC<AboutUsProps> = ({ heading, description, features }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(440) // default fallback
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(null)

  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'
  console.log(backgroundColor, settings?.colorScheme)
  useEffect(() => {
    if (containerRef.current) {
      setSize(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (containerRef.current) {
        setSize(containerRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const radius = size * 0.39 // ~80% of half the width, tweak as needed
  const center = size / 2
  const iconSize = size * 0.25 // 25% of width, tweak as needed
  const angleStep = 360 / features.length

  return (
    <section
      className="relative flex items-center justify-center py-20 overflow-hidden h-[1000px]"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Desktop Circle Layout */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-[80vw] max-w-[600px] aspect-square"
      >
        {/* Dashed lines */}
        <svg className="absolute inset-0 w-full h-full" fill="none">
          {features.map((feature, i) => {
            // For the top icon (i === 0), use a longer line
            const customLineLength = 0.55
            const angle = (angleStep * i - 90) * (Math.PI / 180)
            const thisRadius = size * customLineLength
            const x = Math.cos(angle) * thisRadius + center
            const y = Math.sin(angle) * thisRadius + center
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={primaryColor}
                strokeDasharray="6 6"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
            )
          })}
        </svg>
        {/* Feature icons */}
        {features.map((feature, i) => {
          // For the top icon (i === 0), use a longer line
          const customLineLength = 0.55
          const angle = (angleStep * i - 90) * (Math.PI / 180)
          const thisRadius = size * customLineLength
          const x = Math.cos(angle) * thisRadius + center - iconSize / 2
          const y = Math.sin(angle) * thisRadius + center - iconSize / 2
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center rounded-full bg-white shadow-lg group"
              style={{
                left: x,
                top: y,
                width: iconSize,
                height: iconSize,
              }}
              onMouseEnter={() => setTooltipVisible(i)}
              onMouseLeave={() => setTooltipVisible((current) => (current === i ? null : current))}
            >
              {/* Tooltip on hover */}
              {feature.description && tooltipVisible === i && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-56 p-4 text-sm rounded-xl shadow-xl opacity-100 scale-100 transition-all duration-300 z-20 border-2"
                  style={{
                    minWidth: '180px',
                    backgroundColor: backgroundColor,
                    color: secondaryColor,
                    borderColor: primaryColor,
                  }}
                  onMouseEnter={() => setTooltipVisible(i)}
                  onMouseLeave={() =>
                    setTooltipVisible((current) => (current === i ? null : current))
                  }
                >
                  {/* Text content */}
                  {extractTextFromDescription(feature.description)}
                  <div
                    className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 z-10 border-l-2 border-t-2"
                    style={{
                      backgroundColor: backgroundColor,
                      borderColor: primaryColor,
                    }}
                  ></div>
                </div>
              )}
              {feature.icon?.url && (
                <Image
                  src={feature.icon.url}
                  alt="Feature"
                  width={iconSize * 0.7}
                  height={iconSize * 0.7}
                />
              )}
            </div>
          )
        })}
        {/* Center content */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ width: size * 0.7 }}
        >
          <h2
            className="text-4xl font-bold mb-2 text-center leading-tight"
            style={{ color: primaryColor }}
          >
            {heading}
          </h2>
          <p className="text-lg mb-6 text-center leading-normal" style={{ color: secondaryColor }}>
            {description}
          </p>
        </div>
      </div>
      {/* Mobile: Stack content and icons */}
      <div className="md:hidden flex flex-col items-center w-full px-4">
        <h2
          className="text-3xl font-bold mb-2 text-center leading-tight"
          style={{ color: primaryColor }}
        >
          {heading}
        </h2>
        <p className="text-base mb-6 text-center leading-normal" style={{ color: secondaryColor }}>
          {description}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold shadow hover:bg-gray-200 transition mb-6"
          style={{
            backgroundColor: primaryColor,
            color: backgroundColor,
          }}
        >
          See all integrations <span aria-hidden>→</span>
        </a>
        <div className="flex justify-center gap-4 flex-wrap">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-full bg-white shadow-lg"
              style={{ width: 100, height: 100 }}
            >
              {feature.icon?.url && (
                <Image src={feature.icon.url} alt="Feature" width={80} height={80} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
