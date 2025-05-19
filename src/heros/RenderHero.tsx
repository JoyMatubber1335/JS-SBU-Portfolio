import React from 'react'

import type { Page } from '@/payload-types'

// import { HighImpactHero } from './HighImpact'
// import { LowImpactHero } from './LowImpact'
// import { MediumImpactHero } from './MediumImpact'
import { Hero } from './Hero'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props

  switch (type) {
    // case 'highImpact':
    //   return <HighImpactHero {...props} />

    // case 'mediumImpact':
    //   return <MediumImpactHero {...props} />

    // case 'lowImpact':
    //   return <LowImpactHero {...props} />

    case 'hero':
      return <Hero {...props} />

    default:
      return null
  }
}
