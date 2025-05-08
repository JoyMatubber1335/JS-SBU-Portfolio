'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

// Define slide types
type SlideType = 'motto' | 'product' | 'services'

// Slide data type from CMS
type SlideData = {
  id?: string | null
  slideType: SlideType
  motto?: string | null
  productTitle?: string | null
  productDescription?: string | null
  productImage?: string | any
  servicesContent?: any
  servicesTitle?: string | null
  techStacks?: Array<{
    stackName: string
    stackDescription: string
    technologies: string
  }> | null
}

// Processed slide for internal use
type Slide = {
  slideType: SlideType
  motto?: string
  productTitle?: string
  productDescription?: string
  productImage?: any
  servicesContent?: any
  servicesTitle?: string
  techStacks?: Array<{
    stackName: string
    stackDescription: string
    technologies: string
  }>
}

export const Hero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  testimonials,
  testimonialStyle,
  teamContent,
}) => {
  // Get global settings for colors and fonts
  const { settings } = useGlobalSettings()

  // Default heading and description values
  const heading = teamContent?.heading || 'In Need of Highly Skilled Developers at a Lower Cost?'
  const description =
    teamContent?.description ||
    'We provide you with a dedicated remote development team with some of the top developers in Bangladesh!'
  const headingSize = teamContent?.headingSize || '5xl'
  const descriptionSize = teamContent?.descriptionSize || 'lg'

  // Button styling options - cast as any to overcome type limitations
  const teamContentExt = teamContent as any
  const buttonType = teamContentExt?.buttonType || 'solid'
  const buttonBgColor = teamContentExt?.buttonBgColor || '#10b981'
  const buttonTextColor = teamContentExt?.buttonTextColor || '#ffffff'
  const buttonFontSize = teamContentExt?.buttonFontSize || 'text-base'
  const buttonBorderRadius = teamContentExt?.buttonBorderRadius || 'rounded-md'
  const buttonHoverBgColor = teamContentExt?.buttonHoverBgColor || '#059669'
  const buttonBorderColor = teamContentExt?.buttonBorderColor || '#10b981'

  // Use global settings for colors
  const headingColor = settings?.colorScheme?.primaryColor || '#334155'
  const descriptionColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const bgColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  // Default styling values
  const textSize = testimonialStyle?.textSize || 'base'
  const textColor = settings?.colorScheme?.primaryColor || '#334155'
  const backgroundColor = testimonialStyle?.backgroundColor || bgColor
  const borderColor = testimonialStyle?.borderColor || '#1e3a8a'
  const transitionDuration = testimonialStyle?.transitionDuration || '500'
  const autoplay = testimonialStyle?.autoplay ?? true
  const interval = (testimonialStyle?.interval || 5) * 1000

  // Define default slide
  const defaultSlide: Slide = {
    slideType: 'motto',
    motto: 'Empowering Your Business with Top Talent',
  }

  // Prepare slides array
  const allSlides: Slide[] = React.useMemo(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      const validSlides = testimonials
        .filter((slide: any) => slide && slide.slideType)
        .map((slide: SlideData) => {
          const baseSlide = {
            slideType: slide.slideType || 'motto',
          } as Slide

          // Add type-specific properties
          if (slide.slideType === 'motto' && slide.motto) {
            baseSlide.motto = slide.motto
          } else if (slide.slideType === 'product') {
            baseSlide.productTitle = slide.productTitle || ''
            baseSlide.productDescription = slide.productDescription || ''
            baseSlide.productImage = slide.productImage
          } else if (slide.slideType === 'services') {
            baseSlide.servicesContent = slide.servicesContent
            baseSlide.servicesTitle = slide.servicesTitle || 'Our Services'
            baseSlide.techStacks = slide.techStacks || []
          }

          return baseSlide
        })

      return validSlides.length > 0 ? validSlides : [defaultSlide]
    }
    return [defaultSlide]
  }, [testimonials])

  // State for the current slide index and animation
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Refs for animation control
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Always ensure the current index is valid
  useEffect(() => {
    if (currentIndex >= allSlides.length) {
      setCurrentIndex(0)
    }
  }, [allSlides, currentIndex])

  // Get the proper text size class for text
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

  // Handle changing to next slide with animation
  const handleNextSlide = useCallback(() => {
    if (isAnimating || allSlides.length <= 1) return

    setIsAnimating(true)

    // Wait for fade out before changing content
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allSlides.length)
      setIsAnimating(false)
    }, parseInt(transitionDuration))

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [allSlides.length, isAnimating, transitionDuration])

  // Go to a specific slide
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex || allSlides.length <= 1) return

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
    [currentIndex, allSlides.length, isAnimating, transitionDuration],
  )

  // Auto-advance slides if autoplay is enabled
  useEffect(() => {
    if (!autoplay || allSlides.length <= 1) return

    const timer = setInterval(() => {
      handleNextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, interval, handleNextSlide, allSlides.length])

  // Current slide is guaranteed to be defined now
  const currentSlide = allSlides[currentIndex] || defaultSlide

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

  // Helper function to render rich text content
  const renderRichTextContent = (content: any) => {
    if (!content) return <p>No services information available.</p>

    // Check if the content has the expected rich text structure
    if (
      content &&
      typeof content === 'object' &&
      content.root &&
      Array.isArray(content.root.children)
    ) {
      // Process the rich text content
      const htmlContent = content.root.children.map((node: any, index: number) => {
        if (node.type === 'heading') {
          const headingLevel = parseInt(node.tag.replace('h', ''), 10) || 3
          const headingText = node.children?.map((child: any) => child.text || '').join('') || ''

          if (headingLevel === 1)
            return (
              <h1 key={index} className="services-heading">
                {headingText}
              </h1>
            )
          if (headingLevel === 2)
            return (
              <h2 key={index} className="services-heading">
                {headingText}
              </h2>
            )
          if (headingLevel === 3)
            return (
              <h3 key={index} className="services-heading">
                {headingText}
              </h3>
            )
          if (headingLevel === 4)
            return (
              <h4 key={index} className="services-heading">
                {headingText}
              </h4>
            )
          if (headingLevel === 5)
            return (
              <h5 key={index} className="services-heading">
                {headingText}
              </h5>
            )
          return (
            <h6 key={index} className="services-heading">
              {headingText}
            </h6>
          )
        } else if (node.type === 'paragraph') {
          const paragraphText = node.children?.map((child: any) => child.text || '').join('') || ''
          return (
            <p key={index} className="services-paragraph">
              {paragraphText}
            </p>
          )
        }
        return null
      })

      return <div className="rich-text-content">{htmlContent}</div>
    }

    // Fallback for simple text
    if (typeof content === 'string') {
      return <p>{content}</p>
    }

    return <p>Services information is in an unexpected format.</p>
  }

  return (
    <div style={{ height: '100vh', backgroundColor: bgColor }}>
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
            background-color: ${buttonType === 'outline' ? 'transparent' : buttonBgColor};
          }
          .custom-button:hover::before {
            background-color: ${buttonHoverBgColor};
          }
          .custom-button-wrapper {
            display: inline-block;
            border: ${buttonType === 'outline' ? `2px solid ${buttonBorderColor}` : 'none'};
          }

          /* Slide styles */
          .slide-card {
            position: relative;
            min-height: 150px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            background-color: transparent;
            border-left: 4px solid ${borderColor};
          }

          /* Motto styles */
          .slide-motto {
            font-size: 1.5rem;
            font-weight: 600;
            font-style: italic;
            color: ${settings?.colorScheme?.primaryColor || '#334155'};
            line-height: 1.4;
          }

          /* Product styles */
          .product-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: ${settings?.colorScheme?.primaryColor || '#334155'};
            margin-bottom: 0.75rem;
          }

          .product-description {
            color: ${textColor};
            margin-bottom: 1rem;
          }

          .product-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;
          }

          .product-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 0.5rem;
            overflow: hidden;
          }

          .product-content {
            flex: 1;
            min-width: 200px;
          }

          /* Services styles */
          .services-content h3 {
            color: ${textColor};
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          .services-content p {
            color: ${textColor};
          }

          /* Dot indicator styles */
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

          .services-heading {
            color: ${settings?.colorScheme?.primaryColor || '#334155'};
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
          }

          .services-paragraph {
            color: ${textColor};
            margin-bottom: 1rem;
            font-family: inherit;
          }

          .rich-text-content {
            text-align: left;
            max-width: 800px;
            margin: 0 auto;
          }

          /* Tech Stack styles */
          .tech-stacks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .tech-stack-card {
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .tech-stack-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .stack-name {
            color: ${settings?.colorScheme?.primaryColor || '#334155'};
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .stack-description {
            color: ${textColor};
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
          }

          .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech-tag {
            display: inline-block;
            background-color: rgba(0, 0, 0, 0.05);
            color: ${textColor};
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            white-space: nowrap;
          }
        `}</style>

        {/* Top section with heading, description, CTA, and image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left side - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="max-w-xl p-4">
              <h1 className={`hero-heading`}>{heading}</h1>
              <p
                className={`${getTextSizeClass(descriptionSize)} mb-10`}
                style={{ color: descriptionColor }}
              >
                {description}
              </p>

              {Array.isArray(links) && links.length > 0 && links[0]?.link && (
                <div>
                  <div className={`custom-button-wrapper ${buttonBorderRadius}`}>
                    <CMSLink {...links[0].link} className={`custom-button ${buttonFontSize}`} />
                  </div>
                </div>
              )}

              {/* Slide content */}
              <div className="mt-10">
                <div className="slide-card">
                  <div
                    className={`${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    style={{ transitionDuration: `${transitionDuration}ms` }}
                  >
                    {/* Render appropriate content based on slide type */}
                    {currentSlide.slideType === 'motto' && currentSlide.motto && (
                      <div className={`slide-motto`}>&ldquo;{currentSlide.motto}&rdquo;</div>
                    )}

                    {currentSlide.slideType === 'product' && (
                      <div className="product-container">
                        {currentSlide.productImage && (
                          <div className="product-image">
                            <Media
                              imgClassName="w-full h-full object-cover"
                              resource={currentSlide.productImage}
                            />
                          </div>
                        )}
                        <div className="product-content">
                          <h3 className={`product-title`}>{currentSlide.productTitle}</h3>
                          <p className={`product-description ${getTextSizeClass(textSize)}`}>
                            {currentSlide.productDescription}
                          </p>
                        </div>
                      </div>
                    )}

                    {currentSlide.slideType === 'services' && (
                      <div className={`services-content`}>
                        <h3 className="services-heading">
                          {currentSlide.servicesTitle || 'Our Services'}
                        </h3>

                        {Array.isArray(currentSlide.techStacks) &&
                        currentSlide.techStacks.length > 0 ? (
                          <div className="tech-stacks-grid">
                            {currentSlide.techStacks.map((stack, stackIndex) => (
                              <div key={stackIndex} className="tech-stack-card">
                                <h4 className="stack-name">{stack.stackName}</h4>
                                <p className="stack-description">{stack.stackDescription}</p>
                                <div className="tech-tags">
                                  {stack.technologies.split(',').map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">
                                      {tech.trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : currentSlide.servicesContent ? (
                          renderRichTextContent(currentSlide.servicesContent)
                        ) : (
                          <p>No services information available.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Indicator Dots (only when multiple slides) */}
                {allSlides.length > 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    {allSlides.map((_, index) => {
                      const isActive = index === currentIndex
                      return (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`dot-indicator ${isActive ? 'dot-active' : 'dot-inactive'}`}
                          aria-label={`Go to slide ${index + 1}`}
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
              <div className="rounded-lg flex h-full overflow-hidden shadow-xl bg-gray-100">
                <Media imgClassName="w-full h-full object-cover" priority resource={media} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
