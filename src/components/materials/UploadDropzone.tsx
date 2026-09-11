import { useCallback, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UploadDropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    onFiles(Array.from(fileList).filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')))
  }, [onFiles])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click() }}
      className={cn(
        'border-2 border-dashed rounded-lg py-10 px-6 flex flex-col items-center text-center cursor-pointer transition-colors',
        dragging ? 'border-signal bg-signal-soft' : 'border-line hover:border-ink-faint',
      )}
    >
      <UploadCloud className="w-6 h-6 text-ink-faint mb-2" />
      <p className="text-sm text-ink font-medium">Drop a PDF here, or click to browse</p>
      <p className="text-xs text-ink-faint mt-1">Your Tutor becomes more reliable as materials finish processing.</p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
