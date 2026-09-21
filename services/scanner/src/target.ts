import { lookup } from "node:dns/promises";
import ipaddr from "ipaddr.js";

export class TargetValidationError extends Error {
  override name = "TargetValidationError";
}

function isObviouslyLocalHostname(hostname: string): boolean {
  const value = hostname.toLowerCase().replace(/\.$/, "");

  return (
    value === "localhost" ||
    value.endsWith(".localhost") ||
    value.endsWith(".local") ||
    value.endsWith(".internal")
  );
}

export function isPublicIp(address: string): boolean {
  try {
    let parsed = ipaddr.parse(address);

    if (parsed.kind() === "ipv6") {
      const ipv6 = parsed as ipaddr.IPv6;

      if (ipv6.isIPv4MappedAddress()) {
        parsed = ipv6.toIPv4Address();
      }
    }

    return parsed.range() === "unicast";
  } catch {
    return false;
  }
}

async function assertPublicHostname(hostname: string): Promise<void> {
  if (isObviouslyLocalHostname(hostname)) {
    throw new TargetValidationError("Local or internal hostnames are not allowed.");
  }

  if (ipaddr.isValid(hostname)) {
    if (!isPublicIp(hostname)) {
      throw new TargetValidationError("Private, loopback, link-local or reserved IPs are not allowed.");
    }

    return;
  }

  const addresses = await lookup(hostname, { all: true, verbatim: true });

  if (addresses.length === 0) {
    throw new TargetValidationError("Target hostname did not resolve.");
  }

  if (addresses.some(({ address }) => !isPublicIp(address))) {
    throw new TargetValidationError(
      "Target resolves to a private, loopback, link-local or reserved address.",
    );
  }
}

export async function normalizePublicHttpUrl(input: string): Promise<string> {
  let url: URL;

  try {
    url = new URL(input.trim());
  } catch {
    throw new TargetValidationError("Enter a valid absolute URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new TargetValidationError("Only HTTP and HTTPS targets are supported.");
  }

  if (url.username || url.password) {
    throw new TargetValidationError("URLs containing embedded credentials are not allowed.");
  }

  await assertPublicHostname(url.hostname);

  url.hash = "";

  return url.toString();
}

export class PublicRequestGuard {
  private readonly decisionCache = new Map<string, boolean>();

  async canRequest(rawUrl: string): Promise<boolean> {
    let url: URL;

    try {
      url = new URL(rawUrl);
    } catch {
      return false;
    }

    if (["data:", "blob:", "about:"].includes(url.protocol)) {
      return true;
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const key = `${url.protocol}//${url.host}`;
    const cached = this.decisionCache.get(key);

    if (cached !== undefined) {
      return cached;
    }

    try {
      await normalizePublicHttpUrl(key);
      this.decisionCache.set(key, true);
      return true;
    } catch {
      this.decisionCache.set(key, false);
      return false;
    }
  }
}
