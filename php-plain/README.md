# PHP Plain Example (Didactic)

Canonical external auth endpoint implementation for `AdhocReport.ServerApp` using plain PHP (no framework).

## Stack
- PHP 8.1+
- Built-in PHP server (`php -S`)

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/php-plain`
2. Run server:
   - `php -S 127.0.0.1:5199 index.php`

## Endpoints
- `GET /health`
- `POST /api/external-auth/validate`

## Behavior
- Requires `password` and one identifier (`username` or `externalUserId`).
- Success returns canonical payload with `userContext.userId` and `email`.
- Denied returns `isAuthenticated=false`.

## Test with curl (PowerShell)
```powershell
curl -X POST http://127.0.0.1:5199/api/external-auth/validate -H "Content-Type: application/json" -d '{"username":"ext.manuela","password":"Ext@1234"}'
```

## Production note
This sample is intentionally simple (in-memory users, plain-text password check). Replace with secure identity integration.
