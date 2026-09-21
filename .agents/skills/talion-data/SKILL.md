# Talion Data Modeling Skill

Use for persistence, schemas and domain lifecycle.

## Read first
- `docs/CONTRACTS.md`
- `docs/ARCHITECTURE.md`

## Principles
- Model domain concepts explicitly.
- Separate Observation, Evidence and Finding.
- Findings persist across scans through stable fingerprints.
- Store first_seen, last_seen and lifecycle status where applicable.
- Project DNA is durable; graph layout is derived.
- Prefer relational modeling when relationships/lifecycle matter.
- JSON is appropriate for scanner-specific raw payloads, not as an excuse to avoid modeling.
- Add indexes for known access patterns, not speculation.
- Schema changes require migrations once persistence exists.

Avoid duplicating the same source of truth in multiple tables/services.
