import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  progress: integer('progress').notNull().default(0),
  completedSteps: text('completed_steps').array(),
  tokenConfig: jsonb('token_config'),
  tokenomics: jsonb('tokenomics'),
  contractAddress: text('contract_address'),
  auditStatus: text('audit_status'),
  securityScore: integer('security_score'),
  teamMembers: text('team_members').array(),
  launchDate: timestamp('launch_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  type: text('type').notNull(),
  message: text('message').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  address: text('address').notNull().unique(),
  isApproved: boolean('is_approved').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  name: text('name').notNull(),
  symbol: text('symbol').notNull(),
  initialSupply: text('initial_supply').notNull(),
  features: jsonb('features').notNull(),
  contractAddress: text('contract_address'),
  deployedAt: timestamp('deployed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});