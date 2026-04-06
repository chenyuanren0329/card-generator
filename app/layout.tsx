import type { Metadata } from 'next'
import { montserrat, inter, notoSansSC } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: '卡片生成器',
  description: '社交媒体卡片生成工具'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${montserrat.variable} ${inter.variable} ${notoSansSC.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
