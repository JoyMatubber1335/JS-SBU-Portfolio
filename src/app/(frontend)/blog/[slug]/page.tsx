/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
    depth: 2, // Include related media and authors
  })

  const post: any = docs[0]

  if (!post) {
    notFound()
  }

  // Fetch related posts if any
  let relatedPosts: any = []
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    const relatedPostIds = post.relatedPosts.map((relatedPost: any) =>
      typeof relatedPost === 'object' ? relatedPost.id : relatedPost,
    )

    const { docs: relatedPostDocs } = await payload.find({
      collection: 'blog-posts',
      where: {
        id: {
          in: relatedPostIds,
        },
      },
      depth: 1,
      limit: 3,
    })

    relatedPosts = relatedPostDocs
  }

  // Format date for display
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Post Header */}
      <header className="pt-10 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
              {post.category}
            </span>

            {formattedDate && <span className="text-gray-500 text-sm">{formattedDate}</span>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Author Section */}
          {post.author && (
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-600 font-bold text-lg">
                  {typeof post.author === 'object' ? post.author.name.charAt(0) : 'A'}
                </span>
              </div>
              <div>
                <div className="font-medium text-black">
                  {typeof post.author === 'object' ? post.author.name : 'Author'}
                </div>
                <div className="text-sm text-gray-500">{post.author.role || 'Contributor'}</div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative -mt-10 mb-12">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-xl">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="container mx-auto max-w-3xl px-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: any, index: any) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                #{tag.tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto max-w-3xl px-4 py-6">
        <div className="prose prose-lg prose-blue mx-auto text-gray-800 max-w-none">
          {post.content && <RichText data={post.content} />}
        </div>
      </article>

      {/* Share Section */}
      <div className="container mx-auto max-w-3xl px-4 py-12 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-lg font-medium text-gray-800">Share this article</div>
          <div className="flex gap-3">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-black mb-10 text-center">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <div
                  key={relatedPost.id}
                  className="bg-white rounded-xl overflow-hidden shadow transition-all hover:shadow-md flex flex-col h-full"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Image
                          src={relatedPost.featuredImage.url}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </Link>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>

                    <Link href={`/blog/${relatedPost.slug}`} className="block group mb-auto">
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.summary}
                      </p>
                    </Link>

                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-2"
                    >
                      Read article
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Want to stay updated?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles, insights and updates from
            our team.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md flex-grow text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
