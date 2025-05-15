import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Services from '@/components/ui/Services'
import { AboutUs } from '@/components/ui/AboutUs'
import { Blog } from '@/components/ui/Blog'
import { Media } from '@/payload-types'
import { ProjectsList } from '../projects/ProjectsList'
import Link from 'next/link'
import { SkillSets } from '@/components/ui/SkillSets'
import InsightsGrid from '@/components/ui/InsightsGrid'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const payload = await getPayload({ config: configPromise })
  let projects = []
  const { docs: projectDocs } = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 3, // Show fewer projects on home page
    })
    projects = projectDocs

  // Fetch skill sets for home page
  let skillSets = []
  const { docs: skillSetDocs } = await payload.find({
    collection: 'skillsets',
    sort: 'order',
    limit: 3, // Show just 3 skill sets on the home page
    depth: 2, // Include related blog posts
  })
  skillSets = skillSetDocs

  // Fetch insights for home page
  let insights = []
  const { docs: insightDocs } = await payload.find({
    collection: 'insights',
    sort: '-publishedAt',
    limit: 3, // Show just 3 insights on the home page
    depth: 2, // Include related data
  })
  insights = insightDocs

  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  // Type guard for services block
  function isServicesBlock(block: any): block is { blockType: string; tabs: any[] } {
    return (
      (block.blockType === 'services' || block.blockType === 'services-style-block') &&
      Array.isArray(block.tabs)
    )
  }

  // Type guard for about us block
  function isAboutUsBlock(block: any): block is {
    blockType: 'aboutus'
    heading: string
    description: string
    features?: { label: string; id?: string | null }[] | null
    logo?: (string | null) | Media
    id?: string | null
    blockName?: string | null
  } {
    return block.blockType === 'aboutus'
  }

  // Find the services block in the layout
  const servicesBlock = layout?.find(isServicesBlock)
  const tabs = (servicesBlock as any)?.tabs || []
  const aboutUsBlock = layout?.find(isAboutUsBlock)

  function isBlogBlock(block: any): block is {
    blockType: 'blog'
    blogItems: {
      title: string
      description: string
      tag: string
      image?: Media
      date?: string
      author?: string
      link?: {
        type?: 'reference' | 'custom'
        reference?: {
          relationTo: string
          value: any
        }
        url?: string
        label: string
      }
    }[]
  } {
    return block.blockType === 'blog'
  }

  const blogBlock = layout?.find(isBlogBlock) as {
    blockType: 'blog'
    blogItems: Array<{
      title: string
      description: string
      tag: string
      image?: Media
      date?: string
      author?: string
      link?: {
        type?: 'reference' | 'custom'
        reference?: {
          relationTo: string
          value: any
        }
        url?: string
        label: string
      }
    }>
  } | undefined;
  
  // Fetch real blog posts if this is the blog block
  let blogPostsForBlock: Array<{
    title: string;
    description: string;
    tag: string;
    image?: any;
    date?: string;
    author?: string;
    slug?: string;
    url?: string;
  }> = [];

  if (blogBlock) {
    try {
      const { docs: blogPostDocs } = await payload.find({
        collection: 'blog-posts',
        limit: blogBlock.blogItems?.length || 4,
        depth: 2,
        sort: '-publishedDate',
      })
      
      // If we have real blog posts, use them instead of the static content
      if (blogPostDocs && blogPostDocs.length > 0) {
        blogPostsForBlock = blogPostDocs.map(post => ({
          title: post.title,
          description: post.summary || '',
          tag: post.category || 'Blog',
          image: post.featuredImage,
          date: post.publishedDate || undefined,
          author: typeof post.author === 'object' ? post.author.name : (post.author as string || 'Author'),
          slug: post.slug, // Important - add slug for redirection
          url: `/blog/${post.slug}`
        }))
      } else if (blogBlock.blogItems) {
        // Fallback to original items if no posts found
        blogPostsForBlock = blogBlock.blogItems.map((item: any) => ({
          ...item,
          image: item.image && item.image.url ? { url: item.image.url || '' } : undefined,
        }));
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      // Fallback to original items if error
      if (blogBlock.blogItems) {
        blogPostsForBlock = blogBlock.blogItems.map((item: any) => ({
          ...item,
          image: item.image && item.image.url ? { url: item.image.url || '' } : undefined,
        }));
      }
    }
  }

  // Fetch projects if this is the home page - show exactly 6 projects
  if (slug === 'home') {
    const { docs: projectDocs } = await payload.find({
      collection: 'projects',
      sort: 'order',
      limit: 3, // Show exactly 6 projects on home page
    })
    projects = projectDocs
  }

  return (
    <article className="flex flex-col gap-10">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      {servicesBlock && <Services tabs={tabs} />}

      {aboutUsBlock && (
        <AboutUs
          heading={aboutUsBlock?.heading}
          description={aboutUsBlock?.description}
          features={aboutUsBlock?.features || []}
        />
      )}

      {/* SkillSets Section with View All button at top */}
      {slug === 'home' && skillSets.length > 0 && (
        <section className="py-4 bg-gray-50 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black">Our Skill Sets</h2>
                <p className="text-lg text-black  mt-2">
                  Areas of expertise and professional capabilities
                </p>
              </div>
              <Link 
                href="/skills" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Skills
              </Link>
            </div>
            
            <SkillSets skillSets={skillSets} />
          </div>
        </section>
      )}

      {/* Projects Section with View All button at top */}
      {slug === 'home' && projects.length > 0 && (
        <section className="py-4   bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black">My Projects</h2>
                <p className="text-lg text-gray-600  mt-2">
                  Check out some of my recent work
                </p>
              </div>
              <Link 
                href="/projects" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Projects
              </Link>
            </div>
            
            <ProjectsList projects={projects} />
          </div>
        </section>
      )}

      {/* Insights section with View All button */}
      {slug === 'home' && insights.length > 0 && (
        <section className="py-4 bg-white ">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black">Insights</h2>
                <p className="text-lg text-gray-600 mt-2">
                  Technical blogs and video tutorials
                </p>
              </div>
              <Link 
                href="/insights" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Insights
              </Link>
            </div>
            
            <InsightsGrid insights={insights} />
          </div>
        </section>
      )}

      {blogBlock && (
        <Blog
          blogs={blogPostsForBlock.length > 0 ? blogPostsForBlock : (blogBlock.blogItems || []).map((item: any) => ({
            ...item,
            image: item.image && item.image.url ? { url: item.image.url || '' } : undefined,
          }))} as any
        />
      )}

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
