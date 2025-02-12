import { Config, defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './sqlite/schemas.ts',
  out: './migrations',
}) satisfies Config;
