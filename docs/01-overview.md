# Overview

`AdhocReport.ServerApp` can delegate credential validation to an external HTTPS endpoint.

This repository contains **didactic servers** that implement the expected behavior in a canonical and practical way.

## Why this exists
- Help customers implement external auth quickly.
- Standardize response format.
- Provide language-specific examples.

## Key rules
1. Endpoint must be HTTPS.
2. Input can contain `username` or `externalUserId` plus `password`.
3. On success (`isAuthenticated=true`), response must include:
   - `userContext.userId`
   - `email` (required)
4. Missing/blank email on success should be treated as login denial by ServerApp.

## Integration model
- ServerApp sends credentials to external endpoint.
- External endpoint validates with customer identity source.
- Endpoint returns canonical JSON payload.
- ServerApp provisions/links user locally and signs in.
