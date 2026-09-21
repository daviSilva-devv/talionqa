# Talion Frontend Engineering Skill

Use for React/Next.js component implementation, frontend architecture and UI integration.

## Read first
- `docs/FRONTEND_TOOLKIT.md`
- `docs/UI.md`
- only the relevant existing code

## Workflow

1. Understand the user flow and state being implemented.
2. Search the existing TalionQA UI before adding a new component.
3. For non-trivial UI, use the 21st MCP to search for inspiration or reusable open-code patterns.
4. Adapt patterns to TalionQA; never blindly paste a full design system.
5. Keep data/domain logic outside presentational components.
6. Preserve server/client boundaries intentionally.
7. Add dependencies only with a concrete reason.
8. Load `talion-motion` when motion matters.
9. Finish with `talion-visual-qa` and `talion-verify`.

## Engineering rules

- TypeScript strictness stays on.
- Prefer semantic HTML and native platform behavior.
- Avoid client components unless interaction requires them.
- Avoid giant components; split by responsibility, not arbitrary line count.
- Never hard-code fake scan results as if they are real.
- Preserve domain IDs independently from UI/layout IDs.
- Keep loading, empty, error and success states explicit.
- Mobile is part of the initial implementation.

## 21st.dev usage

Use 21st primarily for:
- component search;
- interaction inspiration;
- theme/reference discovery;
- retrieving implementation patterns.

Use hosted generation selectively. Our coding agent should normally adapt retrieved code itself.
