import type {
  Evidence,
  EvidenceType,
  Finding,
  FindingCategory,
  Observation,
  Severity,
} from "@talion/contracts";
import { stableId } from "./hash";

function evidenceType(kind: Observation["kind"]): EvidenceType {
  switch (kind) {
    case "console_error":
      return "console";
    case "request_failed":
      return "network";
    case "http_error":
      return "http";
    case "blocked_request":
      return "scanner";
  }
}

function category(kind: Observation["kind"]): FindingCategory {
  switch (kind) {
    case "console_error":
      return "runtime";
    case "request_failed":
    case "http_error":
      return "network";
    case "blocked_request":
      return "security";
  }
}

function severity(observation: Observation): Severity {
  if (observation.kind === "http_error") {
    const status = Number(observation.details.status ?? 0);

    if (status >= 500) {
      return "high";
    }

    return "medium";
  }

  if (observation.kind === "request_failed") {
    return "medium";
  }

  if (observation.kind === "console_error") {
    return "medium";
  }

  return "info";
}

function title(observation: Observation): string {
  switch (observation.kind) {
    case "console_error":
      return "Browser runtime error";
    case "request_failed":
      return "Network request failed";
    case "http_error":
      return "HTTP error response";
    case "blocked_request":
      return "Scanner blocked an unsafe request";
  }
}

export function normalizeObservations(observations: Observation[]): {
  evidence: Evidence[];
  findings: Finding[];
} {
  const userRelevant = observations.filter((observation) => observation.kind !== "blocked_request");

  const evidence = userRelevant.map<Evidence>((observation) => ({
    id: stableId("ev", observation.fingerprint),
    scanId: observation.scanId,
    observationId: observation.id,
    type: evidenceType(observation.kind),
    summary: observation.message,
    location: observation.target,
    data: {
      ...observation.details,
      occurrences: observation.occurrences,
      engine: observation.engine,
    },
  }));

  const evidenceByObservation = new Map(
    evidence.map((item) => [item.observationId, item.id] as const),
  );

  const findings = userRelevant.map<Finding>((observation) => ({
    id: stableId("finding", observation.fingerprint),
    scanId: observation.scanId,
    category: category(observation.kind),
    title: title(observation),
    severity: severity(observation),
    confidence: 0.98,
    status: "open",
    fingerprint: observation.fingerprint,
    affectedEntityIds: [],
    evidenceIds: [evidenceByObservation.get(observation.id)!],
    firstSeen: observation.firstObservedAt,
    lastSeen: observation.lastObservedAt,
  }));

  return { evidence, findings };
}
