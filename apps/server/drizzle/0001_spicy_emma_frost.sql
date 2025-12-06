CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`pseudo` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
