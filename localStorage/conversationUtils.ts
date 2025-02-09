import { useMemo } from 'react';
import { MessageMocker } from '~/.data/MessageMocker';
import { MyUserId } from '~/Tempfile';
import { conversationsTable } from './schemas';
import { getDbAsync } from './util';

export const useMessages = () =>
  useMemo(() => MessageMocker.createMultipleMessages(10), []);

// Database operations
export class ConversationUtil {
  static async startConversation() {
    const db = await getDbAsync();
    await db.insert(conversationsTable).values({
      conversationId: crypto.randomUUID(),
      createdByUser: MyUserId,
      createdAt: new Date(),
      title: 'New Conversation',
    });
  }
  static async getLastConversationWithContact() {}
}
