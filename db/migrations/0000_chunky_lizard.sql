CREATE TYPE "public"."role" AS ENUM('ADMIN', 'CASHIER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"username" text,
	"password" text,
	"role" "role"
);
