import { faker } from '@faker-js/faker';
import { Conversation } from '~/sqlite/schemas';

export class ConversationMocker {
  static createFakeConversation(createdByUser?: string): Conversation {
    return {
      conversationId: faker.string.uuid(),
      createdByUser: createdByUser ?? faker.string.uuid(),
      title: faker.word.words({ count: { min: 1, max: 3 } }),
      createdAtDate: faker.date.recent(),
      lastMessageId: faker.string.uuid(),
    };
  }

  static createMultipleConversations(
    count: number,
    createdByUser?: string
  ): Conversation[] {
    return Array.from({ length: count }, () =>
      ConversationMocker.createFakeConversation(createdByUser)
    );
  }
}
