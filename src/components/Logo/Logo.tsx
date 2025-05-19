import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src: string // Add src prop
  alt: string // Add alt prop
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src, alt } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  // const imageSrc = mediaId ? `/media/${mediaId}` : defaultSrc // Adjust path based on your media setup

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt}
      src={src}
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] h-[34px]', className)}
    />
  )
}
