<?php
// POST /api/login.php
// Body: { "email": "...", "password": "..." }

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	fail(405, 'Method not allowed.');
}

$input = readJsonBody();

$email = trim((string)($input['email'] ?? ''));
$password = (string)($input['password'] ?? '');

if ($email === '' || $password === '') {
	fail(400, 'Email and password are required.');
}

$pdo = getDbConnection();

$stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
	fail(401, 'Invalid email or password.');
}

$_SESSION['user_id'] = (int)$user['id'];

echo json_encode([
	'id' => (int)$user['id'],
	'name' => $user['name'],
	'email' => $user['email'],
	'role' => $user['role'],
]);
