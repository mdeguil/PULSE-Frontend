# PULSE-Frontend documentation

PULSE V1 – *Coach & Challenges*: a voluntary wellbeing space where an employee personalises their experience,
sets personal goals, joins collective challenges and follows their own progress. A functional admin manages challenges
(and, optionally, content). **Employers never see individual data.**

## Project docs — maintained in the backend repository

Functional and API documentation lives in **one place**, the [PULSE-Backend](https://github.com/mdeguil/PULSE-Backend)
repository (`docs/`). Read it there; do not copy it here, so that both repositories stay consistent.

| Document | Content | Used by the frontend for |
|---|---|---|
| `README.md` | Docs index, V1 scope, out of scope | knowing what to build |
| `business-rules.md` | All business rules `RG-*` | enabling / disabling actions, messages |
| `data-model.md` | Entities, enums, field names | TypeScript types in `src/types/` |
| `api-conventions.md` | Routes, security, error format, endpoint list | `src/api/`, error handling |
| `auth-simulator.md` | Contract of the authentication service | login flow (through the backend) |
| `acceptance-scenarios.md` | Acceptance scenarios `REC-*` | manual demo / tests |
| `decisions.md` | Squad decisions and open questions | ask before inventing a rule |

When the frontend needs a change in those documents (new field, new endpoint, open question), it is made in the backend
repository through a pull request.

## Reference specifications (`specs/` — provided, read-only, in French)

These documents are internal and **not versioned** (`docs/specs/` is git-ignored because the repository is public).
Get them from the team and place them in `docs/specs/` locally. The most useful ones for the frontend:

| Ref | Defines |
|---|---|
| HAC-UX-001 | Reference journeys and screens |
| HAC-BACKLOG-001 | User stories `US-*` |
| HAC-ACC-001 | Acceptance criteria `ACC-*`, scenarios `REC-*` |
| HAC-PROD-001 | Functional scope, business rules, priorities (MoSCoW) |

## Rules for maintaining these docs

- Written in English, like the rest of the project.
- Frontend-only documentation (screens, routing, state handling) goes in this folder.
- A frontend decision left open by the specs is recorded in the backend `decisions.md`.
