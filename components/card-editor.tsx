// components/card-editor.tsx
'use client'

import { CardState } from '@/lib/types'
import { gradients } from '@/lib/gradients'
import { fontOptions } from '@/lib/fonts'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

interface CardEditorProps {
  cardState: CardState
  setCardState: (state: CardState) => void
}

export function CardEditor({ cardState, setCardState }: CardEditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string>('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('文件大小不能超过 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setUploadedImage(dataUrl)
      setCardState({ ...cardState, backgroundType: 'upload', backgroundValue: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const presetImages = [
    '/backgrounds/app 背景.png',
    '/backgrounds/背景-动漫.png',
    '/backgrounds/背景-晚霞.png',
    '/backgrounds/背景.webp'
  ]

  return (
    <div className="w-[400px] h-screen bg-slate-900 text-white p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* 内容区块 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={cardState.title}
              onChange={(e) => setCardState({ ...cardState, title: e.target.value })}
              placeholder="输入标题"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="content">正文</Label>
            <Textarea
              id="content"
              value={cardState.content}
              onChange={(e) => setCardState({ ...cardState, content: e.target.value })}
              placeholder="输入正文内容"
              rows={4}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>

        {/* 背景选择 */}
        <div>
          <Label>背景</Label>
          <Tabs defaultValue="gradient" className="mt-2">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="preset">预设图片</TabsTrigger>
              <TabsTrigger value="gradient">渐变</TabsTrigger>
              <TabsTrigger value="upload">上传</TabsTrigger>
            </TabsList>
            <TabsContent value="preset" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {presetImages.map((img) => (
                  <div
                    key={img}
                    onClick={() => setCardState({ ...cardState, backgroundType: 'preset', backgroundValue: img })}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      cardState.backgroundType === 'preset' && cardState.backgroundValue === img
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gradient" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {gradients.map((gradient) => (
                  <div
                    key={gradient.id}
                    onClick={() => setCardState({ ...cardState, backgroundType: 'gradient', backgroundValue: gradient.id })}
                    className={`cursor-pointer rounded-lg h-20 border-2 ${
                      cardState.backgroundType === 'gradient' && cardState.backgroundValue === gradient.id
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                    style={{ background: gradient.css }}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="text-sm text-slate-400"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* 标题样式 */}
        <div className="space-y-4">
          <Label>标题样式</Label>
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-slate-400">字体</Label>
              <Select value={cardState.titleFont} onValueChange={(value) => value && setCardState({ ...cardState, titleFont: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-slate-400">字号: {cardState.titleSize}px</Label>
              <Slider
                value={[cardState.titleSize]}
                onValueChange={(value) => {
                  const newValue = Array.isArray(value) ? value[0] : value
                  setCardState({ ...cardState, titleSize: newValue })
                }}
                min={24}
                max={72}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm text-slate-400">字重</Label>
              <Select value={String(cardState.titleWeight)} onValueChange={(value) => setCardState({ ...cardState, titleWeight: Number(value) as any })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semibold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-slate-400">颜色</Label>
              <Input
                type="color"
                value={cardState.titleColor}
                onChange={(e) => setCardState({ ...cardState, titleColor: e.target.value })}
                className="h-10 bg-slate-800 border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* 正文样式 */}
        <div className="space-y-4">
          <Label>正文样式</Label>
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-slate-400">字体</Label>
              <Select value={cardState.contentFont} onValueChange={(value) => value && setCardState({ ...cardState, contentFont: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-slate-400">字号: {cardState.contentSize}px</Label>
              <Slider
                value={[cardState.contentSize]}
                onValueChange={(value) => {
                  const newValue = Array.isArray(value) ? value[0] : value
                  setCardState({ ...cardState, contentSize: newValue })
                }}
                min={14}
                max={36}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm text-slate-400">字重</Label>
              <Select value={String(cardState.contentWeight)} onValueChange={(value) => setCardState({ ...cardState, contentWeight: Number(value) as any })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semibold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-slate-400">颜色</Label>
              <Input
                type="color"
                value={cardState.contentColor}
                onChange={(e) => setCardState({ ...cardState, contentColor: e.target.value })}
                className="h-10 bg-slate-800 border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* 卡片尺寸 */}
        <div>
          <Label>卡片尺寸</Label>
          <Select value={cardState.aspectRatio} onValueChange={(value: any) => setCardState({ ...cardState, aspectRatio: value })}>
            <SelectTrigger className="bg-slate-800 border-slate-700 mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3:4">3:4 竖图</SelectItem>
              <SelectItem value="4:3">4:3 横图</SelectItem>
              <SelectItem value="9:6">9:6 宽屏</SelectItem>
              <SelectItem value="auto">适应背景</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
