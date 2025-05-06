import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Copyright as copyrightType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export async function Copyright() {
  const globalData = await getCachedGlobal('copyright', 1)()
  const copyrightData = globalData as copyrightType

  const copyrightText = `© ${new Date().getFullYear()} JS SBU. All Rights Reserved.`
  const centerText = copyrightData?.text || ''
  const copyrightLinks = copyrightData?.copyrightLinks || []

  return (
    <div className="p-4 border-t border-border bg-gray-100 text-black dark:bg-card dark:text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-center md:text-left">
        {/* Left: Copyright */}
        <div className="w-full md:w-1/3 text-center md:text-left font-medium">{copyrightText}</div>

        {/* Center: Designed by... */}
        <div className="w-full md:w-1/3 text-center font-medium">Designed by {centerText}</div>

        {/* Right: Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-2">
          {copyrightLinks?.map(({ link }, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-1">|</span>}
              <CMSLink {...link} className="hover:underline text-black dark:text-white" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
