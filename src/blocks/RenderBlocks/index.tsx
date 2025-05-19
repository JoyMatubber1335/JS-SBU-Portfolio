'use client'
import React from 'react'

// import { ArchiveBlock } from '../ArchiveBlock'
// import { CallToAction } from '../CallToAction'
// import { Content } from '../Content'
// import { MediaBlock } from '../MediaBlock'
// import { FormBlock } from '../Form'
import { FeaturedPortfolio } from '../FeaturedPortfolio'
import { TrustedBy } from '../TrustedBy'

export type Block = {
  blockType: string
  id?: string
  [key: string]: unknown
}

export const RenderBlocks: React.FC<{
  blocks: Block[]
  disableBottomPadding?: boolean
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <div>
      {hasBlocks &&
        blocks.map((block, index) => {
          const { blockType } = block

          // const isLastBlock = index === blocks.length - 1

          switch (blockType) {
            // case 'content':
            //   return <Content key={index} {...block} />
            // case 'mediaBlock':
            //   return <MediaBlock key={index} {...block} />
            // case 'archive':
            //   return <ArchiveBlock key={index} {...block} />
            // case 'callToAction':
            //   return <CallToAction key={index} {...block} />
            // case 'formBlock':
            //   return <FormBlock key={index} {...block} />
            case 'featuredPortfolio':
              return <FeaturedPortfolio key={index} {...block} />
            case 'trustedBy':
              return <TrustedBy key={index} {...block} />
            default:
              return null
          }
        })}
    </div>
  )
}
