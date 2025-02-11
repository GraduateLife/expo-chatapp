import { faker } from '@faker-js/faker';
import { Message } from '~/sqlite/schemas';

export class MessageMocker {
  static createFakeMessage({
    withUserId = faker.string.uuid(),
    conversationId = faker.string.uuid(),
    messageId = faker.string.uuid(),
    myUserId = faker.string.uuid(),
    textContent = Math.random() > 0.5
      ? faker.lorem.paragraph()
      : faker.word.words({ count: { min: 1, max: 3 } }),
    imageUrl = Math.random() > 0.6 ? faker.image.url() : null,
    sendAtDate = faker.date.recent(),
    viewedAtDate = null,
    sequenceNumber = 0,
  }): Message {
    return {
      messageId: messageId,
      userId: Math.random() > 0.5 ? withUserId : myUserId,
      conversationId: conversationId,
      textContent: textContent,
      sequenceNumber: sequenceNumber,
      viewedAtDate: viewedAtDate,
      sendAtDate: sendAtDate,
      imageUrl: imageUrl,
    };
  }

  static createMultipleMessages(
    count: number,
    {
      myUserId,
      withUserId,
      conversationId,
    }: { myUserId: string; withUserId: string; conversationId: string }
  ): Message[] {
    // Reset lastMessageDate if startDate is provided

    return Array.from({ length: count }, (_, index) =>
      MessageMocker.createFakeMessage({
        myUserId,
        withUserId,
        conversationId,
        sequenceNumber: index,
      })
    );
  }

  // Reset the lastMessageDate (useful when starting a new conversation)
}
