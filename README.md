# PULSE – Frontend

Front de PULSE en **React 19 + TypeScript**, construit avec **Vite**.
L'API est développée à part (autre dépôt) : ce projet ne contient que le front.

## Prérequis

- Node.js 20.19+ ou 22.12+
- npm

## Installation

```bash
npm install
cp .env.example .env   # si le fichier .env n'existe pas encore
npm run dev
```

Le site tourne sur http://localhost:5173.

## Scripts

| Commande            | Rôle                                           |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Serveur de dev avec rechargement à chaud       |
| `npm run build`     | Vérification TypeScript puis build dans `dist` |
| `npm run typecheck` | Vérification TypeScript seule                  |
| `npm run lint`      | Lint avec oxlint                               |
| `npm run preview`   | Sert le build de production en local           |

## Communication avec l'API

| Variable                | Rôle                                                        | Défaut                  |
| ----------------------- | ----------------------------------------------------------- | ----------------------- |
| `VITE_API_URL`          | URL de base appelée par le front                            | `/api`                  |
| `VITE_API_PROXY_TARGET` | Adresse de l'API locale, utilisée par le proxy Vite en dev  | `http://localhost:8080` |

En dev, le front appelle `/api/...` et Vite redirige vers `VITE_API_PROXY_TARGET` :
pas besoin de configurer le CORS côté API pour travailler en local.
En prod, mettre l'URL complète de l'API dans `VITE_API_URL`.

Toutes les requêtes passent par `src/api/client.ts` (`api.get`, `api.post`, `api.put`, `api.patch`, `api.delete`) :
JSON automatique, token `Bearer` ajouté s'il existe, erreurs renvoyées sous forme d'`ApiError`.

### Ajouter un endpoint

1. Déclarer les types dans `src/types/`
2. Créer un fichier dans `src/api/` (voir `health.ts`)
3. L'utiliser dans une page avec le hook `useApi` ou directement

```ts
export const userApi = {
  list: (signal?: AbortSignal) => api.get<User[]>('/users', signal),
  create: (data: CreateUserDto) => api.post<User>('/users', data),
}
```

La page d'accueil appelle `GET /health` : tant que l'API n'existe pas, elle affiche « Hors ligne », c'est normal.

## Structure

```
src/
├── api/            # Client HTTP + un fichier par ressource de l'API
├── components/     # Composants réutilisables (layout/ = en-tête, pied de page)
├── config/         # Lecture des variables d'environnement
├── hooks/          # Hooks perso (useApi)
├── pages/          # Une page = une route
├── styles/         # CSS global
├── types/          # Types TypeScript partagés (DTO de l'API)
├── router.tsx      # Déclaration des routes (react-router)
└── main.tsx        # Point d'entrée
```

L'alias `@/` pointe vers `src/` (ex : `import { api } from '@/api/client'`).
