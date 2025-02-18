import { useQuery } from '@tanstack/react-query';
import { desc, eq } from 'drizzle-orm';
import {
  Message,
  conversationParticipantsTable,
  conversationsTable,
  messagesTable,
  usersTable,
} from './schemas';
import { getDbAsync } from './util';
export const useFetchMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      return await ConversationUtil.getConversationContent(conversationId);
    },
  });
};

export const useFetchLastConversationId = (userId: string) => {
  return useQuery({
    queryKey: ['lastConversationId', userId],
    queryFn: async () => {
      return await ConversationUtil.getLastConversationId(userId);
    },
  });
};

// Database operations
export class ConversationUtil {
  static async getConversationContent(
    conversationId: string,
    limit?: number
  ): Promise<Message[]> {
    const db = await getDbAsync();
    const query = db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId))
      .orderBy(messagesTable.sequenceNumber);

    if (limit) {
      query.limit(limit);
    }

    const conversationContent = await query;
    return conversationContent;
  }

  static async getLastConversationId(userId: string): Promise<string | null> {
    const db = await getDbAsync();

    // First try to get from users table's lastConversationId
    const userResult = await db
      .select({ lastConversationId: usersTable.lastConversationId })
      .from(usersTable)
      .where(eq(usersTable.userId, userId))
      .limit(1);

    if (userResult[0]?.lastConversationId) {
      return userResult[0].lastConversationId;
    }

    // If not found, get the most recent conversation from participants table
    const result = await db
      .select({ conversationId: conversationParticipantsTable.conversationId })
      .from(conversationParticipantsTable)
      .where(eq(conversationParticipantsTable.userId, userId))
      .orderBy(desc(conversationParticipantsTable.joinedAtDate))
      .limit(1);

    return result[0]?.conversationId ?? null;
  }
  /**
   * @returns conversationId
   */
  static async createConversation(
    createdByUserId: string,
    participantIds: string[]
  ): Promise<string> {
    const db = await getDbAsync();
    const conversationId = crypto.randomUUID();

    await db.transaction(async (tx) => {
      // Create conversation
      await tx.insert(conversationsTable).values({
        conversationId,
        createdByUser: createdByUserId,
        isGroupChat: participantIds.length > 1,
      });

      // Add participants
      const participants = [createdByUserId, ...participantIds].map(
        (userId) => ({
          conversationId,
          userId,
        })
      );

      await tx.insert(conversationParticipantsTable).values(participants);
    });

    return conversationId;
  }

  static async appendMessageToConversation(
    conversationId: string,
    userId: string,
    content: string,
    imageUrl?: string
  ): Promise<Message> {
    const db = await getDbAsync();

    // Get the latest sequence number
    const lastMessage = await db
      .select({ seq: messagesTable.sequenceNumber })
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId))
      .orderBy(desc(messagesTable.sequenceNumber))
      .limit(1);

    const newSequenceNumber = (lastMessage[0]?.seq ?? 0) + 1;
    const messageId = crypto.randomUUID();

    const newMessage: Message = {
      messageId,
      userId,
      conversationId,
      sequenceNumber: newSequenceNumber,
      textContent: content,
      sendAtDate: new Date(),
      imageUrl: imageUrl ?? null,
      viewedAtDate: null,
    };

    await db.insert(messagesTable).values(newMessage);

    // Update conversation's last message ID
    await db
      .update(conversationsTable)
      .set({ lastMessageId: messageId })
      .where(eq(conversationsTable.conversationId, conversationId));

    return newMessage;
  }
}
