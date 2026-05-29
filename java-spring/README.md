# Java Spring Example (Didactic)

Canonical external auth endpoint implementation for `AdhocReport.ServerApp`.

## Stack
- Java 21+
- Spring Boot 3
- Maven

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/java-spring`
2. Run:
   - `mvn spring-boot:run`

## Endpoints
- `GET /health`
- `POST /api/external-auth/validate`

Server URL (default):
- `http://localhost:5199`

## Behavior
- Requires `password` and one identifier (`username` or `externalUserId`).
- Success returns canonical payload with `userContext.userId` and `email`.
- Denied returns `isAuthenticated=false`.

## Production note
This sample is intentionally simple (in-memory users, plain-text password check). Replace with secure identity integration.
