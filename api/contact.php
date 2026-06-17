<?php
// POST /api/contact.php
// Body: { "name": "...", "email": "...", "subject": "...", "message": "..." }

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	fail(405, 'Method not allowed.');
}

$input = readJsonBody();

$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$subject = trim((string)($input['subject'] ?? ''));
$message = trim((string)($input['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
	fail(400, 'All fields are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	fail(400, 'Please enter a valid email address.');
}

$pdo = getDbConnection();

$stmt = $pdo->prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $email, $subject, $message]);

// Optional: also email yourself a notification. Hostinger shared hosting
// supports PHP's mail() function out of the box for mailboxes on your domain.
//
// mail(
//     'you@yourdomain.com',
//     'New contact form message: ' . $subject,
//     $message . "\n\nFrom: $name <$email>"
// );

echo json_encode(['success' => true]);
