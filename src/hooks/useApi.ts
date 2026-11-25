import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '@/api/ApiError'

interface UseApiState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

export function useApi<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<UseApiState<T>>({ data: null, error: null, loading: true })
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: null }))

    fetcher(controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const apiError = error instanceof ApiError ? error : new ApiError(0, 'Erreur inattendue')
        setState({ data: null, error: apiError, loading: false })
      })

    return () => controller.abort()
  }, [fetcher, reloadKey])

  return { ...state, reload }
}
