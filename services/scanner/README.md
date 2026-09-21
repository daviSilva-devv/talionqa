# services/scanner

Bounded local/worker scanner orchestration.

Responsibilities:
- safe target validation;
- scanner adapter execution;
- raw Observation production;
- evidence extraction;
- resource/time limits.

Must not own UI concerns or invent user-facing severity without the normalization/correlation layer.
