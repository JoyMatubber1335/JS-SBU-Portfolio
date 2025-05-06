'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Testimonial = {
  text: string
  author: string
}

export const TeamImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  testimonials,
  testimonialStyle,
  teamContent,
}) => {
  // Default heading and description values
  const heading = teamContent?.heading || 'In Need of Highly Skilled Developers at a Lower Cost?'
  const description =
    teamContent?.description ||
    'We provide you with a dedicated remote development team with some of the top developers in Bangladesh!'
  const headingSize = teamContent?.headingSize || '5xl'
  const headingColor = teamContent?.headingColor || '#334155'
  const descriptionSize = teamContent?.descriptionSize || 'lg'
  const descriptionColor = teamContent?.descriptionColor || '#4b5563'

  // Button styling options - cast as any to overcome type limitations
  const teamContentExt = teamContent as any
  const buttonType = teamContentExt?.buttonType || 'solid'
  const buttonBgColor = teamContentExt?.buttonBgColor || '#10b981'
  const buttonTextColor = teamContentExt?.buttonTextColor || '#ffffff'
  const buttonFontSize = teamContentExt?.buttonFontSize || 'text-base'
  const buttonBorderRadius = teamContentExt?.buttonBorderRadius || 'rounded-md'
  const buttonHoverBgColor = teamContentExt?.buttonHoverBgColor || '#059669'
  const buttonBorderColor = teamContentExt?.buttonBorderColor || '#10b981'

  // Font styling options
  const fontFamily = teamContentExt?.fontFamily || 'font-sans'

  // Default testimonial style values
  const textSize = testimonialStyle?.textSize || 'base'
  const textColor = testimonialStyle?.textColor || '#374151'
  const authorColor = testimonialStyle?.authorColor || '#1f2937'
  const borderColor = testimonialStyle?.borderColor || '#1e3a8a'
  const backgroundColor = testimonialStyle?.backgroundColor || '#ffffff'
  const transitionDuration = testimonialStyle?.transitionDuration || '500'
  const autoplay = testimonialStyle?.autoplay ?? true
  const interval = (testimonialStyle?.interval || 5) * 1000

  // Define default testimonial that will always be available
  const defaultTestimonial: Testimonial = {
    text: 'Cefalo´s business model was what we needed to give it a try. It has worked beyond belief for us!',
    author: 'Leif Arild Åsheim, CEO | Promineo',
  }

  // Prepare testimonials array with type safety
  const allTestimonials: Testimonial[] = React.useMemo(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      const validTestimonials = testimonials
        .filter((t) => t && typeof t.text === 'string' && typeof t.author === 'string')
        .map((t) => ({ text: t.text, author: t.author }))

      return validTestimonials.length > 0 ? validTestimonials : [defaultTestimonial]
    }
    return [defaultTestimonial]
  }, [testimonials])

  // State for the current testimonial index and animation
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Refs for animation control
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Always ensure the current index is valid
  useEffect(() => {
    if (currentIndex >= allTestimonials.length) {
      setCurrentIndex(0)
    }
  }, [allTestimonials, currentIndex])

  // Get the proper text size class for testimonial
  const getTextSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'base':
        return 'text-base'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      default:
        return 'text-base'
    }
  }

  // Get heading size class
  const getHeadingSizeClass = (size?: string | null): string => {
    switch (size) {
      case '3xl':
        return 'text-3xl lg:text-3xl'
      case '4xl':
        return 'text-3xl lg:text-4xl'
      case '5xl':
        return 'text-4xl lg:text-5xl'
      case '6xl':
        return 'text-5xl lg:text-6xl'
      default:
        return 'text-4xl lg:text-5xl'
    }
  }

  // Add this helper function near your other helpers
  const getHeadingSizeInPx = (size?: string | null): string => {
    switch (size) {
      case '3xl':
        return '1.875rem' // text-3xl equivalent
      case '4xl':
        return '2.25rem' // text-4xl equivalent
      case '5xl':
        return '3rem' // text-5xl equivalent
      case '6xl':
        return '3.75rem' // text-6xl equivalent
      default:
        return '3rem' // text-5xl default
    }
  }

  // Handle changing to next testimonial with animation
  const handleNextTestimonial = useCallback(() => {
    if (isAnimating || allTestimonials.length <= 1) return

    setIsAnimating(true)

    // Wait for fade out before changing content
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length)
      setIsAnimating(false)
    }, parseInt(transitionDuration))

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [allTestimonials.length, isAnimating, transitionDuration])

  // Go to a specific testimonial
  const goToTestimonial = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex || allTestimonials.length <= 1) return

      setIsAnimating(true)

      // Wait for fade out before changing content
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(index)
        setIsAnimating(false)
      }, parseInt(transitionDuration))

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    },
    [currentIndex, allTestimonials.length, isAnimating, transitionDuration],
  )

  // Auto-advance testimonials if autoplay is enabled
  useEffect(() => {
    if (!autoplay || allTestimonials.length <= 1) return

    const timer = setInterval(() => {
      handleNextTestimonial()
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, interval, handleNextTestimonial, allTestimonials.length])

  // Add this useEffect to ensure heading color is applied after render
  useEffect(() => {
    const headingElement = document.querySelector('.hero-heading')
    if (headingElement) {
      headingElement.setAttribute(
        'style',
        `color: ${headingColor} !important; font-size: ${getHeadingSizeInPx(headingSize)}`,
      )
    }
  }, [headingColor, headingSize])

  // Current testimonial is guaranteed to be defined now
  const currentTestimonial = allTestimonials[currentIndex] || defaultTestimonial
  console.log('Current heading color:', headingColor)

  return (
    <div className="py-16">
      <div className="container">
        {/* Global styles - consolidate all in one block */}
        <style jsx global>{`
          /* Heading styles */
          .hero-heading {
            font-weight: bold;
            margin-bottom: 1.5rem;
          }

          /* Button styles */
          .custom-button {
            display: inline-block;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            color: ${buttonTextColor};
            font-weight: 500;
          }
          .custom-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${buttonType === 'outline' ? 'transparent' : buttonBgColor};
            z-index: -1;
            transition: background-color 0.3s ease;
          }
          .custom-button:hover::before {
            background-color: ${buttonHoverBgColor};
          }
          .custom-button-wrapper {
            display: inline-block;
            border: ${buttonType === 'outline' ? `2px solid ${buttonBorderColor}` : 'none'};
          }

          /* Testimonial styles */
          .testimonial-card {
            position: relative;
            min-height: 130px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            background-color: ${backgroundColor};
            border-left: 4px solid ${borderColor};
          }
          .testimonial-text {
            margin-bottom: 1rem;
            color: ${textColor};
          }
          .testimonial-author {
            font-weight: 600;
            color: ${authorColor};
          }
          .dot-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            outline: none;
          }
          .dot-active {
            background-color: ${buttonHoverBgColor};
          }
          .dot-inactive {
            background-color: ${buttonBgColor};
            opacity: 0.4;
          }
        `}</style>

        {/* Top section with heading, description, CTA, and image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left side - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className={`hero-heading ${fontFamily}`}>{heading}</h1>
              <p
                className={`${getTextSizeClass(descriptionSize)} mb-10 ${fontFamily}`}
                style={{ color: descriptionColor }}
              >
                {description}
              </p>

              {Array.isArray(links) && links.length > 0 && links[0]?.link && (
                <div>
                  <div className={`custom-button-wrapper ${buttonBorderRadius}`}>
                    <CMSLink
                      {...links[0].link}
                      className={`custom-button ${buttonFontSize} ${fontFamily}`}
                    />
                  </div>
                </div>
              )}

              {/* Testimonial slideshow */}
              <div className="mt-10">
                <div className="testimonial-card">
                  <div
                    className={`${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    style={{ transitionDuration: `${transitionDuration}ms` }}
                  >
                    <p className={`testimonial-text ${getTextSizeClass(textSize)} ${fontFamily}`}>
                      {currentTestimonial.text}
                    </p>
                    <p className={`testimonial-author ${fontFamily}`}>
                      {currentTestimonial.author}
                    </p>
                  </div>
                </div>

                {/* Indicator Dots (only when multiple testimonials) */}
                {allTestimonials.length > 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    {allTestimonials.map((_, index) => {
                      const isActive = index === currentIndex
                      return (
                        <button
                          key={index}
                          onClick={() => goToTestimonial(index)}
                          className={`dot-indicator ${isActive ? 'dot-active' : 'dot-inactive'}`}
                          aria-label={`Go to testimonial ${index + 1}`}
                          disabled={isAnimating}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div>
            {media && typeof media === 'object' && (
              <div className="rounded-lg overflow-hidden shadow-xl bg-gray-100">
                <Media imgClassName="w-full h-full object-cover" priority resource={media} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
