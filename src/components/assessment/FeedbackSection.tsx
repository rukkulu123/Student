export function FeedbackSection({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-xs text-ink-faint mb-1">{title}</p>
      <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
    </div>
  )
}
