import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FileText } from 'lucide-react'
import { useProject } from '@/hooks/useProject'
import { UploadDropzone } from '@/components/materials/UploadDropzone'
import { MaterialCard } from '@/components/materials/MaterialCard'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { listMaterials, uploadMaterial } from '@/api/materials'

export default function ProjectMaterials() {
  const { project } = useProject()
  const queryClient = useQueryClient()

  const { data: materials, isLoading, isError, refetch } = useQuery({
    queryKey: ['materials', project?.id],
    queryFn: () => listMaterials(project!.id),
    enabled: !!project,
    refetchInterval: (query) => {
      const data = query.state.data
      const hasProcessing = Array.isArray(data) && data.some((m) => m.status === 'processing')
      return hasProcessing ? 1500 : false
    },
  })

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => Promise.all(files.map((f) => uploadMaterial(project!.id, f))),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['materials', project?.id] }),
  })

  if (isError) return <ErrorState onRetry={() => refetch()} />

  return (
    <div className="space-y-6">
      <UploadDropzone onFiles={(files) => uploadMutation.mutate(files)} />

      {isLoading && <SkeletonTable />}

      {!isLoading && materials?.length === 0 && (
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="Upload a PDF to give your Tutor reliable learning evidence."
          description="Materials are processed in the background and become searchable once ready."
        />
      )}

      {!isLoading && materials && materials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {materials.map((m) => <MaterialCard key={m.id} material={m} />)}
        </div>
      )}
    </div>
  )
}
