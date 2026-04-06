'use client'

import { useState, useRef } from 'react'
import { CardState, defaultCardState } from '@/lib/types'
import { CardPreview } from '@/components/card-preview'
import { CardEditor } from '@/components/card-editor'
import { ExportButton } from '@/components/export-button'

export default function Home() {
  const [cardState, setCardState] = useState<CardState>(defaultCardState)
  const previewRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex h-screen">
      <CardEditor cardState={cardState} setCardState={setCardState} />
      <div className="flex-1 flex flex-col">
        <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Card Generator
          </h1>
          <ExportButton previewRef={previewRef} />
        </header>
        <main className="flex-1 overflow-hidden">
          <CardPreview cardState={cardState} previewRef={previewRef} />
        </main>
      </div>
    </div>
  )
}
