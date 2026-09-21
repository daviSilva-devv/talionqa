# Talion Visual QA Skill

Use after meaningful UI changes and before marking frontend work complete.

## Tools

Prefer Playwright MCP for:
- navigation;
- accessibility snapshots;
- interaction;
- viewport changes;
- screenshots when visual inspection is needed.

## Minimum QA matrix

Desktop:
- 1440 × 900

Mobile:
- 390 × 844

Add another viewport only when the layout has a breakpoint-specific risk.

## Pass 1 — structure

Check:
- page loads without runtime errors;
- primary flow is operable;
- headings/landmarks make sense;
- buttons/inputs have accessible names;
- keyboard focus is visible;
- no accidental horizontal overflow;
- loading, empty and error states exist where applicable.

Use accessibility snapshots here before screenshots.

## Pass 2 — visual

Use screenshots when judging:
- hierarchy;
- whitespace;
- typography;
- clipping;
- awkward empty areas;
- density;
- contrast;
- node/edge readability;
- mobile composition;
- generic AI-looking patterns.

## Talion-specific critique

Reject:
- default admin-dashboard composition;
- excessive cards;
- giant sidebars;
- gratuitous glassmorphism;
- rainbow gradients;
- dense graph spaghetti;
- motion that does not communicate state.

Look for:
- calm white/off-white base;
- purposeful purple emphasis;
- spatial/contextual navigation;
- strong project-map readability;
- localized finding emphasis.

## Iteration rule

Do one structured QA pass by default.

If a core surface such as landing, intake, X-Ray or finding detail fails visual QA:
1. fix the concrete failures;
2. run one second pass on the affected viewports.

Do not loop endlessly polishing subjective details.

## Report

Record only:
- viewports checked;
- concrete failures found;
- fixes made;
- remaining known limitation.

Do not write a long aesthetic essay.
