import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

export async function ServerFontProvider() {
  const settingsData = (await getCachedGlobal('settings', 1)()) as Setting
  const fontFamily = settingsData?.fontFamily || 'Inter, system-ui, sans-serif'
  const baseFontSize = settingsData?.fontSettings?.baseFontSize || 16
  const headingFontSize = settingsData?.fontSettings?.headingFontSize || 24

  const cssStyles = `
    :root {
      --font-family: ${fontFamily};
      --base-font-size: ${baseFontSize}px;
      --heading-font-size: ${headingFontSize}px;
    }
    
    html,
    body {
      font-family: var(--font-family);
      font-size: var(--base-font-size);
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-family);
    }
    
    h1 {
      font-size: calc(var(--heading-font-size) * 1.5);
    }
    
    h2 {
      font-size: calc(var(--heading-font-size) * 1.25);
    }
    
    h3 {
      font-size: var(--heading-font-size);
    }
    
    h4 {
      font-size: calc(var(--heading-font-size) * 0.875);
    }
    
    h5 {
      font-size: calc(var(--heading-font-size) * 0.75);
    }
    
    h6 {
      font-size: calc(var(--heading-font-size) * 0.625);
    }
  `

  return <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
}
