# Python FastAPI Example (Didactic)

Canonical external auth endpoint implementation for `AdhocReport.ServerApp`.

## Stack
- Python 3.11+
- FastAPI
- Uvicorn

## Quick Start
1. Open terminal in this folder:
   - `external-auth-examples/python-fastapi`
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Run server:
   - `uvicorn main:app --host 127.0.0.1 --port 5199`

## Endpoints
- `GET /health`
- `POST /api/external-auth/validate`

## Behavior
- Requires `password` and one identifier (`username` or `externalUserId`).
- Success returns canonical payload with `userContext.userId` and `email`.
- Denied returns `isAuthenticated=false`.

## Production note
This sample is intentionally simple (in-memory users, plain-text password check). Replace with secure identity integration.
