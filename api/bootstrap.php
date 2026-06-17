<?php
// Shared bootstrap: starts the session, sets JSON response headers,
// and loads the DB connection helper. Every endpoint requires this first.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Make sure the session cookie works for fetch() requests made with
// credentials: 'include'.
session_set_cookie_params([
	'lifetime' => 0,
	'path' => '/',
	'secure' => !empty($_SERVER['HTTPS']),
	'httponly' => true,
	'samesite' => 'Lax',
]);
session_start();

require_once __DIR__ . '/db.php';

// Small helper to read a JSON request body as an associative array.
function readJsonBody(): array
{
	$raw = file_get_contents('php://input');
	$data = json_decode($raw, true);
	return is_array($data) ? $data : [];
}

// Small helper to send a JSON error response and stop execution.
function fail(int $status, string $message): void
{
	http_response_code($status);
	echo json_encode(['message' => $message]);
	exit;
}
