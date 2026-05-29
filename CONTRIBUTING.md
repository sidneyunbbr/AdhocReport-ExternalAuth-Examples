# Contributing

Thank you for helping improve `AdhocReport-ExternalAuth-Examples`.

This repository is focused on **didactic, production-aware** external authentication server samples compatible with `AdhocReport.ServerApp`.

## Contribution goals
- Keep the canonical contract consistent across all implementations.
- Make each example easy to run and understand.
- Clearly separate didactic shortcuts from production recommendations.

## Basic rules
1. Keep endpoint and semantics:
   - `POST /api/external-auth/validate`
   - success: `isAuthenticated=true` + `userContext.userId` + non-empty `email`
   - denied: `isAuthenticated=false`
2. Do not add unnecessary protocol variations.
3. Keep logs free of raw credentials.
4. Keep docs in sync with code.

## Adding a new language implementation
Create a new folder at repository root, for example:
- `java-spring/`
- `go-fiber/`
- `python-fastapi/`

Minimum expected files:
- runnable server code
- `README.md` with quick start
- request/response examples
- production hardening notes

Recommended extras:
- `/health` endpoint
- simple test script or sample requests

## README checklist per implementation
- Runtime/version requirements
- Install commands
- Run commands
- Endpoint URL
- Success example
- Denied example
- Common errors and troubleshooting
- Production deltas (what to replace before go-live)

## Pull request checklist
- [ ] Contract compatibility preserved
- [ ] Example runs locally
- [ ] README updated
- [ ] Troubleshooting/security impact documented
- [ ] No secrets committed

## Commit message suggestion
Use clear scope prefixes, for example:
- `docs: improve canonical contract explanation`
- `node: add health endpoint`
- `dotnet: add request validation sample`

## Reporting issues
When opening issues, include:
- language/implementation folder
- request payload used
- actual response
- expected response
- environment details (runtime, OS, local/prod-like)
