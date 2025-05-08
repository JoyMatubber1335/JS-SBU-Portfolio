'use client'

import React from 'react'
import Image from 'next/image'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type BlogItem = {
  title: string
  description: string
  tag: string
  image?: { url: string }
  date?: string
  author?: string
  featured?: boolean
  url?: string
}

type BlogProps = {
  blogs: BlogItem[]
}

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export const Blog: React.FC<BlogProps> = ({ blogs }) => {
  // Get global settings for colors
  const { settings } = useGlobalSettings()
  const primaryColor = settings?.colorScheme?.primaryColor || '#334155'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#4b5563'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  if (!blogs || blogs.length === 0) return <div>No blogs found.</div>

  // Featured blog and remaining blogs
  const [featuredBlog, ...remainingBlogs] = blogs

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Featured Blog Section */}
      {featuredBlog && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Featured Image */}
          <div className="md:col-span-1 h-64 sm:h-72 md:h-80 overflow-hidden rounded-lg">
            <Image
              src={featuredBlog.image?.url || '/no-image.png'}
              alt={featuredBlog.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Featured Content */}
          <div
            className="md:col-span-2 rounded-lg p-4 sm:p-6 flex flex-col justify-between h-64 sm:h-72 md:h-80 shadow-sm hover:shadow-md transition-shadow duration-300 border"
            style={{ backgroundColor, borderColor: primaryColor }}
          >
            <div>
              <span
                className="inline-block text-xs font-semibold rounded mb-2 uppercase tracking-wide py-1 px-2 shadow-sm"
                style={{ backgroundColor: 'white', color: primaryColor }}
              >
                {featuredBlog.tag}
              </span>
              <h2
                className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 line-clamp-2"
                style={{ color: primaryColor }}
              >
                {featuredBlog.title}
              </h2>
              <p
                className="text-sm sm:text-base md:text-lg mb-4 line-clamp-3"
                style={{ color: primaryColor }}
              >
                {featuredBlog.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <a
                href={featuredBlog.url || '#'}
                className="underline font-semibold hover:opacity-80 transition-opacity"
                style={{ color: primaryColor }}
              >
                Read More
              </a>
              {featuredBlog.date && (
                <span style={{ color: secondaryColor }}>
                  {new Date(featuredBlog.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {remainingBlogs.map((blog, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 h-64 sm:h-72 border"
            style={{ backgroundColor, borderColor: primaryColor }}
          >
            {/* Image Container */}
            <div className="relative h-32 sm:h-40">
              <Image
                src={blog.image?.url || '/no-image.png'}
                alt={blog.title}
                width={400}
                height={250}
                className="w-full h-full object-contain"
              />
              <span
                className="absolute top-2 left-2 text-xs font-semibold rounded uppercase tracking-wide shadow py-1 px-2"
                style={{ backgroundColor: 'white', color: primaryColor }}
              >
                {blog.tag}
              </span>
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <h3
                className="font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2"
                style={{ color: primaryColor }}
              >
                {blog.title}
              </h3>

              <div className="flex items-center justify-between text-xs mt-auto">
                <a
                  href={blog.url || '#'}
                  className="underline font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: primaryColor }}
                >
                  Read More
                </a>
                {blog.date && (
                  <span style={{ color: secondaryColor }}>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
