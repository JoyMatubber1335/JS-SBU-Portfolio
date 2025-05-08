import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { GlobalSettingsProvider } from '@/hooks/useGlobalSettings'
import { BodyBackground } from '@/components/BodyBackground'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <GlobalSettingsProvider>
          <BodyBackground />
          {children}
        </GlobalSettingsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
