ALTER TABLE "blog_posts" ADD COLUMN "tags" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "author_name" text DEFAULT 'Team Tetto94' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "noindex" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "faq_items" jsonb DEFAULT '[]'::jsonb NOT NULL;