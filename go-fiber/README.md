# Go Fiber Example (Didactic)

Canonical external auth endpoint implementation for `AdhocReport.ServerApp`.

## Stack
- Go 1.23+
- Fiber v2

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/go-fiber`
2. Restore dependencies:
   - `go mod tidy`
3. Run server:
   - `go run .`

## Endpoints
- `GET /health`
- `POST /api/external-auth/validate`

## Behavior
- Requires `password` and one identifier (`username` or `externalUserId`).
- Success returns canonical payload with `userContext.userId` and `email`.
- Denied returns `isAuthenticated=false`.

## Production note
This sample is intentionally simple (in-memory users, plain-text password check). Replace with secure identity integration.
