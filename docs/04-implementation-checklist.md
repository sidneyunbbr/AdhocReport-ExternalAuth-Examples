# Implementation Checklist (Any Language)

## Endpoint and transport
- [ ] HTTPS endpoint exposed
- [ ] Route: `POST /api/external-auth/validate`
- [ ] JSON request parsing enabled

## Input validation
- [ ] `password` required
- [ ] at least one of `username` or `externalUserId`
- [ ] malformed request returns `400` with canonical denial payload

## Credential validation
- [ ] Lookup by `externalUserId` when present
- [ ] Fallback/alternative lookup by `username`
- [ ] Compare password against identity source

## Output mapping
- [ ] Denied credentials => `isAuthenticated=false`
- [ ] Successful auth => `isAuthenticated=true`
- [ ] Include `userContext.userId`
- [ ] Include non-empty `email`
- [ ] Include `fullName` when available

## Operational quality
- [ ] Health endpoint (`/health`)
- [ ] Request/decision logs without leaking passwords
- [ ] Timeout handling
- [ ] Structured error handling

## Security baseline
- [ ] Never log raw password
- [ ] Protect endpoint from public abuse
- [ ] Keep dependencies updated
- [ ] Use secrets manager in production
