import { Config, defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './database/schemas.ts',
  out: './migrations',
}) satisfies Config;
