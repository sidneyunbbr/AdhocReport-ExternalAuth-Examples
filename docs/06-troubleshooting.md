# Troubleshooting

## 1) ServerApp cannot reach external endpoint
### Symptoms
- Login denied on external attempts
- `ExternalAuthWebhookNetworkError` or timeout events

### Checks
1. Confirm endpoint URL and port.
2. Test direct call with curl/Postman.
3. Validate firewall/network access.
4. Ensure HTTPS certificate is accepted (or dev bypass is enabled only in local dev).

## 2) Endpoint returns 400 invalid-request
### Typical causes
- Missing `password`
- Missing both `username` and `externalUserId`

### Fix
Ensure request body contains:
- `password`
- one identifier (`username` or `externalUserId`)

## 3) Authentication succeeds externally but ServerApp still denies
### Typical causes
- Response missing `userContext.userId`
- Response missing/blank `email`

### Fix
Return canonical success payload with both fields populated.

## 4) Wrong credential mapping
### Symptoms
- User expected to authenticate but receives invalid credentials

### Checks
- Verify identifier lookup branch (username vs externalUserId)
- Verify password validation source
- Confirm user active status rules

## 5) Local dev certificate problems
### Symptoms
- TLS handshake/certificate validation failures

### Fixes
- Node sample: regenerate local self-signed certs
- .NET sample: run `dotnet dev-certs https --trust`
- Keep insecure bypass disabled outside development
