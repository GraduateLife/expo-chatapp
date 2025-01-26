import * as SQLite from 'expo-sqlite';

export const seedDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('app.db');
  console.log('db', db.databasePath);
  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
  await db.execAsync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
  INSERT INTO test (value, intValue) VALUES ('test1', 123);
  INSERT INTO test (value, intValue) VALUES ('test2', 456);
  INSERT INTO test (value, intValue) VALUES ('test3', 789);
  `);
};

export const clearDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('app.db');
    // Drop all data from the test table but keep the table structure
    await db.execAsync(`
      DELETE FROM test;
      VACUUM; -- This will reclaim the free space
    `);
    console.log('Database data cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};
