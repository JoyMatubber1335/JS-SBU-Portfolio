import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { ProjectsList } from './ProjectsList'
import configPromise from '@payload-config'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View my portfolio projects',
}

export default async function Projects() {
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: 'order',
  })

  if (!projects) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <ProjectsList projects={projects} />
    </div>
  )
} 