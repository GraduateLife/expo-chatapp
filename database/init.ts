import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

export const getDb = () => {
  const sqlite = SQLite.openDatabaseSync('app.db');
  return drizzle(sqlite);
};
