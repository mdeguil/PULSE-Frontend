---
name: pulse-commit-convention
description: PULSE team commit convention. Use it to write, suggest, fix or review a Git commit message in the PULSE project.
---

# PULSE commit convention

Every commit says in one line, in English, what changed. Reading `git log`, anyone on the team must understand the history without opening the code.

This skill only covers commits. Pull requests and merges are out of scope.

## Where to commit

- Commit only on your own work branch (in this repository, see the base branch in `.claude/CLAUDE.md`, section Git).
- Never commit directly on `main` (production), `dev` or the reference branches listed in `.claude/CLAUDE.md`.

## Format

```
Type : description in English
```

The type, a space, a colon, a space, then the description.

If the change needs an explanation, leave a blank line and add a body in English that says **why**, not how:

```
Fix : prevent HomePage from crashing when user has no challenge

The API returns null instead of an empty array for new users.
```

## Allowed types

| Type | When to use it | Example |
| --- | --- | --- |
| `Feature` | New visible or usable feature | `Feature : add challenge list page` |
| `Fix` | Bug fix | `Fix : redirect to login when token is expired` |
| `Update` | Change to an existing feature | `Update : show challenge progress in percent` |
| `Refactor` | Code rewrite without behaviour change | `Refactor : move API calls into apiClient` |
| `Style` | CSS, layout, appearance only | `Style : align buttons on ProfilePage` |
| `Docs` | README, documentation | `Docs : add install steps to README` |
| `Test` | Adding or changing tests | `Test : add tests for LoginPage form` |
| `Chore` | Config, dependencies, structure, tooling | `Chore : create project folder structure` |

A commit has only one type. If it needs two, make two commits.

## Writing rules

1. English only, in the title and in the body.
2. Verb in the imperative present: `add`, `remove`, `fix`, `display`, `prevent`. No past tense (`added`) nor -ing form (`adding`). The sentence must complete "If applied, this commit will…".
3. First letter of the description in lowercase, except proper nouns or component names (`HomePage`, `AuthContext`).
4. No final period.
5. 72 characters maximum for the whole line, type included.
6. Name the place concerned: page, component, class or route (`LoginPage`, `useAuth`, `/challenges`).
7. Do not repeat the type in the description (`Fix : fix login` says nothing).
8. One commit = one logical change, no catch-all commits.
9. Forbidden messages: `update`, `fix`, `wip`, `test`, `modif`, `.` or any message that says nothing.

## Good and bad examples

| Avoid | Why | Write |
| --- | --- | --- |
| `Fix : bug HomePage generated now` | Does not say which bug nor what was done | `Fix : render HomePage when challenge list is empty` |
| `update` | No type, no description | `Update : sort challenges by end date` |
| `Feature : added login` | Past tense | `Feature : add login form with email and password` |
| `Fix : correction du header` | In French | `Fix : keep Header visible on mobile scroll` |
| `Feature : login + navbar + css` | Three changes in one commit | Three commits: `Feature`, `Feature`, `Style` |
| `Fix: typo.` | No space before the colon, final period | `Docs : fix typo in README` |

## Before committing

- Be on your work branch (`git branch`).
- Do not commit `node_modules`, `dist/`, `.idea/`, `.env`, `.env.local`, `.DS_Store` or API keys.
- Remove debug traces (`console.log`, `debugger`) and forgotten commented-out code.
- Frontend: check that `npm run lint` and `npm run build` pass.

## How to apply this skill

- To suggest a message: start from the actual changes (`git diff --staged`), pick a single type and write the line in the format above.
- If the changes cover several topics, suggest splitting them into several commits.
- To review a message: say which rules are broken and give the corrected version.

## Mandatory review before every commit

No commit is made until a subagent has reviewed and approved the code.

1. Stage the changes (`git add`), then get the diff with `git diff --staged`.
2. Run the **`commit-reviewer`** subagent (`.claude/agents/commit-reviewer.md`), which did not write the code. Give it the planned commit message; it reads the staged diff itself.
3. The subagent checks:
    - that the code does what the commit message says;
    - that there is no obvious bug, type error or missed case (null value, empty list, API error);
    - that no debug trace (`console.log`, `System.out.println`, `printStackTrace()`), commented-out code or sensitive file (`.env`, API keys) is left;
    - that the commit contains only one logical change;
    - that the message follows this convention;
    - that the project's blocking rules (`.claude/CLAUDE.md`) and the docs (`docs/`) are respected.
4. The subagent returns a clear verdict: **OK** or **Changes required**, with the list of problems.
5. If the verdict is **Changes required**: report the problems to the user, fix them, then run the review again. Do not commit.
6. Only when the verdict is **OK** may the commit be made.
