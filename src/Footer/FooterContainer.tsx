import React from 'react'
import { Footer } from '@/Footer/Component'
import { Copyright } from '@/Copyright/Component'
import { FooterClient } from '@/Footer/FooterClient'

export async function FooterContainer() {
  return <FooterClient footerContent={<Footer />} copyrightContent={<Copyright />} />
}
