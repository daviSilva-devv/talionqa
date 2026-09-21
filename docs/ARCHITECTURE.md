# Architecture — Foundation

## Guiding architecture

```text
Input (URL / Repository)
          ↓
      Intake
          ↓
  Discovery Engine
          ↓
     Project DNA
          ↓
  Scanner Adapters
  ┌──────┼──────────┐
Playwright Trivy/OSV others
  └──────┼──────────┘
          ↓
 Raw Observations
          ↓
 Evidence Normalizer
          ↓
 Finding Correlator
          ↓
 Normalized Findings
          ↓
     X-Ray Graph
```

## Important separation

### Observation
Raw signal from a scanner. Example: one failed request or one vulnerable dependency match.

### Evidence
Stable, presentable proof derived from observations.

### Finding
A normalized problem that may aggregate multiple observations/evidence items.

### Project DNA
Durable internal representation of project technologies, modules, routes, services, integrations and relationships.

### Project Graph
UI-oriented nodes/edges derived from Project DNA and Findings. It is not the source of truth.

## Initial repository layout

```text
apps/web              Next.js product UI
services/scanner      local/worker scanner orchestration
packages/contracts    shared schemas and IDs
packages/ui           Talion visual primitives
docs                   product/architecture/security decisions
.agents/skills         agent skills
.ai                    operational project state
```

## Technology direction
- TypeScript-first control plane.
- Next.js for web product.
- React Flow / XYFlow for graph rendering.
- Playwright for runtime/browser inspection.
- Existing security/dependency scanners behind adapters.
- PostgreSQL when persistence is introduced.
- Local worker on developer PC during early validation.
- Cloud infrastructure only as usage requires it.

Python is allowed where an engine meaningfully benefits from it; do not introduce a second runtime without a concrete advantage.

## Replaceability
External scanners must produce internal contracts. The product must not expose vendor-specific output as its domain model.

## Cost
Free scans must have explicit time/page/repository limits. AI analysis is downstream from deterministic evidence, not the default first step.
