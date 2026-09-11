import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Layers } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { SpaceCard } from '@/components/learning/SpaceCard'
import { listSpaces, createSpace } from '@/api/spaces'

export default function SpacesList() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const queryClient = useQueryClient()

  const { data: spaces, isLoading } = useQuery({ queryKey: ['spaces'], queryFn: listSpaces })

  const mutation = useMutation({
    mutationFn: () => createSpace({ name, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaces'] })
      setOpen(false)
      setName('')
      setDescription('')
    },
  })

  return (
    <AppShell breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/app/dashboard' }, { label: 'Spaces' }]} />}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display">Spaces</h1>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Create Space</Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      )}

      {!isLoading && spaces?.length === 0 && (
        <EmptyState
          icon={<Layers className="w-6 h-6" />}
          title="Create your first learning Space."
          description="Spaces organize related projects, so your progress and mastery stay grouped by topic."
          action={<Button onClick={() => setOpen(true)}>Create Space</Button>}
        />
      )}

      {!isLoading && spaces && spaces.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((s) => <SpaceCard key={s.id} space={s} />)}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Create Space">
        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-4">
          <div>
            <label className="text-sm text-ink-soft block mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-ink-soft block mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded border border-line bg-paper px-3 py-2 text-sm focus:border-signal focus:outline-none" />
          </div>
          <Button type="submit" className="w-full" disabled={!name.trim() || mutation.isPending}>
            {mutation.isPending ? 'Creating...' : 'Create Space'}
          </Button>
        </form>
      </Modal>
    </AppShell>
  )
}
