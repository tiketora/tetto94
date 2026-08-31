CREATE TABLE "roof_analyses" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"zona" text NOT NULL,
	"citta" text,
	"cap" text,
	"lat" double precision,
	"lng" double precision,
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
CREATE INDEX "idx_roof_analyses_citta" ON "roof_analyses" USING btree ("citta");--> statement-breakpoint
CREATE INDEX "idx_roof_analyses_created_at" ON "roof_analyses" USING btree ("created_at");