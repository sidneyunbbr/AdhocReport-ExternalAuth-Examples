package com.adhocreport.externalauth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AuthController {

	private static final List<ExternalUser> USERS = List.of(
			new ExternalUser("ext-usr-001", "ext.manuela", "Manuela External", "manuela.external@test.local", "Ext@1234", true),
			new ExternalUser("ext-usr-002", "ext.ricardo", "Ricardo External", "ricardo.external@test.local", "Ext@1234", true)
	);

	@GetMapping("/health")
	public Map<String, String> health() {
		return Map.of("status", "ok", "source", "AdhocReport.ExternalAuth.JavaSpringExample");
	}

	@PostMapping("/api/external-auth/validate")
	public ResponseEntity<?> validate(@RequestBody ExternalAuthValidateRequest request) {
		var username = request.username() == null ? "" : request.username().trim();
		var externalUserId = request.externalUserId() == null ? "" : request.externalUserId().trim();
		var password = request.password() == null ? "" : request.password();

		if ((username.isEmpty() && externalUserId.isEmpty()) || password.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of(
					"isAuthenticated", false,
					"message", "invalid-request"
			));
		}

		ExternalUser user = null;
		for (var candidate : USERS) {
			if (!externalUserId.isEmpty()) {
				if (candidate.userId().equals(externalUserId)) {
					user = candidate;
					break;
				}
			} else if (candidate.username().equals(username)) {
				user = candidate;
				break;
			}
		}

		if (user == null || !user.isActive()) {
			return ResponseEntity.ok(Map.of(
					"isAuthenticated", false,
					"message", "invalid-credentials"
			));
		}

		if (!user.password().equals(password)) {
			return ResponseEntity.ok(Map.of(
					"isAuthenticated", false,
					"message", "invalid-credentials"
			));
		}

		if (user.email() == null || user.email().isBlank()) {
			return ResponseEntity.ok(Map.of(
					"isAuthenticated", false,
					"message", "invalid-user-email"
			));
		}

		return ResponseEntity.ok(Map.of(
				"isAuthenticated", true,
				"userContext", Map.of("userId", user.userId()),
				"fullName", user.fullName(),
				"email", user.email()
		));
	}
}
