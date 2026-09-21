# Talion Security Boundary Skill

Use whenever a task touches target intake, scanning, secrets, auth or active testing.

## Read first
`docs/SECURITY.md`

## Default posture
Unverified third-party targets receive passive/safe checks only.

## Never do by default
- credential attacks;
- bypass/exploitation attempts;
- destructive requests;
- purchases;
- data mutation/deletion;
- messaging/form actions with side effects.

## Engineering requirements
- plan for SSRF resistance in URL intake;
- enforce protocol/redirect/size/time limits;
- sandbox scanner processes;
- minimize sensitive evidence;
- redact secret values from user-facing output/logging where possible;
- distinguish "potential issue" from verified impact.

Active security workflows require verified ownership/authorization and explicit scope.
