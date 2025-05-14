import React from 'react'

type VideoEmbedProps = {
  url: string
  title?: string
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title = 'Video' }) => {
  // Extract video ID and platform
  let embedUrl = ''
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com/watch?v=') 
      ? url.split('v=')[1]?.split('&')[0]
      : url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : ''
    
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}`
    }
  } 
  // Vimeo
  else if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    
    if (videoId) {
      embedUrl = `https://player.vimeo.com/video/${videoId}`
    }
  }
  
  if (!embedUrl) {
    return <div className="p-4 bg-red-100 text-red-800 rounded">Invalid video URL</div>
  }

  return (
    <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoEmbed 