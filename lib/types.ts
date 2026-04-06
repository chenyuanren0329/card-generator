// lib/types.ts
export interface CardState {
  title: string
  content: string
  backgroundType: 'preset' | 'gradient' | 'upload'
  backgroundValue: string
  titleFont: string
  titleSize: number
  titleWeight: 300 | 400 | 500 | 600 | 700
  titleColor: string
  contentFont: string
  contentSize: number
  contentWeight: 300 | 400 | 500 | 600 | 700
  contentColor: string
  aspectRatio: '3:4' | '4:3' | '9:6' | 'auto'
}

export const defaultCardState: CardState = {
  title: '',
  content: '',
  backgroundType: 'gradient',
  backgroundValue: 'gradient-1',
  titleFont: 'Montserrat',
  titleSize: 48,
  titleWeight: 700,
  titleColor: '#FFFFFF',
  contentFont: 'Montserrat',
  contentSize: 24,
  contentWeight: 400,
  contentColor: '#FFFFFF',
  aspectRatio: '4:3'
}
