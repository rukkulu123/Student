import { FileText, AlertTriangle, RefreshCcw, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProcessingStatus } from './ProcessingStatus'
import type { Material } from '@/types'

export function MaterialCard({ material, onRetry, onRemove }: { material: Material; onRetry?: () => void; onRemove?: () => void }) {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 bg-rust-soft">
            <FileText className="w-4 h-4 text-rust" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink truncate">{material.filename}</p>
            <p className="text-xs text-ink-faint">
              {(material.sizeKb / 1024).toFixed(1)} MB · Uploaded {formatDistanceToNow(new Date(material.uploadedAt), { addSuffix: true })}
              {material.pages ? ` · ${material.pages} pages` : ''}
            </p>
          </div>
          {material.status === 'ready' && <Badge tone="signal">Ready</Badge>}
          {material.status === 'processing' && <Badge tone="indigo">Processing</Badge>}
          {material.status === 'failed' && <Badge tone="rust">Failed</Badge>}
        </div>

        {material.status === 'processing' && <ProcessingStatus stage={material.stage} />}

        {material.status === 'failed' && (
          <div className="flex items-start gap-2 bg-rust-soft rounded p-2.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rust shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs text-rust">Something went wrong while processing this document.</p>
              {material.errorMessage && <p className="text-xs text-ink-faint mt-0.5">{material.errorMessage}</p>}
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="secondary" onClick={onRetry}>
                  <RefreshCcw className="w-3 h-3" /> Retry
                </Button>
                <Button size="sm" variant="ghost" onClick={onRemove}>
                  <Trash2 className="w-3 h-3" /> Remove
                </Button>
              </div>
            </div>
          </div>
        )}

        {material.status === 'ready' && material.conceptsExtracted.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {material.conceptsExtracted.map((c) => (
              <Badge key={c} tone="neutral">{c}</Badge>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
