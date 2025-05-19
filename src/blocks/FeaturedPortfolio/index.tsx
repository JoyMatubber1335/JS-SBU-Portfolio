'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type Project = {
  title: string
  category: string
  description: string
  image: any
  link: {
    type: 'reference' | 'custom'
    reference?: any
    url?: string
    label: string
  }
  highlighted?: boolean
  isGlobal?: boolean
}

type Props = {
  heading?: string
  description?: string
  projects: Project[]
  appearance?: {
    textColor?: string
    firstItemTextColor?: string
    cardBackgroundColor?: string
    accentColor?: string
  }
  id?: string
}

export const FeaturedPortfolio: React.FC<Props | any> = ({
  heading = 'Featured Portfolio Projects',
  description = 'Check out our spotlighted case studies that showcase our expertise and capabilities.',
  projects = [],
  appearance = {},
  id,
}) => {
  // Get global settings for colors
  const { settings } = useGlobalSettings()

  // Use global settings for colors
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  // Function to convert hex to rgba for transparency
  const hexToRgba = (hex: string, opacity: number): string => {
    // Remove # if present
    hex = hex.replace('#', '')

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    // Return rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // Use reduced opacity for borders
  const borderColorWithOpacity = hexToRgba(primaryColor, 0.08)

  const {
    textColor = primaryColor,
    firstItemTextColor = backgroundColor,
    cardBackgroundColor = backgroundColor,
    accentColor = primaryColor,
  } = appearance || {}

  if (!projects || projects.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff', color: 'red' }}>
        No projects to display
      </div>
    )
  }

  // Function to determine if the project should use the featured layout
  const isFeaturedLayout = (index: number) => {
    return index === 0 || index >= 3 // First item or 4th/5th items
  }

  return (
    <div id={id} style={{ backgroundColor }}>
      <div className="container mx-auto sm:py-6 sm:px-3 md:py-12 md:px-6 max-w-7xl">
        {(heading || description) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg max-w-3xl mx-auto" style={{ color: secondaryColor }}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap flex items-start">
          <div className="flex w-full flex-wrap">
            {projects.slice(0, 5).map((project: any, index: any) => {
              // For 4th and 5th items, we need to adjust the layout
              const isSecondRow = index >= 3

              return (
                <div
                  key={index}
                  className={`${
                    isFeaturedLayout(index)
                      ? isSecondRow
                        ? 'w-full md:w-1/2 mb-4' // 4th & 5th in second row
                        : 'w-full md:w-1/2 mb-4' // 1st item
                      : 'w-full md:w-1/4 mb-4' // 2nd & 3rd items
                  }`}
                >
                  {isFeaturedLayout(index) ? (
                    // Featured layout (1st, 4th, 5th items)
                    <div
                      className="relative h-[360px] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border"
                      style={{
                        borderRadius: '12px',
                        borderWidth: '1px',
                        borderColor: borderColorWithOpacity,
                        borderStyle: 'solid',
                      }}
                    >
                      <Link
                        href={
                          project.link?.type === 'custom'
                            ? project.link.url || '#'
                            : `/${
                                typeof project.link?.reference === 'string'
                                  ? project.link.reference
                                  : project.link?.reference?.id || '#'
                              }`
                        }
                        className="block h-full"
                      >
                        {project.image && (
                          <div className="absolute inset-0">
                            <img
                              src={
                                typeof project.image === 'string'
                                  ? project.image
                                  : project.image.url
                              }
                              alt={project.title}
                              className="w-full h-full object-cover"
                              width="auto"
                              height="auto"
                            />
                          </div>
                        )}
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <div className="mb-3">
                            <span
                              className="text-sm font-semibold py-1 rounded-md"
                              style={{
                                color: backgroundColor,
                              }}
                            >
                              {project.category || 'Theme'}
                            </span>
                          </div>
                          <h3
                            className="text-xl md:text-2xl font-bold mb-2"
                            style={{ color: backgroundColor }}
                          >
                            {project.title}
                          </h3>
                          {project.description && (
                            <p
                              style={{ color: backgroundColor, opacity: 0.8 }}
                              className="text-base line-clamp-2 mb-2"
                            >
                              {project.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ) : (
                    // Regular layout (2nd & 3rd items)
                    <div
                      className="h-full rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl border"
                      style={{
                        backgroundColor: cardBackgroundColor,
                        borderRadius: '12px',
                        height: '360px',
                        borderWidth: '1px',
                        borderColor: borderColorWithOpacity,
                        borderStyle: 'solid',
                      }}
                    >
                      <Link
                        href={
                          project.link?.type === 'custom'
                            ? project.link.url || '#'
                            : `/${
                                typeof project.link?.reference === 'string'
                                  ? project.link.reference
                                  : project.link?.reference?.id || '#'
                              }`
                        }
                        className="block h-full"
                      >
                        {/* Image section */}
                        <div className="relative h-48 overflow-hidden">
                          {project.image && (
                            <img
                              src={
                                typeof project.image === 'string'
                                  ? project.image
                                  : project.image.url
                              }
                              alt={project.title}
                              className="w-full h-full object-cover"
                              width="auto"
                              height="auto"
                            />
                          )}
                        </div>

                        {/* Content section */}
                        <div className="p-5">
                          {/* Category badge - Now above title */}
                          <div className="mb-3">
                            <span
                              className="text-xs font-semibold py-1 rounded-md"
                              style={{ color: primaryColor }}
                            >
                              {project.category || 'Theme'}
                            </span>
                          </div>

                          <h3 className="text-lg mb-2" style={{ color: primaryColor }}>
                            {project.title}
                          </h3>

                          {project.description && (
                            <p
                              className="text-sm line-clamp-2"
                              style={{ color: primaryColor, opacity: 0.7 }}
                            >
                              {project.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
