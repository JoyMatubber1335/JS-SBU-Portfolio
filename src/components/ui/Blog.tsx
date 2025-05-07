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

export const Blog: React.FC<BlogProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return <div>No blogs found.</div>

  // Featured and large image
  const [firstOne, ...rest] = blogs

  // Card height for all cards
  const cardHeight = 'h-[400px]'

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6">
        {/* Large image left */}
        {firstOne && (
          <div className={`md:col-span-1 overflow-hidden  flex flex-col relative  ${cardHeight}`}>
            <div className="relative flex-1">
              <Image
                src={firstOne.image?.url || '/no-image.png'}
                alt={firstOne.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {/* Featured blog right */}
        {firstOne && (
          <div
            className={`md:col-span-2  bg-[#f6f6f6] flex flex-col p-8 justify-between shadow ${cardHeight}`}
          >
            {' '}
            <span className="inline-block bg-white text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wide text-gray-700 w-[10%]">
              {firstOne.tag}
            </span>
            <h2 className="font-bold text-2xl md:text-3xl mb-2 line-clamp-2 text-gray-900">
              {firstOne.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{firstOne.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
              <a href={firstOne.url || '#'} className="underline font-semibold text-black">
                Read More
              </a>
              <span>
                {firstOne.date &&
                  new Date(firstOne.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                  })}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Blog grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {rest.map((blog, idx) => (
          <div
            key={idx}
            className={`rounded-xl bg-[#f6f6f6] overflow-hidden flex flex-col relative group transition-shadow hover:shadow-lg shadow ${cardHeight}`}
          >
            <div className="relative flex-1">
              <Image
                src={blog.image?.url || '/no-image.png'}
                alt={blog.title}
                width={400}
                height={250}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide text-gray-700 shadow">
                {blog.tag}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900">
                {blog.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                <a href={blog.url || '#'} className="underline font-semibold text-black">
                  Read More
                </a>
                <span>
                  {blog.date &&
                    new Date(blog.date).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                    })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
