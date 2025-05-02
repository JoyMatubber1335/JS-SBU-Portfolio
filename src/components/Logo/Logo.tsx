import clsx from 'clsx'
import React, { CSSProperties } from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  style?: React.CSSProperties
  mediaId?: string
}
interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  style?: React.CSSProperties
  mediaId?: string
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    style,
    mediaId,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const defaultSrc =
    'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

  const imageSrc = mediaId ? `/media/${mediaId}` : defaultSrc // Adjust path based on your media setup

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      style={style}
      src={
        mediaId
          ? `/api/media/file/${mediaId}` // or use logo.url directly if available
          : 'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'
      }
    />
  )
}
