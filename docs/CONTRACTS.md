# Domain Contracts v0

These are semantic contracts. Implementation types belong in `packages/contracts`.

## Observation
A raw scanner-produced signal.

Required concepts:
- observation ID;
- scan ID;
- source engine;
- kind;
- target/location;
- timestamp;
- raw structured payload;
- deterministic fingerprint when possible.

## Evidence
Stable proof suitable for correlation/presentation.

Examples:
- HTTP status + request URL;
- console exception;
- screenshot reference;
- dependency advisory identifier;
- source file/line;
- scanner rule ID.

Evidence may contain sensitive data; storage/display must be minimized.

## Finding
A normalized project problem.

Required concepts:
- finding ID;
- project ID;
- category;
- title;
- severity;
- confidence;
- status;
- fingerprint;
- affected project entity/entities;
- evidence references;
- first seen / last seen.

A Finding may aggregate multiple observations and evidence records.

## Project DNA
Durable discovered project structure:
- technologies/frameworks;
- modules/services;
- routes/endpoints;
- data stores;
- external integrations;
- dependencies;
- relationships;
- source provenance and confidence.

## Project Graph
Derived UI projection:
- nodes reference real Project DNA entities or Findings;
- edges describe typed relationships;
- graph layout metadata is not domain truth.

## Rule
Scanner-specific fields stay in observations/evidence. They must not leak into the core Finding contract unless TalionQA intentionally adopts that concept.
