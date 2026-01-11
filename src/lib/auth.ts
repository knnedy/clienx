import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/server/database/index";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins/username";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [username(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
