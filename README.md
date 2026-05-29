# AdhocReport External Auth Examples

Reference implementations and documentation for building external authentication servers compatible with `AdhocReport.ServerApp`.

## Why this repository exists

Customers integrating external authentication often ask for:

- a canonical request/response contract
- practical code in different technologies
- troubleshooting and production hardening guidance

This repository centralizes those artifacts in one place.

## What you will find

- `docs/` - protocol, integration guide, troubleshooting, and security notes
- `javascript-node/` - didactic Node.js server (HTTPS + in-memory users)
- `dotnet-aspnet/` - didactic ASP.NET server

## Canonical endpoint

- `POST /api/external-auth/validate`

### Request (one identifier + password)

```json
{
  "username": "john.doe",
  "password": "S3cret!"
}
```

or

```json
{
  "externalUserId": "ext-usr-001",
  "password": "S3cret!"
}
```

### Success response

```json
{
  "isAuthenticated": true,
  "userContext": {
	"userId": "ext-usr-001"
  },
  "fullName": "John Doe",
  "email": "john.doe@company.com"
}
```

`email` and `userContext.userId` are required on successful authentication.

## Quick navigation

1. Start here: `docs/01-overview.md`
2. Contract details: `docs/02-canonical-contract.md`
3. ServerApp integration: `docs/03-serverapp-integration.md`
4. Troubleshooting: `docs/06-troubleshooting.md`
5. Security hardening: `docs/07-security-hardening.md`

## Contribution model

Each new language sample should:

1. Keep the same endpoint and payload semantics.
2. Include a self-contained quick-start README.
3. Provide allow/deny request examples.
4. Explicitly document production deltas.

See `docs/05-roadmap-multi-language.md` for the expansion plan.
