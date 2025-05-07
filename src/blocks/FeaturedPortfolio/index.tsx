'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

export const FeaturedPortfolio: React.FC<Props> = ({
  heading = 'Featured Portfolio Projects',
  description = 'Check out our spotlighted case studies that showcase our expertise and capabilities.',
  projects = [],
  appearance = {},
  id,
}) => {
  const {
    textColor = '#333333',
    firstItemTextColor = '#ffffff',
    cardBackgroundColor = '#ffffff',
    accentColor = '#3b82f6',
  } = appearance || {}

  console.log('FeaturedPortfolio rendered with projects:', projects.length)

  if (!projects || projects.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff', color: 'red' }}>
        No projects to display
      </div>
    )
  }

  return (
    <div id={id}>
      <div className="container mx-auto px-4 max-w-7xl">
        {(heading || description) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg max-w-3xl mx-auto" style={{ color: textColor }}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap -mx-4 flex items-center" style={{ height: '100vh' }}>
          <div className="flex w-full">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={index}
                className={`px-2 ${index === 0 ? 'w-full md:w-1/2' : 'w-full md:w-1/4'}`}
              >
                {index === 0 ? (
                  // First item with overlay (50% width)
                  <div className="relative h-[460px] rounded-lg overflow-hidden">
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
                              typeof project.image === 'string' ? project.image : project.image.url
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
                              color: firstItemTextColor,
                            }}
                          >
                            {project.category || 'Theme'}
                          </span>
                        </div>
                        <h3
                          className="text-xl md:text-2xl font-bold mb-2"
                          style={{ color: firstItemTextColor }}
                        >
                          {project.title}
                        </h3>
                        {project.description && (
                          <p
                            style={{ color: firstItemTextColor, opacity: 0.8 }}
                            className="text-base mb-4"
                          >
                            {project.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ) : (
                  // Second & third items with content below (25% width each)
                  <div
                    className="h-full rounded-lg overflow-hidden shadow-sm"
                    style={{ backgroundColor: cardBackgroundColor }}
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
                      <div className="relative h-64 overflow-hidden">
                        {project.image && (
                          <img
                            src={
                              typeof project.image === 'string' ? project.image : project.image.url
                            }
                            alt={project.title}
                            className="w-full h-full object-cover"
                            width="auto"
                            height="auto"
                          />
                        )}
                        {/* Global tag if needed */}
                        {project.isGlobal && (
                          <div className="absolute top-4 left-4 z-30 bg-white py-1 px-3 rounded-full flex items-center">
                            <span className="text-xs font-medium">GLOBAL</span>
                          </div>
                        )}
                      </div>

                      {/* Content section */}
                      <div className="p-5">
                        {/* Category badge - Now above title */}
                        <div className="mb-3">
                          <span
                            className="text-xs font-semibold py-1 rounded-md"
                            style={{ color: textColor }}
                          >
                            {project.category || 'Theme'}
                          </span>
                        </div>

                        <h3 className="text-lg mb-2" style={{ color: textColor }}>
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                            {project.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
