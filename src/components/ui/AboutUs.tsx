'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

type Feature = {
  icon?: { url: string }
  lineLength?: number // optional, for custom line length
}

type AboutUsProps = {
  heading: string
  description: string
  features: Feature[]
  logo?: { url: string }
}

export const AboutUs: React.FC<AboutUsProps> = ({ heading, description, features, logo }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(440) // default fallback

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
    <section className="relative flex items-center justify-center py-20 bg-[#181a20] overflow-hidden">
      {/* Desktop Circle Layout */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-[80vw] max-w-[600px] aspect-square"
      >
        {/* Dashed lines */}
        <svg className="absolute inset-0 w-full h-full" fill="none">
          {features.map((feature, i) => {
            // For the top icon (i === 0), use a longer line
            const customLineLength = i % 2 === 1 ? 0.6 : (feature.lineLength ?? 0.5)
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
                stroke="#fff"
                strokeDasharray="6 6"
                strokeOpacity="0.18"
                strokeWidth="2"
              />
            )
          })}
        </svg>
        {/* Feature icons */}
        {features.map((feature, i) => {
          // For the top icon (i === 0), use a longer line
          const customLineLength = i % 2 === 1 ? 0.6 : (feature.lineLength ?? 0.5)
          const angle = (angleStep * i - 90) * (Math.PI / 180)
          const thisRadius = size * customLineLength
          const x = Math.cos(angle) * thisRadius + center - iconSize / 2
          const y = Math.sin(angle) * thisRadius + center - iconSize / 2
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center rounded-full bg-white shadow-lg"
              style={{
                left: x,
                top: y,
                width: iconSize,
                height: iconSize,
              }}
            >
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
          {logo?.url && (
            <Image
              src={logo.url}
              alt="Logo"
              width={size * 0.23}
              height={size * 0.23}
              className="mb-2"
            />
          )}
          <h2 className="text-white text-4xl font-bold mb-2 text-center leading-tight">
            {heading}
          </h2>
          <p className="text-white/80 text-lg mb-6 text-center leading-normal">{description}</p>
        </div>
      </div>
      {/* Mobile: Stack content and icons */}
      <div className="md:hidden flex flex-col items-center w-full px-4">
        {logo?.url && <Image src={logo.url} alt="Logo" width={80} height={80} className="mb-2" />}
        <h2 className="text-white text-3xl font-bold mb-2 text-center leading-tight">{heading}</h2>
        <p className="text-white/80 text-base mb-6 text-center leading-normal">{description}</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#181a20] rounded-full font-semibold shadow hover:bg-gray-200 transition mb-6"
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
