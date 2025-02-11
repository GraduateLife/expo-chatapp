import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { env } from '~/env';
import { feed } from './feed';
import { useDrizzleMigration, useDrizzleUI } from './util';

export const AppSQLiteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useDrizzleUI();
  const { success, error } = useDrizzleMigration();
  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
    if (success) {
      try {
        feed();
      } catch (error) {
        console.warn(error);
      }
    }
  }, [success]);
  return (
    <SQLiteProvider databaseName={env.EXPO_PUBLIC_LOCAL_DB_NAME}>
      {children}
    </SQLiteProvider>
  );
};
