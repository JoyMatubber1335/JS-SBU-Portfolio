import { MessageCircle } from 'lucide-react'

interface ChatIconProps {
  onClick: () => void
}

export function ChatIcon({ onClick }: ChatIconProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-50"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
