CREATE TABLE "roof_index_leads" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"telefono" text NOT NULL,
	"citta" text,
	"zona" text NOT NULL,
	"superficie" integer NOT NULL,
	"fascia_eta" text NOT NULL,
	"problema" text NOT NULL,
	"durata" text NOT NULL,
	"materiale" text NOT NULL,
	"ultimo_intervento" text NOT NULL,
	"score" integer NOT NULL,
	"band" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_roof_index_leads_created_at" ON "roof_index_leads" USING btree ("created_at");