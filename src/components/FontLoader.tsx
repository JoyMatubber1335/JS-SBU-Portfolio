import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Setting } from '@/payload-types'

export async function FontLoader() {
  const settingsData = (await getCachedGlobal('settings', 1)()) as Setting
  const fontFamily = settingsData?.fontFamily || 'Inter, system-ui, sans-serif'

  // Map of font families that need to be loaded from Google Fonts
  const googleFonts: Record<string, string> = {
    'Inter, system-ui, sans-serif': 'Inter:300,400,500,600,700',
    'Roboto, sans-serif': 'Roboto:300,400,500,700',
    'Open Sans, sans-serif': 'Open+Sans:300,400,600,700',
    'Lato, sans-serif': 'Lato:300,400,700',
    'Montserrat, sans-serif': 'Montserrat:300,400,500,700',
    'Poppins, sans-serif': 'Poppins:300,400,500,600,700',
    'Merriweather, serif': 'Merriweather:300,400,700',
  }

  // Check if the selected font family needs to be loaded from Google Fonts
  if (!googleFonts[fontFamily]) {
    return null
  }

  const fontToLoad = googleFonts[fontFamily]

  return (
    <link
      rel="stylesheet"
      href={`https://fonts.googleapis.com/css2?family=${fontToLoad}&display=swap`}
    />
  )
}
