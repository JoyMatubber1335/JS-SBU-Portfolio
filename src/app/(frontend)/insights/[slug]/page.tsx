import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import InsightDetail from '@/components/ui/InsightDetail'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const { slug = 'insights' } = await params

  const { docs } = await payload.find({
    collection: 'insights',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const insight = docs[0]

  if (!insight) {
    return {
      title: 'Insight Not Found',
    }
  }

  return {
    title: `${insight.title} | ${insight.type === 'blog' ? 'Tech Blog' : 'Tutorial'}`,
    description: insight.summary,
  }
}

export default async function InsightPage({ params }: Props) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const { slug = 'insights' } = await params
  const { docs } = await payload.find({
    collection: 'insights',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft,
    depth: 2, // Include related data like author and skills
    limit: 1,
  })

  const insight = docs[0]

  if (!insight) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10">
      <InsightDetail insight={insight} />
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'insights',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}
