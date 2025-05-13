import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import InsightsGrid from '@/components/ui/InsightsGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights - Tech Blogs & Tutorials',
  description: 'Explore technical blogs and video tutorials on full-stack development, architecture, cloud computing, and more.',
}

export default async function InsightsPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch all insights ordered by publishedAt date
  const { docs: insights } = await payload.find({
    collection: 'insights',
    sort: '-publishedAt', // Sort by newest first
    depth: 2, // Include related data
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <InsightsGrid insights={insights} />
    </div>
  )
} 