import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const settingsData = await getCachedGlobal('settings', 1)()

  return <HeaderClient data={headerData} settingsData={settingsData} />
}
