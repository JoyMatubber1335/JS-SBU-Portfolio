/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'
import VideoEmbed from './VideoEmbed'

type InsightDetailProps =
  | {
      insight: {
        id: string
        title: string
        type: 'blog' | 'tutorial'
        summary: string
        featuredImage: Media
        tags?: Array<{ tag: string }>
        publishedAt?: string
        author?: {
          id: string
          name: string
        }
        contentType?: 'external' | 'internal'
        externalLink?: string
        content?: any
        videoType?: 'upload' | 'embed'
        videoEmbed?: string
        videoFile?: Media
        tutorialContent?: any
        relatedSkills?: Array<{
          id: string
          title: string
          slug: string
        }>
      }
    }
  | any

const InsightDetail: React.FC<InsightDetailProps> = ({ insight }) => {
  // Redirect to external link if blog is external
  if (insight.type === 'blog' && insight.contentType === 'external' && insight.externalLink) {
    if (typeof window !== 'undefined') {
      window.location.href = insight.externalLink
    }
    return null
  }

  const formattedDate = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header section */}
      <header className="mb-8">
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              insight.type === 'blog'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            }`}
          >
            {insight.type === 'blog' ? 'Tech Blog' : 'Tutorial'}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{insight.title}</h1>

        <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
          {insight.author && <span className="mr-4">By {insight.author.name}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </header>

      {/* Featured image */}
      {insight.featuredImage?.url && (
        <div className="relative h-72 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={insight.featuredImage.url}
            alt={insight.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {/* Tags */}
      {insight.tags && insight.tags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {insight.tags.map((tagObj: any, index: any) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                {tagObj.tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 italic">{insight.summary}</p>
      </div>

      {/* Video for tutorials */}
      {insight.type === 'tutorial' && insight.videoType === 'embed' && insight.videoEmbed && (
        <div className="mb-8">
          <VideoEmbed url={insight.videoEmbed} title={insight.title} />
        </div>
      )}

      {insight.type === 'tutorial' && insight.videoType === 'upload' && insight.videoFile?.url && (
        <div className="mb-8">
          <video controls className="w-full rounded-lg" poster={insight.featuredImage?.url}>
            <source src={insight.videoFile.url} type={insight.videoFile.mimeType || 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none mb-8">
        {insight.type === 'blog' && insight.content && (
          <div
            dangerouslySetInnerHTML={{
              __html:
                typeof insight.content === 'string'
                  ? insight.content
                  : Array.isArray(insight.content)
                    ? insight.content
                        .map((node: any) => node.children?.map((child: any) => child.text).join(''))
                        .join('')
                    : '',
            }}
          />
        )}

        {insight.type === 'tutorial' && insight.tutorialContent && (
          <div
            dangerouslySetInnerHTML={{
              __html:
                typeof insight.tutorialContent === 'string'
                  ? insight.tutorialContent
                  : Array.isArray(insight.tutorialContent)
                    ? insight.tutorialContent
                        .map((node: any) => node.children?.map((child: any) => child.text).join(''))
                        .join('')
                    : '',
            }}
          />
        )}
      </div>

      {/* Related skills */}
      {insight.relatedSkills && insight.relatedSkills.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <h3 className="text-xl font-bold mb-4">Related Skills</h3>
          <div className="flex flex-wrap gap-2">
            {insight.relatedSkills.map((skill: any) => (
              <Link
                key={skill.id}
                href={`/skills#${skill.slug}`}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {skill.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default InsightDetail
