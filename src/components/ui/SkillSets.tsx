'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'

type SkillSet = {
  id: string
  title: string
  description: string | any[]
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillTypes = Array.from(new Set(skillSets.map(skill => skill.skillType)));
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredSkills = activeFilter 
    ? skillSets.filter(skill => skill.skillType === activeFilter) 
    : skillSets;

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-black pb-2 inline-block">Our Skill Sets</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto my-4"></div>
          <p className="text-lg text-black mt-4 max-w-2xl mx-auto">
            Areas of expertise and professional capabilities honed through years of experience
          </p>
        </div>

        {/* Skill Type Filters */}
        {skillTypes.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === null
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-black'
              }`}
            >
              All Skills
            </button>
            {skillTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === type
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-black'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative"
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl transform rotate-1 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-all duration-300"></div>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {skill.featuredImage?.url && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={skill.featuredImage.url}
                      alt={skill.title}
                      fill
                      className="object-contain transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="inline-block px-3 py-1 bg-indigo-500/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {skill.skillType}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-indigo-600 transition-colors">{skill.title}</h3>
                  <div 
                    className="prose mb-4 text-black flex-grow" 
                    dangerouslySetInnerHTML={{ 
                      __html: typeof skill.description === 'string' 
                        ? skill.description 
                        : Array.isArray(skill.description) 
                          ? skill.description.map((node: any) => 
                              node.children?.map((child: any) => child.text).join('') || ''
                            ).join('') 
                          : '' 
                    }} 
                  />

                  {skill.technologies && skill.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-black text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
                          >
                            {tech.technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.relatedBlogPosts && skill.relatedBlogPosts.length > 0 && (
                    <div className={`mt-4 overflow-hidden transition-all duration-300 ${
                      hoveredSkill === skill.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <h4 className="text-sm font-semibold mb-2 flex items-center text-black">
                        <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        Related Articles
                      </h4>
                      <ul className="space-y-1 pl-4">
                        {skill.relatedBlogPosts.map((post) => (
                          <li key={post.id} className="relative before:absolute before:content-[''] before:w-1 before:h-1 before:bg-indigo-500 before:rounded-full before:left-[-0.75rem] before:top-[0.5rem]">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm transition-colors"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillSets 