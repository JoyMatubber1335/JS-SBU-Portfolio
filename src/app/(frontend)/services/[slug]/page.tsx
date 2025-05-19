import React from 'react'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({ params }): Promise<Metadata> {
  if (!params.slug || params.slug === 'undefined') {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  const payload = await getPayload({ config: configPromise })
  
  // Fetch the about data
  const { docs } = await payload.find({
    collection: 'about',
    limit: 1,
    depth: 2,
  })
  
  const aboutData = docs[0]
  if (!aboutData?.features) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  // Try to find service by title first
  let service = aboutData.features.find(f => f.title?.toLowerCase().replace(/\s+/g, '-') === params.slug)
  
  // If not found by title, try to find by index (for services without titles)
  if (!service && params.slug.startsWith('service-')) {
    const index = parseInt(params.slug.split('-')[1]) - 1
    if (!isNaN(index) && index >= 0 && index < aboutData.features.length) {
      service = aboutData.features[index]
    }
  }
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  return {
    title: `${service.title || `Service ${params.slug.split('-')[1]}`} - JS SBU Services`,
    description: typeof service.description === 'string' ? service.description : 'Learn more about our services at JS SBU',
  }
}

export default async function ServicePage({ params }) {
  if (!params.slug || params.slug === 'undefined') {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })
  
  // Fetch the about data
  const { docs } = await payload.find({
    collection: 'about',
    limit: 1,
    depth: 2,
  })
  
  const aboutData = docs[0]
  if (!aboutData?.features) {
    notFound()
  }

  // Try to find service by title first
  let service = aboutData.features.find(f => f.title?.toLowerCase().replace(/\s+/g, '-') === params.slug)
  
  // If not found by title, try to find by index (for services without titles)
  if (!service && params.slug.startsWith('service-')) {
    const index = parseInt(params.slug.split('-')[1]) - 1
    if (!isNaN(index) && index >= 0 && index < aboutData.features.length) {
      service = aboutData.features[index]
    }
  }
  
  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            {service.icon?.url && (
              <div className="relative w-full h-96 bg-gray-50 flex items-center justify-center">
                <Image
                  src={service.icon.url}
                  alt={service.title || `Service ${params.slug.split('-')[1]}`}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <h1 className="text-4xl font-bold text-black mb-8">
                {service.title || `Service ${params.slug.split('-')[1]}`}
              </h1>
              
              {service.description && (
                <div className="prose prose-lg text-black">
                  {typeof service.description === 'string' ? (
                    <p>{service.description}</p>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: service.description }} />
                  )}
                </div>
              )}

              <div className="mt-8 text-center">
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
                >
                  Back to Services
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 