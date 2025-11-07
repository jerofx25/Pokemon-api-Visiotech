import { defineConfig, env } from "prisma/config";
import dotnev from "dotenv";

dotnev.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.POSTGRES_URL!,
  },
});
