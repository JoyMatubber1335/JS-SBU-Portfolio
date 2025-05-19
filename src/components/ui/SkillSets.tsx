/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
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
  skillSets: SkillSet[] | any
}

export const SkillSets: React.FC<SkillSetsProps> = ({ skillSets }) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const skillTypes = Array.from(new Set(skillSets.map((skill: any) => skill.skillType)))
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Colors for the circles
  const circleColors = [
    '#4fc1b7', // teal
    '#fac174', // orange
    '#f47eab', // pink
    '#5b7cfa', // blue
    '#b76cfa', // purple
    '#f8e45c', // yellow
  ]

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkIsMobile()

    // Add resize listener
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const filteredSkills = activeFilter
    ? skillSets.filter((skill: any) => skill.skillType === activeFilter)
    : skillSets

  // Helper to extract text from rich description
  const extractTextFromDescription = (desc: any): string => {
    if (typeof desc === 'string') return desc
    if (desc?.root?.children) {
      return desc.root.children
        .map((child: any) =>
          Array.isArray(child.children)
            ? child.children.map((c: any) => c.text || '').join('')
            : child.text || '',
        )
        .join(' ')
    }
    return ''
  }

  // Close active skill when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.skill-circle') && !target.closest('.skill-detail')) {
        setActiveSkill(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
            Professional Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-black mt-2 leading-tight">
            Skills Framework
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto my-6"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Core competencies and specialized capabilities developed through industry experience
          </p>
        </div>

        {/* Skill Type Filters */}
        {skillTypes.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === null
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Skills
            </button>
            {skillTypes.map((type: any) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === type
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {/* Circular Hub-and-Spoke Layout - Desktop */}
        {!isMobile && (
          <div className="hidden md:block relative">
            <div className="skills-framework-container">
              {/* Background decorative elements */}
              <div className="skills-bg-circle"></div>
              <div className="skills-bg-ring"></div>

              {/* Central Hub */}
              <div className="skills-framework-hub">
                <div className="text-center p-4">
                  <h3 className="text-2xl font-bold text-black mb-1">Skills</h3>
                  <p className="text-sm text-gray-500">Framework</p>
                </div>
              </div>

              {/* Surrounding Skills Circles */}
              {filteredSkills.map((skill: any, index: any) => {
                const isActive = activeSkill === skill.id
                const angle = (360 / filteredSkills.length) * index
                const circleColor = circleColors[index % circleColors.length]

                return (
                  <div
                    key={skill.id}
                    className={`skill-circle cursor-pointer transition-all duration-300 ${isActive ? 'active pulse' : ''}`}
                    style={{
                      backgroundColor: circleColor,
                      transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`,
                    }}
                    onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                  >
                    <div className="skill-circle-content flex flex-col items-center justify-center text-center p-4">
                      <div className="skill-circle-inner">
                        <h3 className="text-base font-bold text-white mb-2">{skill.title}</h3>
                        <div className="skill-subtitle text-xs text-white opacity-90 line-clamp-2">
                          {typeof skill.description === 'string'
                            ? skill.description.slice(0, 60) + '...'
                            : extractTextFromDescription(skill.description).slice(0, 60) + '...'}
                        </div>
                      </div>
                    </div>

                    {/* Connection line */}
                    <div
                      className="skill-connection-line"
                      style={{ backgroundColor: circleColor }}
                    ></div>

                    {/* Expanded Content */}
                    {isActive && (
                      <div className="skill-detail fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg w-full mx-auto animate-scale-in">
                          <div className="h-3" style={{ backgroundColor: circleColor }}></div>
                          <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center">
                                {skill.featuredImage?.url && (
                                  <div
                                    className="w-14 h-14 relative mr-4 rounded-lg overflow-hidden border-2"
                                    style={{ borderColor: circleColor }}
                                  >
                                    <Image
                                      src={skill.featuredImage.url}
                                      alt={skill.title}
                                      fill
                                      className="object-cover p-2"
                                    />
                                  </div>
                                )}
                                <div>
                                  <h2 className="text-2xl font-bold text-black">{skill.title}</h2>
                                  <span
                                    className="text-xs font-medium px-3 py-1 rounded-full"
                                    style={{
                                      color: circleColor,
                                      backgroundColor: `${circleColor}15`,
                                    }}
                                  >
                                    {skill.skillType}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveSkill(null)
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="prose prose-sm text-gray-700 mb-6">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    typeof skill.description === 'string'
                                      ? skill.description
                                      : Array.isArray(skill.description)
                                        ? skill.description
                                            .map(
                                              (node: any) =>
                                                node.children
                                                  ?.map((child: any) => child.text)
                                                  .join('') || '',
                                            )
                                            .join('')
                                        : '',
                                }}
                              />
                            </div>

                            {skill.technologies && skill.technologies.length > 0 && (
                              <div className="mb-6">
                                <h3 className="text-sm font-semibold mb-3 text-black border-b border-gray-100 pb-1">
                                  Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {skill.technologies.map((tech: any, index: any) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-gray-50 text-black text-xs rounded-full border border-gray-200"
                                    >
                                      {tech.technology}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {skill.relatedBlogPosts && skill.relatedBlogPosts.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold mb-3 text-black border-b border-gray-100 pb-1">
                                  Related Articles
                                </h3>
                                <ul className="space-y-2 mt-3">
                                  {skill.relatedBlogPosts.map((post: any) => (
                                    <li key={post.id} className="text-sm">
                                      <Link
                                        href={`/blog/${post.slug}`}
                                        className="hover:underline flex items-center"
                                        style={{ color: circleColor }}
                                      >
                                        <svg
                                          className="w-3 h-3 mr-2"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
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
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Mobile view - Card Layout */}
        {isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredSkills.map((skill: any, index: any) => {
              const circleColor = circleColors[index % circleColors.length]

              return (
                <div
                  key={skill.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                >
                  <div className="h-2" style={{ backgroundColor: circleColor }}></div>
                  <div className="relative p-5 flex items-center">
                    <div
                      className="w-14 h-14 rounded-lg flex-shrink-0 mr-4 flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: circleColor }}
                    >
                      {skill.featuredImage?.url ? (
                        <div className="w-8 h-8 relative">
                          <Image
                            src={skill.featuredImage.url}
                            alt={skill.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <span className="text-white text-lg font-bold">•</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black">{skill.title}</h3>
                      <span
                        className="text-xs inline-block px-2 py-0.5 rounded-full"
                        style={{
                          color: circleColor,
                          backgroundColor: `${circleColor}15`,
                        }}
                      >
                        {skill.skillType}
                      </span>
                    </div>
                  </div>

                  {activeSkill === skill.id && (
                    <div className="p-5 border-t border-gray-100">
                      <div className="prose prose-sm text-gray-700 mb-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              typeof skill.description === 'string'
                                ? skill.description
                                : Array.isArray(skill.description)
                                  ? skill.description
                                      .map(
                                        (node: any) =>
                                          node.children?.map((child: any) => child.text).join('') ||
                                          '',
                                      )
                                      .join('')
                                  : '',
                          }}
                        />
                      </div>

                      {skill.technologies && skill.technologies.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold mb-2 text-gray-500">Technologies</h4>
                          <div className="flex flex-wrap gap-1">
                            {skill.technologies.slice(0, 4).map((tech: any, index: any) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-50 text-black text-xs rounded-full border border-gray-200"
                              >
                                {tech.technology}
                              </span>
                            ))}
                            {skill.technologies.length > 4 && (
                              <span className="px-2 py-0.5 bg-gray-50 text-black text-xs rounded-full border border-gray-200">
                                +{skill.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {skill.relatedBlogPosts && skill.relatedBlogPosts.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <h4 className="text-xs font-semibold mb-2 text-gray-500">
                            Related Articles
                          </h4>
                          <ul className="space-y-1">
                            {skill.relatedBlogPosts.slice(0, 2).map((post: any) => (
                              <li key={post.id} className="text-sm">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="hover:underline flex items-center"
                                  style={{ color: circleColor }}
                                >
                                  <svg
                                    className="w-3 h-3 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {post.title}
                                </Link>
                              </li>
                            ))}
                            {skill.relatedBlogPosts.length > 2 && (
                              <li className="text-xs text-gray-500">
                                And {skill.relatedBlogPosts.length - 2} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* CSS for Circle Hub Layout */}
      <style jsx global>{`
        .skills-framework-container {
          position: relative;
          width: 600px;
          height: 600px;
          margin: 0 auto;
        }

        .skills-bg-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px dashed rgba(203, 213, 225, 0.6);
          z-index: 1;
        }

        .skills-bg-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 1px dashed rgba(203, 213, 225, 0.4);
          z-index: 1;
        }

        .skills-framework-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 160px;
          background: linear-gradient(135deg, #f9f9f9, #ffffff);
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .skill-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 130px;
          height: 130px;
          margin: -65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 5;
          color: white;
          text-align: center;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .skill-circle.active {
          z-index: 20;
        }

        .skill-circle-inner {
          width: 100%;
          height: 100%;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .skill-subtitle {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-connection-line {
          position: absolute;
          top: 50%;
          left: 5%;
          width: 20px;
          height: 2px;
          transform: translateX(-100%) translateY(-50%);
          opacity: 0.5;
          display: none;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @media (max-width: 768px) {
          .skills-framework-container {
            width: 400px;
            height: 400px;
          }

          .skills-framework-hub {
            width: 120px;
            height: 120px;
          }

          .skill-circle {
            width: 100px;
            height: 100px;
            margin: -50px;
          }
        }

        @media (max-width: 640px) {
          .skills-framework-container {
            width: 300px;
            height: 300px;
          }

          .skills-framework-hub {
            width: 100px;
            height: 100px;
          }

          .skill-circle {
            width: 80px;
            height: 80px;
            margin: -40px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  )
}

export default SkillSets
