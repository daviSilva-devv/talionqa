# Talion Scanner Skill

Use for scanner adapters, browser/runtime analysis and repository engines.

## Pipeline
Target → bounded execution → Observation → Evidence → normalization/correlation → Finding.

## Rules
- Scanner adapters emit observations; they do not own product truth.
- Prefer deterministic evidence before LLM analysis.
- Enforce time/resource/size/page limits.
- Deduplicate repeated raw signals.
- Keep tool/vendor payloads encapsulated.
- Include provenance: engine, rule/kind, target and timestamp.
- Never claim exploitability solely because a scanner emitted a warning.
- Make adapters replaceable.

## Website V0
Focus on safe observable behavior: HTTP, console errors, failed requests, broken navigation and bounded rendering checks.

## Repository V0
Use proven engines for dependencies/secrets/config. Do not recreate vulnerability databases.

Load `talion-security` for target-safety decisions.
