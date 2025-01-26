import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { MessageMocker } from '~/.data/MessageMocker';
import { getDb } from '~/database/init';
import { messagesTable } from '~/database/schemas';
import { Message } from './types';

const db = getDb();
export const useMessages = () =>
  useMemo(() => MessageMocker.createMultipleMessages(10), []);

// Database operations
export const messageOperations = {
  create: async (newMessage: Message) => {
    return await db.insert(messagesTable).values({
      userId: newMessage.userId,
      messageId: newMessage.messageId,
      textContent: newMessage.textContent,
      sendAtDate: newMessage.sendAtDate,
      imageUrl: newMessage.imageUrl,
      isViewed: newMessage.isViewed,
    });
  },

  getByUserId: async (userId: string) => {
    const results = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.userId, userId));

    return results;
  },
};
