/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, updates, and insights from JS SBU',
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch the blog posts
  const { docs } = await payload.find({
    collection: 'blog-posts',
    limit: 10,
    depth: 2, // Include related media
    sort: '-publishedDate', // Sort by newest first
  })

  if (!docs || docs.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Blog</h1>
          <p className="text-lg text-gray-700 mb-8">
            No blog posts found. Check back soon for new content.
          </p>
        </div>
      </div>
    )
  }

  // Get featured post (first/latest post)
  const featuredPost: any = docs[0]
  const remainingPosts: any = docs.slice(1)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Our <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Stay updated with the latest insights, technology trends, and expert perspectives from
            our team.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-black mb-8 border-b pb-4">Featured Article</h2>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {featuredPost.featuredImage && (
                <div className="relative h-72 lg:h-full overflow-hidden">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Image
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                </div>
              )}

              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                      {featuredPost.category}
                    </span>
                    {featuredPost.publishedDate && (
                      <span className="text-sm text-gray-500">
                        {new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h3 className="text-2xl font-bold text-black mb-4 hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                  </Link>

                  <p className="text-gray-700 mb-6 line-clamp-3">{featuredPost.summary}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {featuredPost.author && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-600 font-semibold">
                            {typeof featuredPost.author === 'object'
                              ? featuredPost.author.name.charAt(0)
                              : 'A'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                          {typeof featuredPost.author === 'object'
                            ? featuredPost.author.name
                            : 'Author'}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-black mb-8 border-b pb-4">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post: any) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow transition-all hover:shadow-lg flex flex-col h-full"
              >
                {post.featuredImage && (
                  <div className="relative h-52 overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      {post.category}
                    </span>
                    {post.publishedDate && (
                      <span className="text-xs text-gray-500">
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block flex-grow">
                    <h3 className="text-xl font-bold text-black mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.summary}</p>
                  </Link>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    {post.author && (
                      <span className="text-xs text-gray-600">
                        By {typeof post.author === 'object' ? post.author.name : 'Author'}
                      </span>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Read
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to our newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest articles, insights and updates delivered directly to your inbox.
          </p>

          <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md flex-grow text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
