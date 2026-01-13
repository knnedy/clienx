CREATE TYPE "public"."experience_level" AS ENUM('entry', 'intermediate', 'expert');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'open', 'in_progress', 'completed', 'cancelled', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."proposal_status" AS ENUM('pending', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('freelancer', 'client', 'admin');--> statement-breakpoint
CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"icon" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"proposal_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"freelancer_id" integer NOT NULL,
	"terms" text NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"platform_fee" numeric(10, 2) NOT NULL,
	"freelancer_amount" numeric(10, 2) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "freelancer_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text,
	"bio" text,
	"hourly_rate" numeric(10, 2),
	"experience_level" "experience_level",
	"location" text,
	"website" text,
	"github" text,
	"linkedin" text,
	"portfolio" jsonb,
	"availability" text,
	"is_available" boolean DEFAULT true,
	"completed_projects" integer DEFAULT 0,
	"total_earnings" numeric(12, 2) DEFAULT '0',
	"rating" numeric(3, 2) DEFAULT '0',
	"total_reviews" integer DEFAULT 0,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "freelancer_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "freelancer_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"freelancer_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category_id" integer,
	"budget_min" numeric(10, 2),
	"budget_max" numeric(10, 2),
	"budget_type" text,
	"experience_level" "experience_level",
	"estimated_duration" text,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"accepted_proposal_id" integer,
	"start_date" timestamp,
	"end_date" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"freelancer_id" integer NOT NULL,
	"cover_letter" text NOT NULL,
	"proposed_budget" numeric(10, 2) NOT NULL,
	"proposed_duration" text,
	"status" "proposal_status" DEFAULT 'pending' NOT NULL,
	"attachments" jsonb,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"reviewer_id" integer NOT NULL,
	"reviewee_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"is_freelancer_review" boolean NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_freelancers" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"freelancer_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"freelancer_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_id" integer,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "skills_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" "user_role" DEFAULT 'client' NOT NULL,
	"name" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true,
	"image" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_freelancer_id_freelancer_profiles_id_fk" FOREIGN KEY ("freelancer_id") REFERENCES "public"."freelancer_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_profiles" ADD CONSTRAINT "freelancer_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_skills" ADD CONSTRAINT "freelancer_skills_freelancer_id_freelancer_profiles_id_fk" FOREIGN KEY ("freelancer_id") REFERENCES "public"."freelancer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "freelancer_skills" ADD CONSTRAINT "freelancer_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_freelancer_id_freelancer_profiles_id_fk" FOREIGN KEY ("freelancer_id") REFERENCES "public"."freelancer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_users_id_fk" FOREIGN KEY ("reviewee_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_freelancers" ADD CONSTRAINT "saved_freelancers_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_freelancers" ADD CONSTRAINT "saved_freelancers_freelancer_id_freelancer_profiles_id_fk" FOREIGN KEY ("freelancer_id") REFERENCES "public"."freelancer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_projects" ADD CONSTRAINT "saved_projects_freelancer_id_freelancer_profiles_id_fk" FOREIGN KEY ("freelancer_id") REFERENCES "public"."freelancer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_projects" ADD CONSTRAINT "saved_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "freelancer_user_id_idx" ON "freelancer_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "freelancer_skill_idx" ON "freelancer_skills" USING btree ("freelancer_id","skill_id");--> statement-breakpoint
CREATE INDEX "project_client_id_idx" ON "projects" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "project_status_idx" ON "projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "proposal_project_id_idx" ON "proposals" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "proposal_freelancer_id_idx" ON "proposals" USING btree ("freelancer_id");--> statement-breakpoint
CREATE INDEX "review_reviewee_id_idx" ON "reviews" USING btree ("reviewee_id");--> statement-breakpoint
CREATE INDEX "skill_name_idx" ON "skills" USING btree ("name");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");