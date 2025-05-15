'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'
import { motion } from 'framer-motion'

type Feature = {
  icon?: { url: string }
  lineLength?: number
  description?: string | { root?: any }
  title?: string
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

export const AboutUs: React.FC<AboutUsProps> = ({ 
  heading, 
  description, 
  features, 
  logo
}) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  
  // Get global settings for colors
  const { settings } = useGlobalSettings()

  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2) rotate(0)">
              <path d="M25,3.4 L44.6,15 L44.6,38.4 L25,50 L5.4,38.4 L5.4,15 L25,3.4 z" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {logo?.url && (
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-white rounded-2xl shadow-xl">
                <Image 
                  src={logo.url} 
                  alt="Company Logo" 
                  width={140} 
                  height={140}
                  className="rounded-xl"
                />
              </div>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 pb-2 inline-block relative">
            {heading}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-700 mt-8 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Services Section Title */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 relative inline-block pb-3">
            Our Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-indigo-600 rounded-full"></span>
          </h3>
        </div>
        
        {/* Features/Services Section - Card Design */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                  {/* Icon with Circle */}
                  <div className="flex justify-center mt-4">
                    <div className="w-40 h-40 flex items-center justify-center bg-white rounded-full border-2 border-indigo-500 p-4 shadow-md">
                      {feature.icon?.url ? (
                        <Image 
                          src={feature.icon.url} 
                          alt={feature.title || 'Feature'} 
                          width={100} 
                          height={100}
                          className="transition-all duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-indigo-100 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-8 pt-8 flex-grow text-center">
                    {feature.title && (
                      <h4 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h4>
                    )}
                    {feature.description && (
                      <p className="text-gray-600">
                        {extractTextFromDescription(feature.description)}
                      </p>
                    )}
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-600 w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-16 px-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon with Circle - Centered at top */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border-2 border-indigo-500 p-3 shadow-md">
                    {feature.icon?.url ? (
                      <Image 
                        src={feature.icon.url} 
                        alt={feature.title || 'Feature'} 
                        width={36} 
                        height={36}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-indigo-100 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="text-center pt-10">
                  {feature.title && (
                    <h4 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h4>
                  )}
                  {feature.description && (
                    <p className="text-gray-600">
                      {extractTextFromDescription(feature.description)}
                    </p>
                  )}
                </div>
                
                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 w-full absolute bottom-0 left-0 rounded-b-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-colors duration-300 shadow-lg group"
          >
            Get in Touch
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
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