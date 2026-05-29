# ASP.NET Example (Didactic)

This sample implements the canonical external auth endpoint used by `AdhocReport.ServerApp`.

## Stack
- .NET 10
- ASP.NET Core Minimal API
- HTTPS local dev certificate from `dotnet dev-certs`

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/dotnet-aspnet`
2. Run:
   - `dotnet run`
3. Endpoint:
   - `https://localhost:5199/api/external-auth/validate`

## What Program.cs does (step by step)
1. Loads an in-memory user list for demonstration.
2. Exposes `GET /health` for quick operational checks.
3. Exposes `POST /api/external-auth/validate` for credential validation.
4. Validates request shape (`password` + `username` or `externalUserId`).
5. Resolves user and evaluates active status + password.
6. Returns canonical success payload with required `userContext.userId` and `email`.

## Test with curl (PowerShell)
### Success by username
```powershell
curl -k -X POST https://localhost:5199/api/external-auth/validate -H "Content-Type: application/json" -d '{"username":"ext.manuela","password":"Ext@1234"}'
```

### Success by externalUserId
```powershell
curl -k -X POST https://localhost:5199/api/external-auth/validate -H "Content-Type: application/json" -d '{"externalUserId":"ext-usr-002","password":"Ext@1234"}'
```

### Denied credentials
```powershell
curl -k -X POST https://localhost:5199/api/external-auth/validate -H "Content-Type: application/json" -d '{"username":"ext.manuela","password":"wrong"}'
```

## Canonical behavior
- Request must provide `password` and at least one identifier (`username` or `externalUserId`).
- Success response includes:
  - `isAuthenticated=true`
  - `userContext.userId`
  - non-empty `email`
- Denied credentials return `isAuthenticated=false`.

## Production note
This sample uses in-memory users and plain-text password checks for didactic clarity.
Replace with:
- secure password hashing
- customer identity source integration
- production-grade logging and monitoring
