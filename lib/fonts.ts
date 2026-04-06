// lib/fonts.ts
import { Montserrat, Inter, Noto_Sans_SC } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat'
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
})

export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-sc'
})

export const fontOptions = [
  { value: 'Montserrat', label: 'Montserrat', variable: '--font-montserrat' },
  { value: 'Inter', label: 'Inter', variable: '--font-inter' },
  { value: 'Noto Sans SC', label: 'Noto Sans SC', variable: '--font-noto-sans-sc' }
]
