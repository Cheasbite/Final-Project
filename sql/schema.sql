-- Run this once in phpMyAdmin (or via SSH/mysql client) against the
-- database you created in hPanel -> Databases -> MySQL Databases.
--
-- This replaces the PocketBase collections: users, contacts, uploads.

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	role VARCHAR(50) NOT NULL DEFAULT 'user',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contacts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	subject VARCHAR(255) NOT NULL,
	message TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS uploads (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	filename VARCHAR(255) NOT NULL,
	user_id INT UNSIGNED NULL,
	uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_uploads_user
		FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: create yourself an admin account to view contact form
-- submissions. Replace the email and generate a password hash with:
--   php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"
--
-- INSERT INTO users (name, email, password_hash, role)
-- VALUES ('Admin', 'admin@yourdomain.com', '<paste hash here>', 'admin');
