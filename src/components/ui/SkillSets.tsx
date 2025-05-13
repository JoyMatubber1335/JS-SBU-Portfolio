import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'

type SkillSet = {
  id: string
  title: string
  description: string
  featuredImage: Media
  skillType: string
  relatedBlogPosts?: Array<{
    id: string
    title: string
    slug: string
  }>
  technologies?: Array<{
    technology: string
  }>
}

type SkillSetsProps = {
  skillSets: SkillSet[]
}

export const SkillSets: React.FC<SkillSetsProps> = ({ skillSets }) => {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">My Skill Sets</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Areas of expertise and professional capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillSets.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              {skill.featuredImage?.url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={skill.featuredImage.url}
                    alt={skill.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <div className="prose dark:prose-invert prose-sm mb-4" 
                  dangerouslySetInnerHTML={{ 
                    __html: typeof skill.description === 'string' 
                      ? skill.description 
                      : Array.isArray(skill.description) 
                        ? skill.description.map(node => node.children?.map(child => child.text).join('')).join('') 
                        : '' 
                  }} 
                />

                {skill.technologies && skill.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                        >
                          {tech.technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skill.relatedBlogPosts && skill.relatedBlogPosts.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Related Articles:</h4>
                    <ul className="space-y-1">
                      {skill.relatedBlogPosts.map((post) => (
                        <li key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillSets 