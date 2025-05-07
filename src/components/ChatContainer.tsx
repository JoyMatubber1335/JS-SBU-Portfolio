'use client'
import { useState } from 'react'
import { ChatIcon } from './ChatIcon'
import { ChatPanel } from './ChatPanel'

export function ChatContainer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatIcon onClick={() => setIsOpen(true)} />
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
    </>
  )
}
