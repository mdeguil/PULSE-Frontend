import type { HealthStatus } from '@/types/api'
import { api } from './client'

export const healthApi = {
  check: (signal?: AbortSignal) => api.get<HealthStatus>('/health', signal),
}
