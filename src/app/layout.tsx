import { ChatContainer } from '@/components/ChatContainer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatContainer />
      </body>
    </html>
  )
}
