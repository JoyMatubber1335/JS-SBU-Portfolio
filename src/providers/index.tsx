import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { GlobalSettingsProvider } from '@/hooks/useGlobalSettings'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <GlobalSettingsProvider>{children}</GlobalSettingsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
