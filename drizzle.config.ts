import '@/drizzle/envConfig';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  driver: "pglite",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
