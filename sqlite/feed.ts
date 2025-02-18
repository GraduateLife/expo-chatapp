import anotherMessagesData from '../.data/seed/another_conversation_content.json';
import botsData from '../.data/seed/bots.json';
import conversationParticipantsData from '../.data/seed/conversation_participants.json';
import conversationData from '../.data/seed/conversations.json';
import messagesData from '../.data/seed/one_conversation_content.json';
import usersData from '../.data/seed/users.json';
import {
  botsTable,
  conversationParticipantsTable,
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
  await dropAllTables();
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
    await db.insert(conversationParticipantsTable).values(
      conversationParticipantsData.map((data) => ({
        ...data,
        joinedAtDate: new Date(data.joinedAtDate),
        leftAtDate: data.leftAtDate ? new Date(data.leftAtDate) : null,
      }))
    );

    console.log('Database seeded successfully');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        console.log('ignore unique constraint failed:', error.message);
      }
    } else {
      console.error('Error seeding database:', error);
    }
  }
};

export const dropAllTables = async () => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Dropping tables is only allowed in development environment');
    return;
  }

  const db = await getDbAsync();
  try {
    console.log('Starting to drop all tables...');
    await db.delete(messagesTable);
    await db.delete(conversationsTable);
    await db.delete(usersTable);
    await db.delete(botsTable);
    console.log('All tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
};

// ... existing code ...
