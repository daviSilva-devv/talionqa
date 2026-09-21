# Talion X-Ray Graph Skill

Use for React Flow/XYFlow, graph projection and spatial interactions.

## Principle
The graph visualizes Project DNA and Findings. It is not the canonical data model.

## Entity families
- project
- module/service
- route/endpoint
- datastore
- external integration
- dependency
- finding
- deployment/change (later)

## Rules
- Keep node counts readable through grouping/progressive disclosure.
- Preserve stable domain IDs independently from layout IDs.
- Edges are typed relationships, not decorative lines.
- Healthy nodes remain visually quiet.
- Findings create localized emphasis.
- Selecting a finding should highlight the affected path/entities.
- Layout metadata stays separate from domain contracts.
- Avoid edge spaghetti: group, collapse, filter or change zoom level.

## Zoom intent
High: system topology.
Medium: module/flow.
Low: evidence/finding path.

Use proven layout engines before writing custom graph layout algorithms.
