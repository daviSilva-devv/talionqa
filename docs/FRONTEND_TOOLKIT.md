# TalionQA Frontend & Agent Toolkit

This document defines how we build distinctive UI without turning the repository into a component-library landfill.

## Runtime we already have

Keep:
- Next.js
- React
- TypeScript
- XYFlow / React Flow for X-Ray

Do not rewrite working product foundations just because a newer framework is fashionable.

## UI sourcing hierarchy

When a UI task starts:

1. Reuse an existing TalionQA component if it fits.
2. Search 21st.dev through MCP for strong components, themes or inspiration.
3. Prefer accessible/open primitives and copyable source over opaque black-box components.
4. Adapt the result into TalionQA's design language.
5. Build custom UI only when the interaction is part of TalionQA's differentiation.

21st.dev is a discovery/source tool, not the design director.

## Preferred ecosystem

Evaluate when needed, not pre-install by default:

- Base UI or equivalent accessible headless primitives
- shadcn-style open-code conventions
- Motion for purposeful animation
- Motion Primitives for polished interaction patterns
- React Bits / Magic UI only for selected high-impact moments
- XYFlow for project topology and X-Ray

A dependency must earn its place. Do not add a package for one trivial animation or button.

## 21st MCP policy

Prefer low-cost retrieval:
- search
- get_component
- get_inspiration
- theme/template discovery

Use hosted generation only when it materially saves work and the connected account supports it.

Never paste a component unchanged. Check:
- license/source expectations;
- accessibility;
- bundle impact;
- responsiveness;
- Talion visual fit;
- unnecessary dependencies.

## Browser QA

Playwright MCP is the default UI verification tool.

For meaningful UI changes:
1. start the app;
2. inspect the actual rendered page;
3. check accessibility structure;
4. inspect desktop;
5. inspect mobile;
6. screenshot only when visual judgment benefits from pixels;
7. fix verified issues;
8. rerun only the affected checks.

Core product surfaces should receive a second visual pass after fixes.

## Token discipline

- Use accessibility snapshots for structure and interaction; they are cheaper than dumping DOM or repeatedly analyzing screenshots.
- Use screenshots for composition, spacing, color, typography and visual balance.
- Read the smallest relevant skill/doc.
- Search existing components before generating new ones.
- Do not ask an LLM to rediscover framework documentation already available through types/tests.

## Product quality bar

A frontend task is incomplete when:
- it only compiles;
- desktop works but mobile was not checked;
- loading/empty/error states are missing;
- focus/keyboard behavior is broken;
- the result looks like a generic AI dashboard;
- motion is decorative rather than informative.

## Future-project portability

The reusable pattern is:

```text
project rules
    +
small on-demand skills
    +
component discovery MCP
    +
browser MCP
    +
typed codebase
    +
automated verification
```

Keep project-specific visual identity separate from the reusable agent workflow so this harness can be extracted into future projects.
