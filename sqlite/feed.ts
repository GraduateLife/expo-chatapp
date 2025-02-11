import anotherMessagesData from '../.data/seed/another_conversation_content.json';
import conversationData from '../.data/seed/conversations.json';
import messagesData from '../.data/seed/one_conversation_content.json';
import { conversationsTable, messagesTable } from './schemas';
import { getDbAsync } from './util';

export const feed = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  console.log('start feeding data');
  const db = await getDbAsync();
  try {
    await db.insert(conversationsTable).values(
      conversationData.map((data) => ({
        ...data,
        createdAtDate: new Date(data.createdAtDate),
      }))
    );
    // Seed messages
    for (const data of [...messagesData, ...anotherMessagesData]) {
      let sequenceNumber = 0;
      await db.insert(messagesTable).values({
        ...data,
        sendAtDate: new Date(data.sendAtDate),
        sequenceNumber: sequenceNumber,
      });
      sequenceNumber++;
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
