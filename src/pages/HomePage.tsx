import { healthApi } from '@/api/health'
import { useApi } from '@/hooks/useApi'

export function HomePage() {
  const { data, error, loading, reload } = useApi(healthApi.check)

  return (
    <section>
      <h1>Bienvenue sur PULSE</h1>
      <p>Front React + TypeScript prêt à communiquer avec l'API.</p>

      <div className="card">
        <h2>État de l'API</h2>
        {loading && <p>Connexion en cours…</p>}
        {error && <p className="status status--error">Hors ligne : {error.message}</p>}
        {data && <p className="status status--ok">En ligne ({data.status})</p>}
        <button type="button" onClick={reload}>Réessayer</button>
      </div>
    </section>
  )
}
