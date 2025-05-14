import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/payload-types'
import RichText from '@/components/RichText'

interface ProjectsListProps {
  projects: Project[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {project.featuredImage && typeof project.featuredImage !== 'string' && (
            <div className="relative h-48 w-full">
              <Image
                src={project.featuredImage.url || ''}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <div className="prose dark:prose-invert mb-4">
              <RichText data={project.description} />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech.technology}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:underline"
                >
                  GitHub
                </Link>
              )}
            </div>
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {project.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      ))}
    
    </div>
  )
} 