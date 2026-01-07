import {
  pgTable,
  text,
  timestamp,
  decimal,
  integer,
  boolean,
  pgEnum,
  jsonb,
  index,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "freelancer",
  "client",
  "admin",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "open",
  "in_progress",
  "completed",
  "cancelled",
  "disputed",
]);

export const proposalStatusEnum = pgEnum("proposal_status", [
  "pending",
  "accepted",
  "rejected",
  "withdrawn",
]);

export const experienceLevelEnum = pgEnum("experience_level", [
  "entry",
  "intermediate",
  "expert",
]);

// Users table
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    role: userRoleEnum("role").notNull().default("client"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    emailVerified: boolean("email_verified").notNull().default(false),
    isActive: boolean("is_active").default(true),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  }),
);

// Accounts table
export const accounts = pgTable("account", {
  id: serial("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Sessions table
export const sessions = pgTable("session", {
  id: serial("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Verifications table
export const verifications = pgTable("verification", {
  id: serial("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// freelancer Profiles table
export const freelancerProfiles = pgTable(
  "freelancer_profiles",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    title: text("title"),
    bio: text("bio"),
    hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
    experienceLevel: experienceLevelEnum("experience_level"),
    location: text("location"),
    website: text("website"),
    github: text("github"),
    linkedin: text("linkedin"),
    portfolio: jsonb("portfolio"), // Array of {title, description, image, link}
    availability: text("availability"),
    isAvailable: boolean("is_available").default(true),
    completedProjects: integer("completed_projects").default(0),
    totalEarnings: decimal("total_earnings", {
      precision: 12,
      scale: 2,
    }).default("0"),
    rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
    totalReviews: integer("total_reviews").default(0),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    userIdIdx: index("freelancer_user_id_idx").on(table.userId),
  }),
);

// Skills & Categories tables
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const skills = pgTable(
  "skills",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    nameIdx: index("skill_name_idx").on(table.name),
  }),
);

// Junction table: Freelancers <-> Skills
export const freelancerSkills = pgTable(
  "freelancer_skills",
  {
    id: serial("id").primaryKey(),
    freelancerId: integer("freelancer_id")
      .notNull()
      .references(() => freelancerProfiles.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    freelancerSkillIdx: index("freelancer_skill_idx").on(
      table.freelancerId,
      table.skillId,
    ),
  }),
);

// Projects table
export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    clientId: integer("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    budgetMin: decimal("budget_min", { precision: 10, scale: 2 }),
    budgetMax: decimal("budget_max", { precision: 10, scale: 2 }),
    budgetType: text("budget_type"), // 'fixed', 'hourly'
    experienceLevel: experienceLevelEnum("experience_level"),
    estimatedDuration: text("estimated_duration"),
    status: projectStatusEnum("status").notNull().default("draft"),
    acceptedProposalId: integer("accepted_proposal_id"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    clientIdIdx: index("project_client_id_idx").on(table.clientId),
    statusIdx: index("project_status_idx").on(table.status),
  }),
);

// Junction table: Projects <-> Required Skills
export const projectSkills = pgTable("project_skills", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  skillId: integer("skill_id")
    .notNull()
    .references(() => skills.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Proposals table
export const proposals = pgTable(
  "proposals",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    freelancerId: integer("freelancer_id")
      .notNull()
      .references(() => freelancerProfiles.id, { onDelete: "cascade" }),
    coverLetter: text("cover_letter").notNull(),
    proposedBudget: decimal("proposed_budget", {
      precision: 10,
      scale: 2,
    }).notNull(),
    proposedDuration: text("proposed_duration"),
    status: proposalStatusEnum("status").notNull().default("pending"),
    attachments: jsonb("attachments"),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
    respondedAt: timestamp("responded_at"),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    projectIdIdx: index("proposal_project_id_idx").on(table.projectId),
    freelancerIdIdx: index("proposal_freelancer_id_idx").on(table.freelancerId),
  }),
);

// Contracts table
export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  proposalId: integer("proposal_id")
    .notNull()
    .references(() => proposals.id),
  clientId: integer("client_id")
    .notNull()
    .references(() => users.id),
  freelancerId: integer("freelancer_id")
    .notNull()
    .references(() => freelancerProfiles.id),
  terms: text("terms").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull(),
  freelancerAmount: decimal("freelancer_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Reviews table
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    reviewerId: integer("reviewer_id")
      .notNull()
      .references(() => users.id),
    revieweeId: integer("reviewee_id")
      .notNull()
      .references(() => users.id),
    rating: integer("rating").notNull(), // 1-5
    comment: text("comment"),
    isFreelancerReview: boolean("is_freelancer_review").notNull(),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    revieweeIdIdx: index("review_reviewee_id_idx").on(table.revieweeId),
  }),
);

// Saved items (Bookmarks)
export const savedFreelancers = pgTable("saved_freelancers", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  freelancerId: integer("freelancer_id")
    .notNull()
    .references(() => freelancerProfiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const savedProjects = pgTable("saved_projects", {
  id: serial("id").primaryKey(),
  freelancerId: integer("freelancer_id")
    .notNull()
    .references(() => freelancerProfiles.id, { onDelete: "cascade" }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  freelancerProfile: one(freelancerProfiles, {
    fields: [users.id],
    references: [freelancerProfiles.userId],
  }),
  projects: many(projects),
  reviewsGiven: many(reviews, { relationName: "reviewer" }),
  reviewsReceived: many(reviews, { relationName: "reviewee" }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const freelancerProfilesRelations = relations(
  freelancerProfiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [freelancerProfiles.userId],
      references: [users.id],
    }),
    skills: many(freelancerSkills),
    proposals: many(proposals),
    contracts: many(contracts),
  }),
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  skills: many(skills),
  projects: many(projects),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
  category: one(categories, {
    fields: [skills.categoryId],
    references: [categories.id],
  }),
  freelancerSkills: many(freelancerSkills),
  projectSkills: many(projectSkills),
}));

export const freelancerSkillsRelations = relations(
  freelancerSkills,
  ({ one }) => ({
    freelancer: one(freelancerProfiles, {
      fields: [freelancerSkills.freelancerId],
      references: [freelancerProfiles.id],
    }),
    skill: one(skills, {
      fields: [freelancerSkills.skillId],
      references: [skills.id],
    }),
  }),
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
  skills: many(projectSkills),
  proposals: many(proposals),
  contract: one(contracts),
  reviews: many(reviews),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));

export const proposalsRelations = relations(proposals, ({ one }) => ({
  project: one(projects, {
    fields: [proposals.projectId],
    references: [projects.id],
  }),
  freelancer: one(freelancerProfiles, {
    fields: [proposals.freelancerId],
    references: [freelancerProfiles.id],
  }),
}));

export const contractsRelations = relations(contracts, ({ one }) => ({
  project: one(projects, {
    fields: [contracts.projectId],
    references: [projects.id],
  }),
  proposal: one(proposals, {
    fields: [contracts.proposalId],
    references: [proposals.id],
  }),
  client: one(users, {
    fields: [contracts.clientId],
    references: [users.id],
  }),
  freelancer: one(freelancerProfiles, {
    fields: [contracts.freelancerId],
    references: [freelancerProfiles.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  project: one(projects, {
    fields: [reviews.projectId],
    references: [projects.id],
  }),
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
  }),
  reviewee: one(users, {
    fields: [reviews.revieweeId],
    references: [users.id],
  }),
}));

export const savedFreelancersRelations = relations(
  savedFreelancers,
  ({ one }) => ({
    client: one(users, {
      fields: [savedFreelancers.clientId],
      references: [users.id],
    }),
    freelancer: one(freelancerProfiles, {
      fields: [savedFreelancers.freelancerId],
      references: [freelancerProfiles.id],
    }),
  }),
);

export const savedProjectsRelations = relations(savedProjects, ({ one }) => ({
  freelancer: one(freelancerProfiles, {
    fields: [savedProjects.freelancerId],
    references: [freelancerProfiles.id],
  }),
  project: one(projects, {
    fields: [savedProjects.projectId],
    references: [projects.id],
  }),
}));
