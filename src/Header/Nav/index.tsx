import Link from 'next/link'
import { useState, useRef } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'

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

export const HeaderNav: React.FC<{ data: Header }> = ({ data }) => {
  const navItems = data.navItems ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

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
      className="flex gap-8 items-center font-bold text-[16px] relative"
      aria-label="Main navigation"
    >
      {navItems.map((item, idx) => {
        const isOpen = openIndex === idx && hasChildren(item)
        return (
          <div
            key={item.id ?? idx}
            className="relative"
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
              className={`hover:underline transition flex items-center gap-1 px-3 py-2 rounded-md `}
              tabIndex={0}
              aria-haspopup={hasChildren(item) ? 'menu' : undefined}
              aria-expanded={isOpen}
            >
              {item.link.label}
              {hasChildren(item) && <ChevronDown className="ml-1 w-4 h-4" aria-hidden />}
            </Link>

            {/* Modal: wrapper is inside the nav item for hover/focus control */}
            {isOpen && (
              <div
                className="fixed left-0 top-[72px] w-full h-[calc(70vh-64px)] bg-[#23272b] z-50 flex shadow-2xl animate-fade-in border-t border-gray-700"
                role="menu"
                aria-label={`${item.link.label} submenu`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                tabIndex={-1}
              >
                {/* Sidebar: Second Level */}
                <div className="w-[320px] p-8 border-r border-gray-700 flex flex-col gap-2 bg-[#23272b]">
                  {item.subNavItems?.map((sub, subIdx) => (
                    <div
                      key={sub.id ?? subIdx}
                      className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-[#31363b] transition
                        ${activeSubIndex === subIdx ? 'bg-[#31363b] scale-[1.03]' : ''}
                      `}
                      onMouseEnter={() => setActiveSubIndex(subIdx)}
                      tabIndex={0}
                      role="menuitem"
                    >
                      {/* Icon/Image */}
                      <span className="bg-white rounded-full flex items-center justify-center w-12 h-12 shadow">
                        <img
                          src={getImage(sub.image)}
                          alt={sub.link.label}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </span>
                      <span className="text-base font-medium text-white flex-1">
                        {sub.link.label}
                      </span>
                      {/* Arrow if has sub-children */}
                      {hasSubChildren(sub) && (
                        <ChevronRight className="text-white w-5 h-5" aria-hidden />
                      )}
                    </div>
                  ))}
                </div>
                {/* Grid: Third Level */}
                <div className="flex-1 p-8 grid grid-cols-4 gap-8 overflow-y-auto">
                  {item.subNavItems?.[activeSubIndex]?.subSubNavItems?.length ? (
                    item.subNavItems[activeSubIndex].subSubNavItems!.map((subSub, subSubIdx) => (
                      <Link
                        key={subSub.id ?? subSubIdx}
                        href={`/${
                          subSub.link.reference && typeof subSub.link.reference.value === 'object'
                            ? subSub.link.reference.value.slug
                            : subSub.link.reference?.value || subSub.link.url || '#'
                        }`}
                        className="flex flex-col items-center hover:bg-[#31363b] rounded-lg p-4 transition group"
                        tabIndex={0}
                      >
                        <img
                          src={getImage(subSub.image)}
                          alt={subSub.image?.alt || ''}
                          className="w-32 h-32 object-cover rounded mb-4 group-hover:scale-105 transition"
                        />
                        <span className="text-white text-base font-semibold">
                          {subSub.link.label}
                        </span>
                        {/* Optional: Caption */}
                        <span className="text-xs text-gray-400">{getCaption(subSub.image)}</span>
                      </Link>
                    ))
                  ) : (
                    <span className="text-gray-400 col-span-4">No items</span>
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
