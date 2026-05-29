# JavaScript Node Example (Didactic)

This is a minimal and well-documented external auth server example for `AdhocReport.ServerApp`.

## What this example demonstrates
- Canonical endpoint: `POST /api/external-auth/validate`
- Input validation (`username` or `externalUserId` + `password`)
- Allow/deny response mapping
- Required success fields (`userContext.userId`, `email`)
- Local HTTPS with self-signed cert for development

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/javascript-node`
2. Install dependencies:
   - `npm install`
3. Run server:
   - `npm start`

Server URL:
- `https://localhost:5199`

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

## ServerApp config example
```json
"ExternalAuth": {
  "Enabled": true,
  "EndpointUrl": "https://localhost:5199/api/external-auth/validate",
  "TimeoutSeconds": 10,
  "IgnoreTlsErrorsForDevelopment": true
}
```

## Important production note
This example uses in-memory users and plain-text password comparison for didactic clarity.
In production, use:
- secure password hashing
- real identity store
- hardened endpoint security
