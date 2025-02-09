import { faker } from '@faker-js/faker';
import { MyUserId } from '~/Tempfile';
import { Message } from '../localStorage/types';

export class MessageMocker {
  static createFakeMessage(
    withUserId?: string,
    conversationId?: string,
    messageId?: string
  ): Message {
    const targetUserId = withUserId ?? faker.string.uuid();
    return {
      messageId: messageId ?? faker.string.uuid(),
      userId: Math.random() > 0.5 ? targetUserId : MyUserId,
      conversationId: conversationId ?? faker.string.uuid(),
      textContent: faker.lorem.paragraph(),
      isViewed: false,
      sendAtDate: faker.date.recent(),
      imageUrl: Math.random() > 0.7 ? faker.image.url() : undefined, // 30% chance to have an image
    };
  }

  static createMultipleMessages(
    count: number,
    withUserId?: string,
    conversationId?: string
  ): Message[] {
    // Reset lastMessageDate if startDate is provided

    return Array.from({ length: count }, () =>
      MessageMocker.createFakeMessage(withUserId, conversationId)
    );
  }

  // Reset the lastMessageDate (useful when starting a new conversation)
}
