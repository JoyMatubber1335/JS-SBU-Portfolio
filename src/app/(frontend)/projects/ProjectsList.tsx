'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/payload-types'
import RichText from '@/components/RichText'
import { motion } from 'framer-motion'

interface ProjectsListProps {
  projects: Project[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 py-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
              {project.featuredImage && typeof project.featuredImage !== 'string' ? (
                <Image
                  src={project.featuredImage.url || ''}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <span className="text-black">No image available</span>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                    project.status === 'completed'
                      ? 'bg-green-500 text-black'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-black">
                {project.title}
              </h2>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-gray-200 text-black px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {tech.technology}
                  </span>
                ))}
              </div>
              
              {/* Description - Truncated */}
              <div className="prose mb-6 text-black max-w-none text-sm line-clamp-3 text-black">
                <RichText data={project.description} className="text-black" />
              </div>
              
              {/* Links */}
              <div className="flex gap-3 mt-4">
                {project.projectUrl && (
                  <Link
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Project
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 