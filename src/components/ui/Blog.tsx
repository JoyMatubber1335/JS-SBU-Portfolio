import React from 'react'
import Image from 'next/image'

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
          <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 sm:p-6 flex flex-col justify-between h-64 sm:h-72 md:h-80 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <span className="inline-block bg-white text-xs font-semibold rounded mb-2 uppercase tracking-wide text-gray-700 py-1 px-2 shadow-sm">
                {featuredBlog.tag}
              </span>
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 line-clamp-2 text-gray-900">
                {featuredBlog.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 line-clamp-3">
                {featuredBlog.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <a
                href={featuredBlog.url || '#'}
                className="underline font-semibold text-black hover:text-gray-700 transition-colors"
              >
                Read More
              </a>
              {featuredBlog.date && (
                <span>
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
            className="bg-gray-50 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 h-64 sm:h-72"
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
              <span className="absolute top-2 left-2 bg-white text-xs font-semibold rounded uppercase tracking-wide text-gray-700 shadow py-1 px-2">
                {blog.tag}
              </span>
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2 text-gray-900">
                {blog.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <a
                  href={blog.url || '#'}
                  className="underline font-semibold text-black hover:text-gray-700 transition-colors"
                >
                  Read More
                </a>
                {blog.date && (
                  <span>
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
