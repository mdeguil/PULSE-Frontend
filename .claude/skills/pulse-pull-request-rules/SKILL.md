---
name: pulse-pull-request-rules
description: PULSE team pull request rules. Use them to open, review, comment on or merge a PR in the PULSE project, and to know whether a human review is required.
---

# PULSE pull request rules

A PR moves work from one branch to the next one up (see `.claude/CLAUDE.md`, section Git):
work branch → `dev` → `main`.

**A review by another team member is only required for PRs targeting `main`.** Every other PR is merged by its owner
without a human review — each commit has already been checked by the `commit-reviewer` agent (skill `pulse-commit-convention`).

## Which PR needs what

| PR | Human review | Who merges |
| --- | --- | --- |
| work branch → `dev` | not required | the branch owner |
| `dev` → `main` | **required** (approval by another member) | the PR author, after approval |

## Opening a PR (all PRs)

1. The PR is opened by the branch owner.
2. It targets the next branch up: a work branch targets `dev` (the branch it was created from); `dev` targets `main`.
3. A PR from a work branch covers one topic; if it covers several unrelated topics, split it.
   The promotion PR `dev` → `main` naturally groups several topics.
4. The title follows the commit convention: `Type : description in English` (e.g. `Feature : add challenge list page`).
5. The description contains:
    - what changed;
    - how to test;
    - a screenshot if the display changed.
6. Before opening the PR:
    - `git pull origin <target branch>` and resolve conflicts on your branch;
    - check that the project starts (`npm run dev`) and that `npm run lint` and `npm run build` pass;
    - review your own changes in the *Files changed* tab.
7. If the work is not finished, open the PR as a *Draft*.

## PRs targeting `main`: review

### Choosing the reviewer

- The author picks a reviewer in the team, or the PR is reviewed by the project lead.
- Never review your own PR.

### Reviewing

- The reviewer reviews within 24 working hours.
- Every comment starts with a prefix that gives its weight:
    - `blocking:` must be fixed before merging;
    - `suggestion:` optional improvement;
    - `question:` request for explanation.
- Comments are about the code, never about the person, and suggest a solution when possible.
- If everything is fine, the reviewer approves the PR (*Approve*).

### Handling comments

- The author fixes the code, or replies to the comment if they think they are right.
- Once the fixes are pushed, they request a new review (*Re-request review*).
- The person who wrote the comment marks the conversation as resolved, not the PR author.
- If both still disagree after discussing, the team decides at the next team meeting.

## Merging (all PRs)

- A PR targeting `main` is never merged without approval.
- Choose **"Create a merge commit"**, never *Squash* or *Rebase*: branches are reused, and a squash would bring conflicts back at the next merge.
- Do not delete your branch after merging.
- After merging, run `git pull origin <target branch>` on your branch before starting new work.

## How to apply this skill

- To write a PR: suggest a title in the commit format and a description with the required items.
- For a PR not targeting `main`: do not request a reviewer; the owner merges it themselves with a merge commit.
- For a PR targeting `main`: request a reviewer, and write review comments with the `blocking:`, `suggestion:` or `question:` prefixes.
- When asked "what do I do now": give the next step of the PR.
