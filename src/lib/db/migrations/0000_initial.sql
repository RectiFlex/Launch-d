CREATE TABLE IF NOT EXISTS "activities" (
  "id" serial PRIMARY KEY,
  "project_id" integer,
  "type" text NOT NULL,
  "message" text NOT NULL,
  "timestamp" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "type" text NOT NULL,
  "status" text NOT NULL,
  "progress" integer DEFAULT 0 NOT NULL,
  "completed_steps" text[],
  "token_config" jsonb,
  "tokenomics" jsonb,
  "contract_address" text,
  "audit_status" text,
  "security_score" integer,
  "team_members" text[],
  "launch_date" timestamp,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "tokens" (
  "id" serial PRIMARY KEY,
  "project_id" integer,
  "name" text NOT NULL,
  "symbol" text NOT NULL,
  "initial_supply" text NOT NULL,
  "features" jsonb NOT NULL,
  "contract_address" text,
  "deployed_at" timestamp,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "wallets" (
  "id" serial PRIMARY KEY,
  "address" text NOT NULL UNIQUE,
  "is_approved" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now()
);

ALTER TABLE "activities" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");
ALTER TABLE "tokens" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

CREATE INDEX idx_projects_name ON projects(name);
CREATE INDEX idx_wallets_address ON wallets(address);
CREATE INDEX idx_activities_project_id ON activities(project_id);
CREATE INDEX idx_tokens_project_id ON tokens(project_id);