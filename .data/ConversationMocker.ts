import { faker } from '@faker-js/faker';
import { Conversation } from '../localStorage/types';

export class ConversationMocker {
  static createFakeConversation(): Conversation {
    return {
      conversationId: faker.string.uuid(),
      createdByUser: faker.string.uuid(),
      title: faker.word.words({ count: { min: 1, max: 3 } }),
      createdAtDate: faker.date.recent(),
      lastMessageId: faker.string.uuid(),
    };
  }

  static createMultipleConversations(count: number): Conversation[] {
    return Array.from({ length: count }, () => this.createFakeConversation());
  }
}
