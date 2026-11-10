CREATE TABLE "contact_log" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"channel" text NOT NULL,
	"status" text DEFAULT 'nuovo' NOT NULL,
	"contacted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"citta" text,
	"provincia" text,
	"servizio" text,
	"contact_name" text,
	"contact_value" text,
	"notes" text,
	"show_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_contact_log_public" ON "contact_log" USING btree ("show_public","contacted_at");--> statement-breakpoint
CREATE INDEX "idx_contact_log_status" ON "contact_log" USING btree ("status");