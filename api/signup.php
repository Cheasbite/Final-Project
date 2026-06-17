<?php
// POST /api/signup.php
// Body: { "name": "...", "email": "...", "password": "...", "passwordConfirm": "..." }

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	fail(405, 'Method not allowed.');
}

$input = readJsonBody();

$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$password = (string)($input['password'] ?? '');
$passwordConfirm = (string)($input['passwordConfirm'] ?? '');

if ($name === '' || $email === '' || $password === '') {
	fail(400, 'Name, email and password are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	fail(400, 'Please enter a valid email address.');
}

if ($password !== $passwordConfirm) {
	fail(400, 'Passwords do not match.');
}

if (strlen($password) < 8) {
	fail(400, 'Password must be at least 8 characters long.');
}

$pdo = getDbConnection();

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
	fail(409, 'An account with this email already exists.');
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $email, $hash, 'user']);

$userId = (int)$pdo->lastInsertId();

// Log the new user in immediately.
$_SESSION['user_id'] = $userId;

echo json_encode([
	'id' => $userId,
	'name' => $name,
	'email' => $email,
	'role' => 'user',
]);
