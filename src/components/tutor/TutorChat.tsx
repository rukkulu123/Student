import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SendHorizontal, Loader2 } from 'lucide-react'
import { getConversation, sendMessage } from '@/api/tutor'
import { ChatMessageBubble } from './ChatMessage'
import { TutorSuggestions } from './TutorSuggestions'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'

export function TutorChat({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: messages, isLoading, isError, refetch } = useQuery({
    queryKey: ['tutor-conversation', projectId],
    queryFn: () => getConversation(projectId),
  })

  const mutation = useMutation({
    mutationFn: (content: string) => sendMessage(projectId, content),
    onSuccess: (updated) => {
      queryClient.setQueryData(['tutor-conversation', projectId], updated)
    },
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, mutation.isPending])

  function submit(content: string) {
    const trimmed = content.trim()
    if (!trimmed || mutation.isPending) return
    mutation.mutate(trimmed)
    setDraft('')
  }

  const lastAssistant = messages?.filter((m) => m.role === 'assistant').slice(-1)[0]

  if (isError) {
    return <ErrorState message="Unable to get a response." onRetry={() => refetch()} />
  }

  return (
    <div className="flex flex-col surface-card overflow-hidden" style={{ height: '640px' }}>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-16 w-2/3" />
            <Skeleton className="h-20 w-3/4 ml-auto" />
          </div>
        )}
        {messages?.map((m) => <ChatMessageBubble key={m.id} message={m} />)}

        {mutation.isPending && (
          <div className="flex items-center gap-2 text-ink-faint text-sm pl-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Grounding an answer in your materials...</span>
          </div>
        )}

        {!mutation.isPending && lastAssistant?.suggestedFollowUps && (
          <TutorSuggestions suggestions={lastAssistant.suggestedFollowUps} onSelect={submit} />
        )}

        {mutation.isError && (
          <div className="flex items-center gap-3 text-sm text-rust">
            <span>Unable to get a response.</span>
            <Button size="sm" variant="secondary" onClick={() => mutation.mutate(draft || 'Please try again')}>Retry</Button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(draft) }}
        className="border-t border-line p-3 flex items-end gap-2"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(draft) }
          }}
          placeholder="Ask about your learning materials..."
          rows={1}
          className="flex-1 resize-none rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none"
        />
        <Button type="submit" disabled={!draft.trim() || mutation.isPending} aria-label="Send message">
          <SendHorizontal className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
