import React from 'react'
import { Header } from '@/Header/Component'
import { HeaderClientWrapper } from '@/Header/HeaderClient'

export async function HeaderContainer() {
  return <HeaderClientWrapper headerContent={<Header />} />
}
