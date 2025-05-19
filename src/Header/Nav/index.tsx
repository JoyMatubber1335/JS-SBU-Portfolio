'use-client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'
import { useGlobalSettings } from '@/hooks/useGlobalSettings'

type NavItem = NonNullable<Header['navItems']>[number]
type SubNavItem = NonNullable<NavItem['subNavItems']>[number]
type SubSubNavItem = NonNullable<SubNavItem['subSubNavItems']>[number]

function hasChildren(item?: NavItem): item is NavItem & { subNavItems: SubNavItem[] } {
  return Array.isArray(item?.subNavItems) && item.subNavItems.length > 0
}
function hasSubChildren(
  item?: SubNavItem,
): item is SubNavItem & { subSubNavItems: SubSubNavItem[] } {
  return Array.isArray(item?.subSubNavItems) && item.subSubNavItems.length > 0
}

// Helper function to get the URL for a nav item based on its type
function getNavItemUrl(item: NavItem): string {
  if (item.itemType === 'collection' && item.collection) {
    // Map collection types to their URLs
    const collectionUrls: Record<string, string> = {
      projects: '/projects',
      insights: '/insights',
      skills: '/skills',
      posts: '/posts',
      contact: '/contact',
    }
    return collectionUrls[item.collection.collectionType] || '#'
  } else if (item.link) {
    // Handle regular link type
    return `/${
      item.link.link.reference && typeof item.link.link.reference.value === 'object'
        ? (item.link.link.reference.value as any).slug || ''
        : item.link.link.reference?.value || item.link.link.url || '#'
    }`
  }
  return '#'
}

// Helper function to get the label for a nav item based on its type
function getNavItemLabel(item: NavItem): string {
  if (item.itemType === 'collection' && item.collection) {
    return item.collection.label
  } else if (item.link) {
    return item.link.link.label
  }
  return ''
}

// Similar functions for sub nav items
function getSubNavItemUrl(item: SubNavItem): string {
  if (item.itemType === 'collection' && item.collection) {
    const collectionUrls: Record<string, string> = {
      projects: '/projects',
      insights: '/insights',
      skills: '/skills',
      posts: '/posts',
      contact: '/contact',
    }
    return collectionUrls[item.collection.collectionType] || '#'
  } else if (item.link) {
    return `/${
      item.link.link.reference && typeof item.link.link.reference.value === 'object'
        ? (item.link.link.reference.value as any).slug || ''
        : item.link.link.reference?.value || item.link.link.url || '#'
    }`
  }
  return '#'
}

function getSubNavItemLabel(item: SubNavItem): string {
  if (item.itemType === 'collection' && item.collection) {
    return item.collection.label
  } else if (item.link) {
    return item.link.link.label
  }
  return ''
}

// Custom hook for checking if we're on mobile or not
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set on initial render
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return isMobile
}

export const HeaderNav: React.FC<{ data: Header }> = ({ data }) => {
  const navItems = data.navItems ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  const { settings } = useGlobalSettings()
  const isMobile = useIsMobile()

  // Get color scheme from settings
  const primaryColor = settings?.colorScheme?.primaryColor || '#494949'
  const secondaryColor = settings?.colorScheme?.secondaryColor || '#31363b'
  const backgroundColor = settings?.colorScheme?.backgroundColor || '#ffffff'

  // Helper for image
  const getImage = (img: any) => img?.thumbnailURL || img?.url || '/icons/default.svg'

  // Helper for caption
  const getCaption = (img: any) => img?.caption?.root?.children?.[0]?.children?.[0]?.text || ''

  // Handle delayed close
  const handleMouseLeave = () => {
    if (isMobile) return // Don't auto-close on mobile

    closeTimeout.current = setTimeout(() => {
      setOpenIndex(null)
    }, 250) // 250ms delay
  }

  const handleMouseEnter = (idx?: number) => {
    if (isMobile) return // Don't auto-open on mobile

    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    if (typeof idx === 'number') {
      setOpenIndex(idx)
      setActiveSubIndex(0)
    }
  }

  // Toggle submenu on mobile
  const toggleSubmenu = (idx: number) => {
    if (isMobile) {
      setOpenIndex(openIndex === idx ? null : idx)
    }
  }

  return (
    <nav
      className={`${isMobile ? 'flex flex-col gap-2' : 'flex gap-2 items-center justify-between w-full'} font-bold text-[16px] relative`}
      aria-label="Main navigation"
    >
      <div className={`${isMobile ? 'w-full' : 'flex gap-2 items-center'}`}>
        {navItems.map((item, idx) => {
          const isOpen = openIndex === idx && hasChildren(item)
          const navItemUrl = getNavItemUrl(item)
          const navItemLabel = getNavItemLabel(item)

          return (
            <div
              key={item.id ?? idx}
              className={`relative ${isMobile ? 'w-full' : ''}`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              onFocus={() => handleMouseEnter(idx)}
              onBlur={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href={navItemUrl}
                  className={`relative group flex items-center gap-1 px-3 py-2 rounded-md ${isMobile ? 'flex-1' : ''}`}
                  tabIndex={0}
                  aria-haspopup={hasChildren(item) ? 'menu' : undefined}
                  aria-expanded={isOpen}
                >
                  <span className="underline-animation">{navItemLabel}</span>
                </Link>

                {hasChildren(item) && (
                  <button
                    onClick={() => toggleSubmenu(idx)}
                    className={`${isMobile ? 'px-3' : 'hidden'} flex items-center`}
                    aria-label={`Toggle ${navItemLabel} submenu`}
                  >
                    <ChevronDown
                      style={{ stroke: primaryColor }}
                      className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                )}
              </div>

              {/* Mobile Dropdown */}
              {isMobile && isOpen && (
                <div className="pl-4 animate-slide-down">
                  {item.subNavItems?.map((sub, subIdx) => {
                    const subNavItemUrl = getSubNavItemUrl(sub)
                    const subNavItemLabel = getSubNavItemLabel(sub)

                    return (
                      <Link
                        key={sub.id ?? subIdx}
                        href={subNavItemUrl}
                        className="flex items-center gap-2 py-2 px-3 border-b border-gray-700"
                        onClick={(e) => {
                          // Close the dropdown after link click
                          setOpenIndex(null)
                        }}
                      >
                        {sub.image && (
                          <img
                            src={getImage(sub.image)}
                            alt={subNavItemLabel}
                            className="w-6 h-6 object-cover rounded-full"
                          />
                        )}
                        <span>{subNavItemLabel}</span>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Desktop Modal: wrapper is inside the nav item for hover/focus control */}
              {!isMobile && isOpen && (
                <div
                  className="fixed left-0 top-[76px] w-full max-h-[70vh] z-50 flex shadow-2xl animate-fade-in border-t border-gray-700"
                  style={{ backgroundColor }}
                  role="menu"
                  aria-label={`${navItemLabel} submenu`}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={-1}
                >
                  {/* Sidebar: Second Level */}
                  <div
                    className="w-[320px] p-8 border-r flex flex-col gap-2"
                    style={{ backgroundColor }}
                  >
                    {item.subNavItems?.map((sub, subIdx) => {
                      const subNavItemUrl = getSubNavItemUrl(sub)
                      const subNavItemLabel = getSubNavItemLabel(sub)

                      return (
                        <div
                          key={sub.id ?? subIdx}
                          className={`flex border-b items-center gap-4 p-2 cursor-pointer transition hover:bg-black/10
                            ${activeSubIndex === subIdx ? 'scale-[1.03]' : ''}
                          `}
                          style={{
                            backgroundColor:
                              activeSubIndex === subIdx ? secondaryColor : 'transparent',
                          }}
                          onMouseEnter={() => setActiveSubIndex(subIdx)}
                          tabIndex={0}
                          role="menuitem"
                        >
                          {/* Icon/Image */}
                          <span className="rounded-full flex items-center justify-center w-12 h-12 shadow underline-animation">
                            <img
                              src={getImage(sub.image)}
                              alt={subNavItemLabel}
                              className="w-10 h-10 object-cover rounded-full"
                            />
                          </span>
                          <span className="text-black font-medium flex-1">{subNavItemLabel}</span>
                          {/* Arrow if has sub-children */}
                          {hasSubChildren(sub) && <ChevronRight className="w-5 h-5" aria-hidden />}
                        </div>
                      )
                    })}
                  </div>
                  {/* Grid: Third Level */}
                  {item.subNavItems?.[activeSubIndex]?.subSubNavItems?.length && (
                    <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 overflow-y-auto">
                      {item.subNavItems[activeSubIndex].subSubNavItems!.map((subSub, subSubIdx) => (
                        <Link
                          key={subSub.id ?? subSubIdx}
                          href={`/${
                            subSub.link.reference && typeof subSub.link.reference.value === 'object'
                              ? (subSub.link.reference.value as any).slug || ''
                              : subSub.link.reference?.value || subSub.link.url || '#'
                          }`}
                          className="flex flex-col items-center rounded-lg p-2 transition group"
                          tabIndex={0}
                        >
                          <div
                            className="hover:underline p-4 underline-animation"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseOver={(e) => {
                              ;(e.currentTarget as HTMLElement).style.backgroundColor =
                                secondaryColor
                            }}
                            onMouseOut={(e) => {
                              ;(e.currentTarget as HTMLElement).style.backgroundColor =
                                'transparent'
                            }}
                          >
                            <img
                              src={getImage(subSub.image)}
                              alt={
                                typeof subSub.image === 'object' && subSub.image !== null
                                  ? (subSub.image.alt as string) || ''
                                  : ''
                              }
                              className="w-32 h-32 object-cover rounded mb-4 group-hover:scale-105 transition"
                            />
                            <span className="text-base font-semibold">{subSub.link.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Contact link - always visible on the right */}
      <div className={`${isMobile ? 'mt-4' : ''} rounded-[100px]`}>
        <Link
          href="/contact"
          className="relative group flex items-center gap-1 px-4 py-2  text-black border-radius-full  transition-colors rounded-[100px] bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Contact
        </Link>
      </div>
    </nav>
  )
}
