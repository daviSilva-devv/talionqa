import type { Observation, ObservationKind } from "@talion/contracts";
import { stableHash, stableId } from "./hash";

export type ObservationInput = {
  kind: ObservationKind;
  target: string;
  message: string;
  details?: Record<string, unknown>;
  observedAt?: string;
};

function canonicalTarget(target: string): string {
  try {
    const url = new URL(target);
    url.hash = "";
    url.search = "";
    return url.toString();
  } catch {
    return target;
  }
}

function normalizedMessage(message: string): string {
  return message.trim().replace(/\s+/g, " ");
}

export function observationFingerprint(input: ObservationInput): string {
  return stableHash(
    [input.kind, canonicalTarget(input.target), normalizedMessage(input.message)].join("|"),
  );
}

export class ObservationCollector {
  private readonly observations = new Map<string, Observation>();

  constructor(private readonly scanId: string) {}

  add(input: ObservationInput): void {
    const observedAt = input.observedAt ?? new Date().toISOString();
    const fingerprint = observationFingerprint(input);
    const existing = this.observations.get(fingerprint);

    if (existing) {
      this.observations.set(fingerprint, {
        ...existing,
        occurrences: existing.occurrences + 1,
        lastObservedAt: observedAt,
      });
      return;
    }

    this.observations.set(fingerprint, {
      id: stableId("obs", `${this.scanId}|${fingerprint}`),
      scanId: this.scanId,
      engine: "talion-playwright",
      kind: input.kind,
      target: input.target,
      message: normalizedMessage(input.message),
      fingerprint,
      occurrences: 1,
      firstObservedAt: observedAt,
      lastObservedAt: observedAt,
      details: input.details ?? {},
    });
  }

  values(): Observation[] {
    return [...this.observations.values()];
  }
}
