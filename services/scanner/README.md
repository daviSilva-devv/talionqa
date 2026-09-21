# services/scanner

Bounded local/worker scanner orchestration for TalionQA.

## Current V0

The first executable path accepts one public HTTP(S) target and:

- rejects unsupported protocols, localhost and non-public IP ranges;
- launches headless Chromium;
- caps scan time and request count;
- blocks requests that leave the public-network boundary;
- collects browser console errors;
- collects failed requests and HTTP 4xx/5xx responses;
- deduplicates repeated observations;
- turns deterministic observations into Evidence + normalized Findings;
- outputs validated JSON.

## Run

From repository root:

```bash
pnpm install
pnpm --filter @talion/scanner exec playwright install chromium
pnpm scan -- https://example.com
```

## Important security note

This is a **development V0**, not a production-grade remote browser sandbox. URL/DNS guards are already present, but production public scanning will require stronger process/network isolation and SSRF hardening.

Scanner output is evidence. It must not be exaggerated into exploitability claims without proof.
