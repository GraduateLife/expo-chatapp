import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';
import { env } from '~/env';
import migrations from '~/migrations/migrations';
// const db = await SQLite.openDatabaseAsync('app.db');

//for most cases
export const getDbAsync = async () => {
  const expoDb = await SQLite.openDatabaseAsync(env.EXPO_PUBLIC_LOCAL_DB_NAME);
  console.log('db path', expoDb.databasePath);
  return drizzle(expoDb);
};

//for hooks
export const getDbSync = () => {
  const expoDb = SQLite.openDatabaseSync(env.EXPO_PUBLIC_LOCAL_DB_NAME);
  console.log('db path', expoDb.databasePath);
  return drizzle(expoDb);
};

export const useDrizzleMigration = () => {
  const db = getDbSync();
  const { success, error } = useMigrations(db, migrations);
  return { success, error };
};

export const useDrizzleUI = () => {
  if (process.env.NODE_ENV === 'development') {
    const db = SQLite.openDatabaseSync(env.EXPO_PUBLIC_LOCAL_DB_NAME);
    console.log(
      'Drizzle UI is open in http://192.168.1.11:8081/_expo/plugins/expo-drizzle-studio-plugin'
    );
    return useDrizzleStudio(db);
  }
  console.warn('Drizzle UI is not available in production');
};
