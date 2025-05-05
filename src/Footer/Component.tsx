import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import facebook from '../../public/media/facebook.svg'
import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const footerContent = footerData?.footerContent?.children || []

  console.log('footerData', footerData)

  const settingsData = await getCachedGlobal('settings', 1)()
  const logo = settingsData?.logo
  console.log('settingsdata', settingsData)
  // Construct logo URL
  const logoUrl =
    logo?.url ||
    (logo?.filename ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${logo.filename}` : null)
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
              {block.children.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  return <span key={childIndex}>{child.text}</span>
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

  return (
    <footer className="p-8 mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className=" py-2 flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Left Section: Logo */}
        <div className="flex-shrink-0 w-[20%]">
          <Link className="flex items-center" href="/">
            {logoUrl ? (
              <Logo src={logoUrl} alt={logo?.alt || 'Logo'} className="h-10 w-auto" />
            ) : (
              <span className="text-xl font-bold">Logo</span>
            )}
          </Link>
          <div className="mt-2 text-sm text-gray-400">
            {footerContent && footerContent?.length > 0
              ? renderFooterContent(footerContent as any)
              : 'Your default description here.'}
          </div>
        </div>

        <div className="flex flex-grow justify-around">
          {navItems.map(({ link, subLinks }, i) => (
            <div key={i} className="flex flex-col">
              <CMSLink
                className="text-white font-bold text-base hover:text-primary transition"
                {...link}
              />
              {subLinks && subLinks?.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {subLinks?.map(({ link: subLink }, j) => (
                    <li key={j}>
                      <CMSLink
                        {...subLink}
                        className="text-sm text-gray-400 hover:text-white transition"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Right Section: Theme Selector */}
        <div className="flex justify-start md:justify-end w-[20%]">
          <ThemeSelector />
        </div>
      </div>
      {/* social media icon */}
      <div className="flex space-x-3 mb-4 md:mb-0">
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
