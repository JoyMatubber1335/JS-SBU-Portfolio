'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'
import VideoEmbed from './VideoEmbed'

type Insight = {
  id: string
  title: string
  type: 'blog' | 'tutorial'
  summary: string
  slug: string
  featuredImage: Media
  tags?: Array<{ tag: string }>
  publishedAt?: string
  author?: {
    id: string
    name: string
  }
  contentType?: 'external' | 'internal'
  externalLink?: string
  videoType?: 'upload' | 'embed'
  videoEmbed?: string
  videoFile?: Media
}

type InsightsGridProps = {
  insights: Insight[]
}

export const InsightsGrid: React.FC<InsightsGridProps> = ({ insights }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'tutorial'>('all')
  
  const filteredInsights = insights.filter(insight => {
    if (activeTab === 'all') return true
    return insight.type === activeTab
  })

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Insights</h2>
          <p className="text-lg text-black mt-2">
            Technical blogs and video tutorials to help you learn and grow
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === 'all'
                  ? 'bg-indigo-500 text-black shadow-lg'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === 'blog'
                  ? 'bg-indigo-500 text-black shadow-lg'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              Tech Blogs
            </button>
            <button
              onClick={() => setActiveTab('tutorial')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === 'tutorial'
                  ? 'bg-indigo-500 text-black shadow-lg'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              Tutorials
            </button>
          </div>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 border border-gray-200"
            >
              {/* For tutorials with video embeds, show the video thumbnail with a play button overlay */}
              {insight.type === 'tutorial' && insight.videoType === 'embed' && insight.videoEmbed ? (
                <div className="relative h-48 bg-white cursor-pointer group">
                  {insight.featuredImage?.url ? (
                    <>
                      <Image
                        src={insight.featuredImage.url}
                        alt={insight.title}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-70 transition-opacity"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-black"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                      <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                insight.featuredImage?.url && (
                  <div className="relative h-48">
                    <Image
                      src={insight.featuredImage.url}
                      alt={insight.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )
              )}

              <div className="p-6">
                {/* Type badge */}
                <div className="mb-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      insight.type === 'blog'
                        ? 'bg-indigo-100 text-black'
                        : 'bg-purple-100 text-black'
                    }`}
                  >
                    {insight.type === 'blog' ? 'Tech Blog' : 'Tutorial'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-black">{insight.title}</h3>
                <p className="text-black text-sm mb-4 line-clamp-3">
                  {insight.summary}
                </p>

                {/* Tags */}
                {insight.tags && insight.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {insight.tags.map((tagObj, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white border border-gray-200 text-black text-xs rounded-full"
                        >
                          {tagObj.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer with date and link */}
                <div className="flex items-center justify-between mt-4">
                  {insight.publishedAt && (
                    <span className="text-xs text-black">
                      {new Date(insight.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  
                  {/* For blogs with external links */}
                  {insight.type === 'blog' && insight.contentType === 'external' && insight.externalLink ? (
                    <a
                      href={insight.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:underline"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="inline-flex items-center text-indigo-600 hover:underline"
                    >
                      {insight.type === 'blog' ? 'Read More' : 'Watch Tutorial'}
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <div className="text-center py-4">
            <p className="text-lg text-black">
              No {activeTab === 'all' ? 'insights' : activeTab === 'blog' ? 'blogs' : 'tutorials'} found.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InsightsGrid 