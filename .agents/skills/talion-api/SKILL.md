# Talion API & Contract Skill

Use for HTTP APIs, shared schemas and service boundaries.

## Rules
- Domain contracts live in `packages/contracts`.
- Validate all external input at boundaries.
- Return stable machine-readable error codes.
- Keep scanner/vendor details behind adapters.
- Prefer idempotent job creation/status patterns where practical.
- Long scans are jobs, not long blocking HTTP requests.
- Expose project/finding IDs, not internal process details.
- Version contracts intentionally when breaking semantics.

Do not design endpoints for hypothetical enterprise use cases before V0 proves the core scan flow.
