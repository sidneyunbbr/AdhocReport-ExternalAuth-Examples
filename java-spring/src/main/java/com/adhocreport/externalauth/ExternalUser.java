package com.adhocreport.externalauth;

public record ExternalUser(
		String userId,
		String username,
		String fullName,
		String email,
		String password,
		boolean isActive
) {
}
