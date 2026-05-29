# Security Hardening Guide

## Baseline principles
1. Use HTTPS only.
2. Never log raw credentials.
3. Keep response payload minimal and deterministic.
4. Monitor auth-deny patterns and endpoint failures.

## Authentication endpoint controls
- Restrict source IPs where possible.
- Add rate limiting and anti-bruteforce controls.
- Apply request size limits.
- Validate JSON schema defensively.

## Identity and password handling
- Replace plain-text checks with secure hash verification.
- Store secrets in secure vault/config providers.
- Rotate keys/secrets regularly.
- Implement account lockout policy in the customer identity source.

## Operational hardening
- Structured logs with correlation fields (internal only if needed).
- Health and readiness endpoints.
- Alerting for timeouts/5xx spikes.
- Timeout and retry policy tuned to avoid cascade failures.

## Production checklist
- [ ] TLS certificate from trusted CA
- [ ] Secure password hashing
- [ ] Least-privilege infrastructure access
- [ ] Monitoring + alerts configured
- [ ] Incident response contacts/process documented
