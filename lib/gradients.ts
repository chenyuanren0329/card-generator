// lib/gradients.ts
export interface Gradient {
  id: string
  name: string
  css: string
}

export const gradients: Gradient[] = [
  { id: 'gradient-1', name: '日落橙粉', css: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' },
  { id: 'gradient-2', name: '海洋蓝绿', css: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)' },
  { id: 'gradient-3', name: '紫色梦幻', css: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)' },
  { id: 'gradient-4', name: '深邃夜空', css: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)' },
  { id: 'gradient-5', name: '温暖大地', css: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)' },
  { id: 'gradient-6', name: '清新薄荷', css: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)' },
  { id: 'gradient-7', name: '玫瑰金', css: 'linear-gradient(135deg, #E8CBC0 0%, #636FA4 100%)' },
  { id: 'gradient-8', name: '极光绿', css: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)' }
]
