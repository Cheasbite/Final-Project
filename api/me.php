<?php
// GET /api/me.php
// Returns the currently logged-in user (based on the PHP session cookie),
// or 401 if nobody is logged in. Used to restore auth state on page load.

require_once __DIR__ . '/bootstrap.php';

if (empty($_SESSION['user_id'])) {
	fail(401, 'Not authenticated.');
}

$pdo = getDbConnection();
$stmt = $pdo->prepare('SELECT id, name, email, role FROM users WHERE id = ?');
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if (!$user) {
	// Session points at a user that no longer exists.
	$_SESSION = [];
	session_destroy();
	fail(401, 'Not authenticated.');
}

echo json_encode([
	'id' => (int)$user['id'],
	'name' => $user['name'],
	'email' => $user['email'],
	'role' => $user['role'],
]);
