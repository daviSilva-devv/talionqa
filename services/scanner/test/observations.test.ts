import { describe, expect, it } from "vitest";
import { normalizeObservations } from "../src/normalize";
import { ObservationCollector } from "../src/observations";

describe("observation normalization", () => {
  it("deduplicates repeated signals and keeps occurrence count", () => {
    const collector = new ObservationCollector("scan_test");

    collector.add({
      kind: "console_error",
      target: "https://example.com/?a=1",
      message: "ReferenceError: demo is not defined",
      observedAt: "2026-09-21T12:00:00.000Z",
    });

    collector.add({
      kind: "console_error",
      target: "https://example.com/?a=2",
      message: "ReferenceError:   demo is not defined",
      observedAt: "2026-09-21T12:00:01.000Z",
    });

    const observations = collector.values();
    const result = normalizeObservations(observations);

    expect(observations).toHaveLength(1);
    expect(observations[0]?.occurrences).toBe(2);
    expect(result.findings).toHaveLength(1);
    expect(result.evidence).toHaveLength(1);
  });

  it("does not turn scanner safety blocks into user findings", () => {
    const collector = new ObservationCollector("scan_test");

    collector.add({
      kind: "blocked_request",
      target: "http://127.0.0.1/admin",
      message: "TalionQA blocked a request outside the safe public-network boundary.",
    });

    const result = normalizeObservations(collector.values());

    expect(result.findings).toHaveLength(0);
    expect(result.evidence).toHaveLength(0);
  });
});
