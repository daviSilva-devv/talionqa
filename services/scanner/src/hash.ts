import { createHash } from "node:crypto";

export function stableHash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function stableId(prefix: string, value: string): string {
  return `${prefix}_${stableHash(value).slice(0, 20)}`;
}
