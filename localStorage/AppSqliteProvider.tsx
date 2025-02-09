import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import conversationData from '~/.data/seed/conversation.json';
import messagesData from '~/.data/seed/msg_cov919d.json';
import { env } from '~/env';
import { conversationsTable, messagesTable } from './schemas';
import { getDbAsync, useDrizzleMigration, useDrizzleUI } from './util';

const feed = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.log('feed data');
  const db = await getDbAsync();
  await db.insert(conversationsTable).values(conversationData);

  // Seed messages
  messagesData.forEach(async (data) => {
    await db.insert(messagesTable).values({
      ...data,
      sendAtDate: new Date(data.sendAtDate),
    });
  });

  console.log('Database seeded successfully');
};

export const AppSQLiteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useDrizzleUI();
  const { success, error } = useDrizzleMigration();
  useEffect(() => {
    if (success) {
      feed();
    }
  }, []);
  return (
    <>
      <SQLiteProvider databaseName={env.EXPO_PUBLIC_LOCAL_DB_NAME}>
        {children}
      </SQLiteProvider>
    </>
  );
};
