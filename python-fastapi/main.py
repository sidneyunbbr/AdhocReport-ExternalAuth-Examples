from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="AdhocReport External Auth FastAPI Example")


class ExternalAuthValidateRequest(BaseModel):
	username: Optional[str] = None
	externalUserId: Optional[str] = None
	password: Optional[str] = None


USERS = [
	{
		"userId": "ext-usr-001",
		"username": "ext.manuela",
		"fullName": "Manuela External",
		"email": "manuela.external@test.local",
		"password": "Ext@1234",
		"isActive": True,
	},
	{
		"userId": "ext-usr-002",
		"username": "ext.ricardo",
		"fullName": "Ricardo External",
		"email": "ricardo.external@test.local",
		"password": "Ext@1234",
		"isActive": True,
	},
]


@app.get("/health")
def health():
	return {"status": "ok", "source": "AdhocReport.ExternalAuth.FastAPIExample"}


@app.post("/api/external-auth/validate")
def validate(request: ExternalAuthValidateRequest):
	username = (request.username or "").strip()
	external_user_id = (request.externalUserId or "").strip()
	password = request.password or ""

	if (not username and not external_user_id) or not password:
		return {"isAuthenticated": False, "message": "invalid-request"}

	user = None
	if external_user_id:
		user = next((x for x in USERS if x["userId"] == external_user_id), None)
	else:
		user = next((x for x in USERS if x["username"] == username), None)

	if user is None or not user["isActive"]:
		return {"isAuthenticated": False, "message": "invalid-credentials"}

	if user["password"] != password:
		return {"isAuthenticated": False, "message": "invalid-credentials"}

	if not user["email"]:
		return {"isAuthenticated": False, "message": "invalid-user-email"}

	return {
		"isAuthenticated": True,
		"userContext": {"userId": user["userId"]},
		"fullName": user["fullName"],
		"email": user["email"],
	}
