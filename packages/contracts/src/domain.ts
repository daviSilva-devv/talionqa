import { z } from "zod";

export const SeveritySchema = z.enum(["info", "low", "medium", "high", "critical"]);
export type Severity = z.infer<typeof SeveritySchema>;

export const FindingStatusSchema = z.enum(["open", "acknowledged", "resolved", "ignored"]);
export type FindingStatus = z.infer<typeof FindingStatusSchema>;

export const FindingCategorySchema = z.enum([
  "runtime",
  "network",
  "availability",
  "security",
  "dependency",
  "configuration",
  "performance",
  "accessibility",
  "quality",
]);
export type FindingCategory = z.infer<typeof FindingCategorySchema>;

export const ObservationKindSchema = z.enum([
  "console_error",
  "request_failed",
  "http_error",
  "blocked_request",
]);
export type ObservationKind = z.infer<typeof ObservationKindSchema>;

export const ScanTargetSchema = z.object({
  kind: z.literal("website"),
  input: z.string().min(1),
  normalizedUrl: z.string().url(),
});
export type ScanTarget = z.infer<typeof ScanTargetSchema>;

export const ObservationSchema = z.object({
  id: z.string().min(1),
  scanId: z.string().min(1),
  engine: z.string().min(1),
  kind: ObservationKindSchema,
  target: z.string().min(1),
  message: z.string().min(1),
  fingerprint: z.string().min(1),
  occurrences: z.number().int().positive(),
  firstObservedAt: z.string().datetime(),
  lastObservedAt: z.string().datetime(),
  details: z.record(z.string(), z.unknown()),
});
export type Observation = z.infer<typeof ObservationSchema>;

export const EvidenceTypeSchema = z.enum([
  "console",
  "network",
  "http",
  "screenshot",
  "source",
  "advisory",
  "scanner",
]);
export type EvidenceType = z.infer<typeof EvidenceTypeSchema>;

export const EvidenceSchema = z.object({
  id: z.string().min(1),
  scanId: z.string().min(1),
  observationId: z.string().min(1),
  type: EvidenceTypeSchema,
  summary: z.string().min(1),
  location: z.string().min(1).optional(),
  data: z.record(z.string(), z.unknown()),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const FindingSchema = z.object({
  id: z.string().min(1),
  scanId: z.string().min(1),
  category: FindingCategorySchema,
  title: z.string().min(1),
  severity: SeveritySchema,
  confidence: z.number().min(0).max(1),
  status: FindingStatusSchema,
  fingerprint: z.string().min(1),
  affectedEntityIds: z.array(z.string()),
  evidenceIds: z.array(z.string()).min(1),
  firstSeen: z.string().datetime(),
  lastSeen: z.string().datetime(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const ScanSummarySchema = z.object({
  observationCount: z.number().int().nonnegative(),
  findingCount: z.number().int().nonnegative(),
  requestCount: z.number().int().nonnegative(),
  durationMs: z.number().int().nonnegative(),
});
export type ScanSummary = z.infer<typeof ScanSummarySchema>;

export const ScanResultSchema = z.object({
  scanId: z.string().min(1),
  target: ScanTargetSchema,
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime(),
  finalUrl: z.string().url(),
  pageTitle: z.string(),
  summary: ScanSummarySchema,
  warnings: z.array(z.string()),
  observations: z.array(ObservationSchema),
  evidence: z.array(EvidenceSchema),
  findings: z.array(FindingSchema),
});
export type ScanResult = z.infer<typeof ScanResultSchema>;

export const ProjectNodeKindSchema = z.enum([
  "project",
  "module",
  "route",
  "service",
  "datastore",
  "integration",
  "dependency",
  "finding",
]);
export type ProjectNodeKind = z.infer<typeof ProjectNodeKindSchema>;

export const ProjectNodeSchema = z.object({
  id: z.string().min(1),
  kind: ProjectNodeKindSchema,
  label: z.string().min(1),
  status: z.enum(["healthy", "unknown", "warning", "critical"]),
  findingId: z.string().optional(),
});
export type ProjectNode = z.infer<typeof ProjectNodeSchema>;

export const ProjectEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  relation: z.string().min(1),
});
export type ProjectEdge = z.infer<typeof ProjectEdgeSchema>;

export const ProjectGraphSchema = z.object({
  projectLabel: z.string().min(1),
  nodes: z.array(ProjectNodeSchema),
  edges: z.array(ProjectEdgeSchema),
});
export type ProjectGraph = z.infer<typeof ProjectGraphSchema>;
