# Product Spec — TalionQA v0

## Problem
Developers, freelancers, small teams and AI-assisted builders can ship software without clearly knowing what is broken, risky or structurally fragile.

Existing tools often expose separate scanner outputs. TalionQA should turn those signals into one understandable model of the project.

## Initial user
Primary: solo developers, vibe coders, freelancers and small software teams.

They should be able to paste:
- a public website URL; or
- a public GitHub repository.

## Core promise
**Understand what your project is made of, what is wrong, and where the problem lives.**

## Free value
The free scan should reveal real findings and evidence. It must not be a fake paywall that hides whether a problem exists.

Free answers:
- what was detected;
- where it happened;
- severity/confidence;
- evidence;
- affected project area.

Paid diagnosis later answers:
- likely cause;
- how to fix;
- code-aware guidance;
- validation steps.

Continuous Guard later answers:
- did something regress;
- when;
- after which change/deploy;
- what needs attention now.

## V0 scope
Website:
- reachability/HTTP failures;
- JavaScript console errors;
- failed network requests;
- internal broken links;
- basic mobile viewport issues;
- basic runtime/performance observations.

Repository:
- stack/framework fingerprint;
- dependency manifests;
- known dependency vulnerabilities via existing engines;
- secret/config findings via existing engines;
- project structure for Project DNA.

## Explicitly out of V0
- autonomous exploitation;
- account takeover testing;
- automatic purchases/forms with side effects;
- automatic code patches;
- GitHub/Vercel deploy hooks;
- billing;
- 24/7 monitoring;
- enterprise features.

## Product surface
The primary experience is **X-Ray**, a spatial graph of the project.

Users should explore problems in context rather than read a long generic audit report.

## Internal learning
TalionQA may learn from normalized, non-sensitive outcomes such as detector precision, false-positive feedback, resolved/regressed state and structural patterns. Private source code is not treated as training data by default.
