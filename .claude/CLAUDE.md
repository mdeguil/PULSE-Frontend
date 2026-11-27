# PULSE-Frontend

Frontend of **PULSE V1 – Coach & Challenges** (HealthAI Coach, EPSI MSPR TPRE501): a voluntary wellbeing space where an
employee manages preferences, personal goals, collective challenges and a personal progress summary; a functional admin
manages challenges (and optionally content). Employers never see individual data.

The frontend only talks to the **PULSE backend** (repository `PULSE-Backend`, base path `/api/v1`).

## Language

**Everything is written in English**: component, file, function, variable and type names, comments, commit messages,
PR descriptions and documentation.
Exceptions: text displayed to the user may be in French (the product is French-speaking); enum **values** imposed by the
specs stay as-is (`ACTIVITE`, `QUOTIDIEN`, `MATIN`, `FICHE`, …).

## Documentation — read before changing code

Index: `docs/README.md`. Functional and API documentation is maintained in the **backend repository** (`PULSE-Backend/docs/`)
and is the single source of truth — do not duplicate it here:

- Business rules `RG-*` → `business-rules.md`
- Entities / enums / field names → `data-model.md`
- Endpoints, error format, security → `api-conventions.md`
- Acceptance scenarios `REC-*` → `acceptance-scenarios.md`
- Squad choices and open questions → `decisions.md`

Reference screens are in HAC-UX-001 (`docs/specs/`, not versioned). If something is marked _TODO_ or is an open question
in the backend `decisions.md`, ask instead of inventing a rule.

## Non-negotiable rules (acceptance blockers)

- **The frontend never sends a `userId`** to identify the current user: the backend resolves it from the Bearer token.
  Personal data is read from `/api/v1/me/...`.
- **Role checks in the UI are for display only** (hide admin menus, redirect): security is enforced by the backend.
  Handle 401 (back to login) and 403 (access denied) on every call.
- **One API client** (`src/api/apiClient.ts`): base URL from configuration (`src/constants/config.ts`, `VITE_*` variable),
  adds the `Authorization: Bearer` header, maps errors. No `fetch` scattered in components. Never call the auth service directly.
- **Errors**: the API returns `{ "code": "...", "message": "..." }`. Show a user-friendly message based on `code`;
  never display a raw response, stack trace or technical detail.
- **No secrets or passwords** in the repo, the bundle or the console (demo passwords included). Every `VITE_*` variable is
  public once built — never put a key there. Only HAC-DATA-001 synthetic data in mocks.
- **Never log the token or personal data** (`console.log`), and never put them in a URL.
- **Don't add features** outside the V1 scope (see backend `docs/README.md`) at the expense of MUST items.

## Structure

- `src/api/`: API client and calls per resource.
- `src/pages/<domain>/`: one folder per screen (`auth`, `dashboard`, `challenges`, `coach`, `profile`, `not-found`).
- `src/components/layout/`, `src/components/ui/`: layout and reusable UI components.
- `src/context/`, `src/hooks/`: auth context (`AuthContext`, `useAuth`) and shared hooks.
- `src/routes/`: routing (`AppRouter`), route guards by role.
- `src/types/`: TypeScript types matching the backend DTOs (names from `data-model.md`).
- `src/constants/`, `src/utils/`, `src/styles/`: configuration, helpers, global styles.
- `.github/CODEOWNERS`: peakthedev-art is code owner.

## Stack

- React 19, Vite 8, Oxlint (`.oxlintrc.json`).
- Source files in `src/` are TypeScript (`.ts` / `.tsx`); the entry point is still `main.jsx`.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

## Conventions

- Components and pages in PascalCase (`ChallengesPage.tsx`), hooks prefixed with `use` (`useAuth.ts`).
- Field names in types follow the backend DTOs exactly (camelCase, see `data-model.md`).
- Dates are ISO 8601 strings from the API; format them only for display.
- Every screen handles the loading, empty and error states (empty list ≠ error).

## Git

Team rules are in two skills — follow them for every commit and pull request:

- `.claude/skills/pulse-commit-convention/SKILL.md`: format `Type : description in English`, one logical change per commit,
  and a **mandatory review by the `commit-reviewer` agent** (`.claude/agents/commit-reviewer.md`) before any commit — no commit without verdict OK.
- `.claude/skills/pulse-pull-request-rules/SKILL.md`: PR from the work branch to `dev`, title in commit format, "Create a merge commit" only.
  Human review is required **only for PRs targeting `main`**; other PRs are merged by their owner without a reviewer.

Branches in this repository (the skills refer to this section for the base and target branch):

```
main (production) ← dev (integration / reference: PULSE frontend) ← work branches
```

- Every change is made on a work branch created from `dev`, named `<type>/<topic>` (e.g. `feature/challenge-list`, `docs/project-setup`).
- Pull requests from a work branch target `dev`; `dev` is merged into `main` through a pull request.
- Never commit directly on `main` or `dev`. Code owner: peakthedev-art (`.github/CODEOWNERS`).
- Never commit secrets (`.env`, `.env.local`, `.claude/settings.local.json`).
- The GitHub repository is **public**.
