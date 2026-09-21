import { describe, expect, it } from "vitest";
import { FindingSchema, ObservationSchema } from "../src";

describe("Talion contracts", () => {
  it("accepts a deterministic runtime observation", () => {
    const value = ObservationSchema.parse({
      id: "obs_abcd",
      scanId: "scan_1",
      engine: "talion-playwright",
      kind: "console_error",
      target: "https://example.com/",
      message: "ReferenceError: demo is not defined",
      fingerprint: "abcd",
      occurrences: 1,
      firstObservedAt: "2026-09-21T12:00:00.000Z",
      lastObservedAt: "2026-09-21T12:00:00.000Z",
      details: {},
    });

    expect(value.kind).toBe("console_error");
  });

  it("requires findings to reference evidence", () => {
    expect(() =>
      FindingSchema.parse({
        id: "finding_abcd",
        scanId: "scan_1",
        category: "runtime",
        title: "Runtime exception detected",
        severity: "medium",
        confidence: 0.98,
        status: "open",
        fingerprint: "abcd",
        affectedEntityIds: [],
        evidenceIds: [],
        firstSeen: "2026-09-21T12:00:00.000Z",
        lastSeen: "2026-09-21T12:00:00.000Z",
      }),
    ).toThrow();
  });
});
