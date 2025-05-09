'use-client'

import Link from 'next/link'
import { useState, useRef } from 'react'
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

export const HeaderNav: React.FC<{ data: Header; mobile?: boolean }> = ({ data, mobile }) => {
  const navItems = data.navItems ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const { settings } = useGlobalSettings()

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
    closeTimeout.current = setTimeout(() => {
      setOpenIndex(null)
    }, 250) // 250ms delay
  }

  const handleMouseEnter = (idx?: number) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    if (typeof idx === 'number') {
      setOpenIndex(idx)
      setActiveSubIndex(0)
    }
  }

  return (
    <nav
      className={
        mobile
          ? 'flex flex-col gap-2 items-start font-bold text-[16px] w-full'
          : 'flex gap-2 items-center font-bold text-[16px] relative'
      }
      aria-label="Main navigation"
    >
      {navItems.map((item, idx) => {
        const isOpen = openIndex === idx && hasChildren(item)
        return (
          <div
            key={item.id ?? idx}
            className={mobile ? 'relative w-full' : 'relative'}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            onFocus={() => handleMouseEnter(idx)}
            onBlur={handleMouseLeave}
          >
            <Link
              href={`/${
                item.link.reference && typeof item.link.reference.value === 'object'
                  ? item.link.reference.value.slug
                  : item.link.reference?.value || item.link.url || '#'
              }`}
              className={
                mobile
                  ? 'relative group flex items-center gap-1 px-3 py-2 rounded-md w-full'
                  : 'relative group flex items-center gap-1 px-3 py-2 rounded-md'
              }
              tabIndex={0}
              aria-haspopup={hasChildren(item) ? 'menu' : undefined}
              aria-expanded={isOpen}
            >
              <span className="underline-animation">{item.link.label}</span>
              {hasChildren(item) && (
                <ChevronDown
                  style={{ stroke: primaryColor }}
                  className="ml-1 w-4 h-4"
                  aria-hidden
                />
              )}
            </Link>

            {/* Modal: wrapper is inside the nav item for hover/focus control */}
            {isOpen && !mobile && (
              <div
                className="fixed left-0 top-[100px] w-full h-[calc(70vh-64px)] z-50 flex shadow-2xl animate-fade-in border-t border-gray-700"
                style={{ backgroundColor }}
                role="menu"
                aria-label={`${item.link.label} submenu`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                tabIndex={-1}
              >
                {/* Sidebar: Second Level */}
                <div
                  className="w-[320px] p-8 border-r flex flex-col gap-2"
                  style={{ backgroundColor }}
                >
                  {item.subNavItems?.map((sub, subIdx) => (
                    <div
                      key={sub.id ?? subIdx}
                      className={`flex border-b items-center gap-4 p-2 cursor-pointer transition hover:bg-opacity-90
                        ${activeSubIndex === subIdx ? 'scale-[1.03]' : ''}
                      `}
                      style={{
                        backgroundColor: activeSubIndex === subIdx ? secondaryColor : 'transparent',
                      }}
                      onMouseEnter={() => setActiveSubIndex(subIdx)}
                      tabIndex={0}
                      role="menuitem"
                    >
                      {/* Icon/Image */}
                      <span className="rounded-full flex items-center justify-center w-12 h-12 shadow underline-animation">
                        <img
                          src={getImage(sub.image)}
                          alt={sub.link.label}
                          className="w-10 h-10 object-cover rounded-full "
                        />
                      </span>
                      <span className="text-base font-medium flex-1 ">{sub.link.label}</span>
                      {/* Arrow if has sub-children */}
                      {hasSubChildren(sub) && <ChevronRight className="w-5 h-5" aria-hidden />}
                    </div>
                  ))}
                </div>
                {/* Grid: Third Level */}
                <div className="flex-1 p-4 grid grid-cols-6 gap-2 overflow-y-auto">
                  {item.subNavItems?.[activeSubIndex]?.subSubNavItems?.length ? (
                    item.subNavItems[activeSubIndex].subSubNavItems!.map((subSub, subSubIdx) => (
                      <Link
                        key={subSub.id ?? subSubIdx}
                        href={`/${
                          subSub.link.reference && typeof subSub.link.reference.value === 'object'
                            ? subSub.link.reference.value.slug
                            : subSub.link.reference?.value || subSub.link.url || '#'
                        }`}
                        className="flex flex-col items-center rounded-lg p-2 transition group "
                        tabIndex={0}
                      >
                        <div
                          className="hover:underline p-4 underline-animation"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseOver={(e) => {
                            ;(e.currentTarget as HTMLElement).style.backgroundColor = secondaryColor
                          }}
                          onMouseOut={(e) => {
                            ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
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
                    ))
                  ) : (
                    <span className="col-span-4" style={{ color: primaryColor }}>
                      No items
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
