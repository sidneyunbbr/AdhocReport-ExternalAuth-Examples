<?php

declare(strict_types=1);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

$users = [
	[
		'userId' => 'ext-usr-001',
		'username' => 'ext.manuela',
		'fullName' => 'Manuela External',
		'email' => 'manuela.external@test.local',
		'password' => 'Ext@1234',
		'isActive' => true,
	],
	[
		'userId' => 'ext-usr-002',
		'username' => 'ext.ricardo',
		'fullName' => 'Ricardo External',
		'email' => 'ricardo.external@test.local',
		'password' => 'Ext@1234',
		'isActive' => true,
	],
];

function send_json(int $status, array $payload): void
{
	http_response_code($status);
	header('Content-Type: application/json');
	echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

if ($method === 'GET' && $path === '/health') {
	send_json(200, [
		'status' => 'ok',
		'source' => 'AdhocReport.ExternalAuth.PhpPlainExample',
	]);
	return;
}

if ($method === 'POST' && $path === '/api/external-auth/validate') {
	$body = file_get_contents('php://input');
	$request = json_decode($body ?: '{}', true);

	if (!is_array($request)) {
		send_json(400, [
			'isAuthenticated' => false,
			'message' => 'invalid-request',
		]);
		return;
	}

	$username = trim((string)($request['username'] ?? ''));
	$externalUserId = trim((string)($request['externalUserId'] ?? ''));
	$password = (string)($request['password'] ?? '');

	if (($username === '' && $externalUserId === '') || $password === '') {
		send_json(400, [
			'isAuthenticated' => false,
			'message' => 'invalid-request',
		]);
		return;
	}

	$user = null;
	foreach ($users as $candidate) {
		if ($externalUserId !== '' && $candidate['userId'] === $externalUserId) {
			$user = $candidate;
			break;
		}

		if ($externalUserId === '' && $candidate['username'] === $username) {
			$user = $candidate;
			break;
		}
	}

	if ($user === null || $user['isActive'] !== true) {
		send_json(200, [
			'isAuthenticated' => false,
			'message' => 'invalid-credentials',
		]);
		return;
	}

	if ($user['password'] !== $password) {
		send_json(200, [
			'isAuthenticated' => false,
			'message' => 'invalid-credentials',
		]);
		return;
	}

	if (trim((string)$user['email']) === '') {
		send_json(200, [
			'isAuthenticated' => false,
			'message' => 'invalid-user-email',
		]);
		return;
	}

	send_json(200, [
		'isAuthenticated' => true,
		'userContext' => [
			'userId' => $user['userId'],
		],
		'fullName' => $user['fullName'],
		'email' => $user['email'],
	]);
	return;
}

send_json(404, [
	'message' => 'not-found',
]);
