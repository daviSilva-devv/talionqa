# Talion Verification Skill

Use before marking any implementation task done.

## Verify only what changed
1. Acceptance criteria.
2. Formatting/lint when configured.
3. Type checking when configured.
4. Relevant unit/integration tests.
5. Build when the change can affect build output.
6. Browser/visual inspection for UI work.
7. Console/runtime errors for browser work.
8. Security boundary for scanner/input work.

## Rules
- Do not claim checks ran if they did not.
- Record failures exactly.
- Fix regressions caused by the task before completion.
- Keep verification summaries short.
- Update `.ai/STATUS.md`, `.ai/TASKS.md` and `.ai/HANDOFF.md` when state changed.

A green agent message is not evidence. Test output or direct inspection is.
