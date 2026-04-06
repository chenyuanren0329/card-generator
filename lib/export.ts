// lib/export.ts
import html2canvas from 'html2canvas'

export async function exportCardAsPNG(
  element: HTMLElement,
  filename: string = `card-${Date.now()}.png`
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false
    } as any)

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    }, 'image/png', 0.95)
  } catch (error) {
    console.error('Export failed:', error)
    throw error
  }
}
