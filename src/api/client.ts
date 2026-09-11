import axios from 'axios'

// Mock mode is on by default so the UI is fully functional before a real
// backend exists (see src/mocks). Point VITE_API_BASE_URL at a FastAPI
// backend and flip VITE_MOCK_MODE to "false" to go live — no other file
// needs to change, since every function in src/api/*.ts is already async
// and typed against the same request/response models either way.
export const MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      sessionStorage.removeItem('auth_token')
    }
    return Promise.reject(error)
  },
)
