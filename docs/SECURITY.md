# Security & Scanning Boundaries

TalionQA is defensive project-analysis software.

## Unverified website
Allowed:
- ordinary page loads;
- public navigation;
- HTTP/TLS observations;
- console/network collection;
- non-destructive rendering/layout checks.

Not allowed:
- credential attacks;
- bypass attempts;
- destructive requests;
- purchasing;
- deleting/updating records;
- sending messages/forms with side effects;
- intrusive vulnerability exploitation.

## Public repository
Allowed:
- passive source/config/dependency analysis;
- known-vulnerability matching;
- secret-pattern detection;
- architecture discovery.

A detected secret should be handled as sensitive evidence and minimized in storage/display.

## Verified project
More active workflows may be configured later, but must still have explicit scope and safety limits.

## Scanner infrastructure
URL intake must eventually defend against SSRF:
- reject loopback/private/link-local ranges;
- revalidate DNS and redirects;
- enforce protocols;
- limit redirects, payload sizes and duration;
- sandbox worker processes.

## Principle
Security tools provide evidence. TalionQA correlation must not exaggerate scanner output into unsupported exploitability claims.
