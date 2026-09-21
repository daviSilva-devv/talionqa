import { randomUUID } from "node:crypto";
import { chromium, type Browser, type Page, type Request } from "playwright";
import { ScanResultSchema, type ScanResult } from "@talion/contracts";
import { normalizeObservations } from "./normalize";
import { ObservationCollector } from "./observations";
import { normalizePublicHttpUrl, PublicRequestGuard } from "./target";

export type ScanUrlOptions = {
  timeoutMs?: number;
  maxRequests?: number;
  browser?: Browser;
};

const DEFAULT_TIMEOUT_MS = Number(process.env.TALION_SCAN_TIMEOUT_MS ?? 15_000);
const DEFAULT_MAX_REQUESTS = Number(process.env.TALION_SCAN_MAX_REQUESTS ?? 80);

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function scanUrl(input: string, options: ScanUrlOptions = {}): Promise<ScanResult> {
  const scanId = `scan_${randomUUID()}`;
  const started = Date.now();
  const startedAt = new Date(started).toISOString();
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const normalizedUrl = await normalizePublicHttpUrl(input);
  const collector = new ObservationCollector(scanId);
  const guard = new PublicRequestGuard();
  const scannerBlockedRequests = new WeakSet<Request>();
  const warnings: string[] = [];
  let requestCount = 0;
  let requestLimitReported = false;
  let pageTitle = "";
  let finalUrl = normalizedUrl;

  const ownsBrowser = !options.browser;
  const browser = options.browser ?? (await chromium.launch({ headless: true }));

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: false,
    });

    try {
      const page: Page = await context.newPage();

      page.setDefaultTimeout(timeoutMs);

      await page.route("**/*", async (route) => {
        requestCount += 1;
        const request = route.request();

        if (requestCount > maxRequests) {
          scannerBlockedRequests.add(request);

          if (!requestLimitReported) {
            requestLimitReported = true;
            warnings.push(
              `Request limit reached (${maxRequests}). Remaining requests were blocked.`,
            );
          }

          await route.abort("blockedbyclient");
          return;
        }

        const requestUrl = request.url();
        const allowed = await guard.canRequest(requestUrl);

        if (!allowed) {
          scannerBlockedRequests.add(request);

          collector.add({
            kind: "blocked_request",
            target: requestUrl,
            message: "TalionQA blocked a request outside the safe public-network boundary.",
            details: { resourceType: request.resourceType() },
          });

          await route.abort("blockedbyclient");
          return;
        }

        await route.continue();
      });

      page.on("console", (message) => {
        if (message.type() !== "error") {
          return;
        }

        collector.add({
          kind: "console_error",
          target: page.url() || normalizedUrl,
          message: message.text() || "Unknown browser console error",
          details: {
            location: message.location(),
          },
        });
      });

      page.on("requestfailed", (request) => {
        if (scannerBlockedRequests.has(request)) {
          return;
        }

        collector.add({
          kind: "request_failed",
          target: request.url(),
          message: request.failure()?.errorText ?? "Network request failed",
          details: {
            method: request.method(),
            resourceType: request.resourceType(),
          },
        });
      });

      page.on("response", (response) => {
        if (response.status() < 400) {
          return;
        }

        collector.add({
          kind: "http_error",
          target: response.url(),
          message: `HTTP ${response.status()} ${response.statusText()}`.trim(),
          details: {
            status: response.status(),
            statusText: response.statusText(),
            requestMethod: response.request().method(),
          },
        });
      });

      try {
        await page.goto(normalizedUrl, {
          waitUntil: "domcontentloaded",
          timeout: timeoutMs,
        });

        await page
          .waitForLoadState("networkidle", { timeout: Math.min(3_000, timeoutMs) })
          .catch(() => undefined);
      } catch (error) {
        warnings.push(`Navigation did not fully settle: ${errorMessage(error)}`);
      }

      finalUrl = page.url() || normalizedUrl;
      pageTitle = await page.title().catch(() => "");
    } finally {
      await context.close();
    }
  } finally {
    if (ownsBrowser) {
      await browser.close();
    }
  }

  const observations = collector.values();
  const { evidence, findings } = normalizeObservations(observations);
  const finished = Date.now();

  return ScanResultSchema.parse({
    scanId,
    target: {
      kind: "website",
      input,
      normalizedUrl,
    },
    startedAt,
    finishedAt: new Date(finished).toISOString(),
    finalUrl,
    pageTitle,
    summary: {
      observationCount: observations.length,
      findingCount: findings.length,
      requestCount,
      durationMs: finished - started,
    },
    warnings,
    observations,
    evidence,
    findings,
  });
}
