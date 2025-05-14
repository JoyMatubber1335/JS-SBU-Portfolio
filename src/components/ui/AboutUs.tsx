'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'
import { motion } from 'framer-motion'

type Feature = {
  icon?: { url: string }
  lineLength?: number
  description?: string | { root?: any }
  title?: string // Adding title to features
}

type AboutUsProps = {
  heading: string
  description: string
  features: Feature[]
  logo?: { url: string }
  stats?: Array<{
    value: string
    label: string
  }>
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

export const AboutUs: React.FC<AboutUsProps> = ({ 
  heading, 
  description, 
  features, 
  logo,
  stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' }
  ] // Default stats if none provided
}) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-card/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 dark:opacity-[0.03]">
          <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {logo?.url && (
            <div className="flex justify-center mb-6">
              <Image 
                src={logo.url} 
                alt="Company Logo" 
                width={120} 
                height={120}
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2 inline-block">{heading}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">{description}</p>
        </motion.div>

       

        {/* Features Section */}
        <div className="relative mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What Sets Us Apart</h3>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                ref={el => featureRefs.current[i] = el}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/60 rounded-2xl transform rotate-1 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-all duration-300"></div>
                <div className="bg-card backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center justify-center h-24 bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                    {feature.icon?.url && (
                      <Image 
                        src={feature.icon.url} 
                        alt={feature.title || 'Feature'} 
                        width={60} 
                        height={60}
                        className="transition-all duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-6 flex-grow">
                    {feature.title && (
                      <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
                    )}
                    {feature.description && (
                      <p className="text-muted-foreground text-sm">
                        {extractTextFromDescription(feature.description)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-xl p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  {feature.icon?.url && (
                    <div className="flex-shrink-0 bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-full">
                      <Image 
                        src={feature.icon.url} 
                        alt={feature.title || 'Feature'} 
                        width={40} 
                        height={40} 
                      />
                    </div>
                  )}
                  <div>
                    {feature.title && (
                      <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                    )}
                    {feature.description && (
                      <p className="text-muted-foreground text-sm">
                        {extractTextFromDescription(feature.description)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-primary/20"
          >
            Get in Touch
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
