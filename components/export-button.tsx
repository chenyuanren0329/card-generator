// components/export-button.tsx
'use client'

import { Button } from '@/components/ui/button'
import { exportCardAsPNG } from '@/lib/export'
import { useState } from 'react'

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>
}

export function ExportButton({ previewRef }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!previewRef.current) return

    setIsExporting(true)
    try {
      await exportCardAsPNG(previewRef.current)
    } catch (error) {
      alert('导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isExporting ? '导出中...' : '导出 PNG'}
    </Button>
  )
}
