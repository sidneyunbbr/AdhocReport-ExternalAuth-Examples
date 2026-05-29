package com.adhocreport.externalauth;

public record ExternalAuthValidateRequest(String username, String externalUserId, String password) {
}
