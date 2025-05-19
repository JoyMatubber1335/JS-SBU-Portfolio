import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const project = await payload.findByID({
      collection: 'projects',
      id: params.id,
    })
    
    return {
      title: `${project.title} | Project`,
      description: project.description ? 'Project details' : undefined,
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found',
    }
  }
}

export default async function ProjectDetail({ params }: Props) {
  const payload = await getPayload({ config: configPromise })
  
  let project
  
  try {
    project = await payload.findByID({
      collection: 'projects',
      id: params.id,
    })
  } catch (error) {
    return notFound()
  }

  if (!project) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/projects" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Projects
        </Link>
        
        {/* Project title and status */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-black">{project.title}</h1>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed'
                ? 'bg-green-500 text-black'
                : 'bg-yellow-500 text-black'
            }`}
          >
            {project.status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        </div>
        
        {/* Featured image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="relative h-[400px] w-full">
            {project.featuredImage && typeof project.featuredImage !== 'string' ? (
              <Image
                src={project.featuredImage.url || ''}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black">No image available</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                {tech.technology}
              </span>
            ))}
          </div>
        </div>
        
        {/* Project description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black">About This Project</h2>
          <div className="prose prose-blue max-w-none text-black">
            <RichText data={project.description} />
          </div>
        </div>
        
        {/* Project links */}
        <div className="flex gap-4 mt-8">
          {project.projectUrl && (
            <Link
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-indigo-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Visit Live Project
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 