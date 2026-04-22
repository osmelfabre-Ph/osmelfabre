CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(64) NOT NULL,
	`message` text NOT NULL,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`fileKey` text NOT NULL,
	`type` enum('gallery','hero') NOT NULL,
	`page` varchar(64),
	`subject` varchar(128),
	`category` enum('Uomo','Donna') DEFAULT 'Uomo',
	`sortOrder` int DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `photos_id` PRIMARY KEY(`id`)
);
