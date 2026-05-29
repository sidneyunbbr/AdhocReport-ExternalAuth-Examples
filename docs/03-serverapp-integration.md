# ServerApp Integration Tutorial

## 1) Configure ExternalAuth in ServerApp
In `appsettings.Development.json` (or target environment):

```json
"ExternalAuth": {
  "Enabled": true,
  "EndpointUrl": "https://localhost:5199/api/external-auth/validate",
  "TimeoutSeconds": 10,
  "IgnoreTlsErrorsForDevelopment": true
}
```

## 2) Start your external auth server
Run one implementation from this repository (Node sample included).

## 3) Test expected scenarios
1. Valid user/password -> login success
2. Wrong password -> login denied
3. Unknown user -> login denied
4. Missing email in success payload -> login denied
5. Endpoint down/timeout -> login denied and logs

## 4) Observe ServerApp logs
Look for:
- `LoginExternalAttempt`
- `LoginSucceededExternal`
- `LoginDenied`
- `ExternalAuthWebhook*`

## 5) Production notes
- Always use trusted TLS certificates.
- Keep endpoint private/restricted.
- Add monitoring/alerts.
- Use stable user ids in `userContext.userId`.
