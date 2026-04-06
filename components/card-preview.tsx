// components/card-preview.tsx
'use client'

import { CardState } from '@/lib/types'
import { gradients } from '@/lib/gradients'

interface CardPreviewProps {
  cardState: CardState
  previewRef: React.RefObject<HTMLDivElement>
}

export function CardPreview({ cardState, previewRef }: CardPreviewProps) {
  const getAspectRatio = () => {
    switch (cardState.aspectRatio) {
      case '3:4': return '3/4'
      case '4:3': return '4/3'
      case '9:6': return '9/6'
      case 'auto': return 'auto'
    }
  }

  const getBackground = () => {
    if (cardState.backgroundType === 'gradient') {
      const gradient = gradients.find(g => g.id === cardState.backgroundValue)
      return gradient?.css || gradients[0].css
    } else if (cardState.backgroundType === 'preset') {
      return `url(${cardState.backgroundValue})`
    } else {
      return `url(${cardState.backgroundValue})`
    }
  }

  const getFontFamily = (font: string) => {
    if (font === 'Montserrat') return 'var(--font-montserrat)'
    if (font === 'Inter') return 'var(--font-inter)'
    if (font === 'Noto Sans SC') return 'var(--font-noto-sans-sc)'
    return 'var(--font-montserrat)'
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-12 bg-slate-50">
      <div
        ref={previewRef}
        className="relative shadow-2xl rounded-lg overflow-hidden"
        style={{
          aspectRatio: getAspectRatio(),
          width: cardState.aspectRatio === 'auto' ? 'auto' : '100%',
          maxWidth: '800px',
          maxHeight: '80vh',
          background: getBackground(),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          {cardState.title && (
            <h1
              style={{
                fontFamily: getFontFamily(cardState.titleFont),
                fontSize: `${cardState.titleSize}px`,
                fontWeight: cardState.titleWeight,
                color: cardState.titleColor,
                marginBottom: '24px'
              }}
            >
              {cardState.title}
            </h1>
          )}
          {cardState.content && (
            <p
              style={{
                fontFamily: getFontFamily(cardState.contentFont),
                fontSize: `${cardState.contentSize}px`,
                fontWeight: cardState.contentWeight,
                color: cardState.contentColor,
                whiteSpace: 'pre-wrap'
              }}
            >
              {cardState.content}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
