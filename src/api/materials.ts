import { MOCK_MODE, apiClient } from './client'
import { dbListMaterials, dbUploadMaterial } from '@/mocks/db'
import type { Material } from '@/types'

export async function listMaterials(projectId: string): Promise<Material[]> {
  if (MOCK_MODE) return dbListMaterials(projectId)
  const { data } = await apiClient.get<Material[]>(`/projects/${projectId}/materials`)
  return data
}

export async function uploadMaterial(projectId: string, file: File): Promise<Material> {
  if (MOCK_MODE) return dbUploadMaterial(projectId, file.name)
  const form = new FormData()
  form.append('file', file)
  const { data } = await apiClient.post<Material>(`/projects/${projectId}/materials`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function retryMaterial(materialId: string): Promise<Material> {
  if (MOCK_MODE) throw new Error('retry not implemented in mock mode')
  const { data } = await apiClient.post<Material>(`/materials/${materialId}/retry`)
  return data
}
