import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';
import { MyUserId } from '~/Tempfile';
import { conversationsTable, Message, messagesTable } from './schemas';
import { getDbAsync } from './util';
export const useFetchMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      return await ConversationUtil.getLastConversationContent(conversationId);
    },
  });
};

// Database operations
export class ConversationUtil {
  static async insertMessage() {
    const db = await getDbAsync();
    return await db.insert(conversationsTable).values({
      conversationId: crypto.randomUUID(),
      createdByUser: MyUserId,
      createdAtDate: new Date(),
      title: 'New Conversation',
    });
  }
  static async getLastConversationContent(
    conversationId: string
  ): Promise<Message[]> {
    const db = await getDbAsync();
    const conversationContent = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversationId, conversationId));
    return conversationContent;
  }

  static async getLastConversationIdWithContactId(contactId: string) {}
}
