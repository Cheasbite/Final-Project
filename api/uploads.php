<?php
// /api/uploads.php
//
// GET    -> list the most recent uploads (public)
// POST   -> upload a new file (multipart/form-data: title, file). Requires login.
// DELETE -> ?id=123, deletes an upload (only the owner can delete it). Requires login.

require_once __DIR__ . '/bootstrap.php';

$uploadDir = __DIR__ . '/../uploads/';
$allowedTypes = [
	'application/pdf' => 'pdf',
	'text/plain' => 'txt',
];
$maxSize = 20 * 1024 * 1024; // 20MB

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
	$pdo = getDbConnection();
	$stmt = $pdo->query('SELECT id, title, filename, user_id, uploaded_at FROM uploads ORDER BY uploaded_at DESC LIMIT 50');
	echo json_encode($stmt->fetchAll());
	exit;
}

if ($method === 'POST') {
	if (empty($_SESSION['user_id'])) {
		fail(401, 'You must be logged in to upload files.');
	}

	$title = trim((string)($_POST['title'] ?? ''));

	if ($title === '' || empty($_FILES['file'])) {
		fail(400, 'A title and a file are required.');
	}

	$file = $_FILES['file'];

	if ($file['error'] !== UPLOAD_ERR_OK) {
		fail(400, 'File upload failed.');
	}

	if ($file['size'] > $maxSize) {
		fail(400, 'File is too large (max 20MB).');
	}

	$finfo = finfo_open(FILEINFO_MIME_TYPE);
	$mime = finfo_file($finfo, $file['tmp_name']);
	finfo_close($finfo);

	if (!isset($allowedTypes[$mime])) {
		fail(400, 'Only PDF and plain text files are allowed.');
	}

	$ext = $allowedTypes[$mime];
	$filename = bin2hex(random_bytes(16)) . '.' . $ext;

	if (!is_dir($uploadDir)) {
		mkdir($uploadDir, 0755, true);
	}

	if (!move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
		fail(500, 'Could not save the uploaded file.');
	}

	$pdo = getDbConnection();
	$stmt = $pdo->prepare('INSERT INTO uploads (title, filename, user_id) VALUES (?, ?, ?)');
	$stmt->execute([$title, $filename, $_SESSION['user_id']]);

	echo json_encode([
		'success' => true,
		'id' => (int)$pdo->lastInsertId(),
		'filename' => $filename,
	]);
	exit;
}

if ($method === 'DELETE') {
	if (empty($_SESSION['user_id'])) {
		fail(401, 'You must be logged in.');
	}

	$id = (int)($_GET['id'] ?? 0);

	if ($id <= 0) {
		fail(400, 'Missing or invalid id.');
	}

	$pdo = getDbConnection();
	$stmt = $pdo->prepare('SELECT filename, user_id FROM uploads WHERE id = ?');
	$stmt->execute([$id]);
	$upload = $stmt->fetch();

	if (!$upload) {
		fail(404, 'Upload not found.');
	}

	if ((int)$upload['user_id'] !== (int)$_SESSION['user_id']) {
		fail(403, 'You can only delete your own uploads.');
	}

	$path = $uploadDir . $upload['filename'];
	if (is_file($path)) {
		unlink($path);
	}

	$stmt = $pdo->prepare('DELETE FROM uploads WHERE id = ?');
	$stmt->execute([$id]);

	echo json_encode(['success' => true]);
	exit;
}

fail(405, 'Method not allowed.');
