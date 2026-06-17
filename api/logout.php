<?php
// POST /api/logout.php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	fail(405, 'Method not allowed.');
}

$_SESSION = [];
session_destroy();

echo json_encode(['success' => true]);
