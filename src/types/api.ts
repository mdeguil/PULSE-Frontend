export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiErrorBody {
  message?: string
  errors?: Record<string, string[]>
}

export interface HealthStatus {
  status: string
}
