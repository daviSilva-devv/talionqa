import { describe, expect, it } from "vitest";
import { isPublicIp, normalizePublicHttpUrl, TargetValidationError } from "../src/target";

describe("target safety", () => {
  it("rejects non-http protocols", async () => {
    await expect(normalizePublicHttpUrl("file:///etc/passwd")).rejects.toBeInstanceOf(
      TargetValidationError,
    );
  });

  it("rejects localhost", async () => {
    await expect(normalizePublicHttpUrl("http://localhost:3000")).rejects.toBeInstanceOf(
      TargetValidationError,
    );
  });

  it("rejects private and loopback IPs", () => {
    expect(isPublicIp("127.0.0.1")).toBe(false);
    expect(isPublicIp("10.0.0.10")).toBe(false);
    expect(isPublicIp("192.168.1.10")).toBe(false);
    expect(isPublicIp("::1")).toBe(false);
  });

  it("accepts public unicast IPs", () => {
    expect(isPublicIp("1.1.1.1")).toBe(true);
    expect(isPublicIp("8.8.8.8")).toBe(true);
  });
});
