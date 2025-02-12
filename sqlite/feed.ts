import anotherMessagesData from '../.data/seed/another_conversation_content.json';
import botsData from '../.data/seed/bots.json';
import conversationData from '../.data/seed/conversations.json';
import messagesData from '../.data/seed/one_conversation_content.json';
import usersData from '../.data/seed/users.json';
import {
  botsTable,
  conversationsTable,
  messagesTable,
  usersTable,
} from './schemas';
import { getDbAsync } from './util';

export const feed = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.log('start feeding data');
  const db = await getDbAsync();
  try {
    // Seed conversations
    await db.insert(conversationsTable).values(
      conversationData.map((data) => ({
        ...data,
        createdAtDate: new Date(data.createdAtDate),
      }))
    );

    // Seed users
    await db.insert(usersTable).values(
      usersData.map((data) => ({
        ...data,
        createdAtDate: new Date(data.createdAtDate),
        lastActiveDate: new Date(data.lastActiveDate),
      }))
    );

    // Seed bots
    await db.insert(botsTable).values(
      botsData.map((data) => ({
        ...data,
        createdAtDate: new Date(data.createdAtDate),
      }))
    );
    // Seed messages
    for (const data of [...messagesData, ...anotherMessagesData]) {
      await db.insert(messagesTable).values({
        ...data,
        sendAtDate: new Date(data.sendAtDate),
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// ... existing code ...
