# Canonical Contract

## Endpoint
`POST /api/external-auth/validate`

## Request JSON
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

### Request fields
- `password` (required)
- `username` (optional when `externalUserId` is present)
- `externalUserId` (optional when `username` is present)

At least one of `username` or `externalUserId` must be provided.

## Success response (required shape)
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

### Success rules
- `isAuthenticated` must be `true`.
- `userContext.userId` must be non-empty.
- `email` must be non-empty.

## Denied response
```json
{
  "isAuthenticated": false,
  "message": "invalid-credentials"
}
```

## Invalid request response
```json
{
  "isAuthenticated": false,
  "message": "invalid-request"
}
```

Recommended HTTP status:
- 200 for valid processed auth decision (allow/deny)
- 400 for malformed input
- 5xx for server-side internal failures
