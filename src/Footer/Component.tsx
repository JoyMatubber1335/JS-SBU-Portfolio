/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export async function Footer() {
  const footerData: any = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const footerContent = footerData?.footerContent?.root?.children || []

  const settingsData: any = await getCachedGlobal('settings', 1)()
  const logo = settingsData?.logo
  // Construct logo URL
  const logoUrl = logo?.url || (logo?.filename ? `/media/${logo.filename}` : null)
  const socialLinks = settingsData?.socialMediaLinks || {}

  // Render the footer content
  const renderFooterContent = (content: any[]) => {
    return content.map((block, index) => {
      switch (block.type) {
        case 'text':
          return <p key={index}>{block.text}</p>
        case 'linebreak':
          return <br key={index} />
        case 'paragraph':
          return (
            <p key={index}>
              {block.children?.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  return (
                    <span key={childIndex} className="text-white">
                      {child.text}
                    </span>
                  )
                }
                return null
              })}
            </p>
          )
        default:
          return null
      }
    })
  }

  // Newsletter component
  const NewsletterSubscription = () => {
    return (
      <div className="mt-6 md:mt-0 w-full md:w-[25%]  p-4 rounded-lg border border-gray-600">
        <h3 className="text-white font-bold text-lg mb-2">Subscribe to our Newsletter</h3>
        <p className="text-white text-sm mb-3">Stay updated with our latest news and offers</p>
        <form className="space-y-2">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            required
          />
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </form>
      </div>
    )
  }

  return (
    <footer className="p-8 mt-auto border-t border-border bg-gray-900">
      <div className="py-2 flex flex-col gap-10 items-center md:flex-row md:justify-between md:items-start">
        {/* Left Section: Logo */}
        <div className="flex-shrink-0 w-full md:w-[20%] flex flex-col items-center md:items-start text-center md:text-left">
          <Link className="flex items-center" href="/">
            {logoUrl ? (
              <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-10 w-auto" />
            ) : (
              <span className="text-xl font-bold">Logo</span>
            )}
          </Link>
          <div className="mt-2 text-sm text-white">
            {Array.isArray(footerContent) && footerContent.length > 0
              ? renderFooterContent(footerContent)
              : 'Your default description here.'}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto md:flex-row md:gap-6 md:justify-around md:flex-grow">
          {navItems.map((item: any, i: any) => {
            return (
              <div key={i} className="flex flex-col items-center md:items-start">
                <h2 className="text-white font-bold   transition">{item.title}</h2>
                {item.subLinks && item.subLinks.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {item.subLinks.map((subItem: any, j: any) => {
                      return (
                        <li key={j}>
                          {subItem.link && (
                            <CMSLink {...subItem.link} className="text-sm text-white transition" />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        {/* Newsletter Subscription */}
        <NewsletterSubscription />
      </div>
      {/* social media icon */}
      <div className="flex justify-center space-x-3 mt-8 md:mt-2 mb-4 md:mb-2">
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center "
          >
            <Image src="/facebook.svg" rel="icon" height={20} width={20} alt="facbook-icon" />
          </a>
        )}

        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center "
          >
            <Image src="/instagram.png" rel="icon" height={20} width={20} alt="instagram-icon" />
          </a>
        )}

        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center "
          >
            {' '}
            <Image src="/twitter.png" rel="icon" height={20} width={20} alt="tiktok-icon" />
          </a>
        )}

        {socialLinks.snapchat && (
          <a
            href={socialLinks.snapchat}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center "
          >
            {' '}
            <Image src="/snapchat.png" rel="icon" height={20} width={20} alt="tiktok-icon" />
          </a>
        )}
        {socialLinks.pinterest && (
          <a
            href={socialLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center "
          >
            <Image src="/pinterest.png" rel="icon" height={20} width={20} alt="instagram-icon" />
          </a>
        )}
      </div>
    </footer>
  )
}
