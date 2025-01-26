CREATE TABLE `contacts_table` (
	`user_id` text PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`avatar_url` text,
	`last_seen_date` integer NOT NULL,
	`signature` text NOT NULL,
	`user_status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages_table` (
	`message_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`text_content` text NOT NULL,
	`send_at_date` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`image_url` text,
	`is_viewed` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `contacts_table`(`user_id`) ON UPDATE no action ON DELETE no action
);
