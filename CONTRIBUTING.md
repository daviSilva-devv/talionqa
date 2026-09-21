# Contributing to TalionQA

## Work style
- One task ID per meaningful change.
- Read `AGENTS.md` first.
- Prefer small reviewable commits.
- Do not mix product redesign with unrelated implementation.

## Branches
Use descriptive task branches when working locally, e.g.:
`tal-001/url-findings`

## Pull requests
A PR should state:
- task ID and goal;
- what changed;
- evidence/tests;
- screenshots for UI changes;
- remaining limitations.

## Definition of done
- acceptance criteria satisfied;
- verification performed;
- no known failing checks hidden;
- docs/contracts updated if behavior changed;
- `.ai/STATUS.md` and task state reflect reality.

## Agent collaboration
Agent output is not trusted merely because it compiles. Cross-review is encouraged for high-risk scanner/security/architecture changes.
