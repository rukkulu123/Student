import { BookOpen, AlertCircle } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/types'

export function ChatMessageBubble({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'bg-ink text-paper-raised' : message.unsupported ? 'bg-amber-soft text-ink' : 'bg-paper-raised border border-line text-ink'} rounded-lg px-4 py-3`}>
        {message.unsupported && (
          <div className="flex items-center gap-1.5 text-amber text-xs font-medium mb-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Outside project knowledge</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>

        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-line/60">
            <p className="text-xs text-ink-faint mb-1.5">Sources</p>
            <ul className="space-y-1">
              {message.citations.map((c, i) => (
                <li key={c.id} className="text-xs text-signal-strong flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span>[{i + 1}] {c.materialName} — Page {c.page}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
