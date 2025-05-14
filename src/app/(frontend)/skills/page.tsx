import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SkillSets } from '@/components/ui/SkillSets'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Skill Sets',
  description: 'Explore my areas of expertise and professional capabilities',
}

export default async function SkillsPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch all skill sets ordered by order field
  const { docs: skillSets } = await payload.find({
    collection: 'skillsets',
    sort: 'order',
    depth: 2, // Include related blog posts
  })

  return (
    <div className="min-h-screen">
      <SkillSets skillSets={skillSets} />
    </div>
  )
} 