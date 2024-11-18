CREATE TABLE IF NOT EXISTS "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"hotelName" text NOT NULL,
	"plan" text NOT NULL,
	"checkIn" timestamp NOT NULL,
	"checkOut" timestamp NOT NULL,
	"amountOfNights" integer NOT NULL,
	"amountOfGuests" numeric NOT NULL,
	"reservationDate" timestamp NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"pricesGrid" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "sessions" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isAdmin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_email_clients_idx" ON "clients" USING btree ("email");