import { Button } from '@/components/ui/Button'

export function TutorSuggestions({ suggestions, onSelect }: { suggestions: string[]; onSelect: (s: string) => void }) {
  if (suggestions.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2 pl-1">
      {suggestions.map((s) => (
        <Button key={s} size="sm" variant="secondary" onClick={() => onSelect(s)}>
          {s}
        </Button>
      ))}
    </div>
  )
}
