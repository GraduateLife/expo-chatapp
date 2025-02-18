import { faker } from '@faker-js/faker';
import { Conversation, ConversationParticipant } from '~/sqlite/schemas';

export class ConversationMocker {
  static createFakeConversation(createdByUser?: string): Conversation {
    return {
      conversationId: faker.string.uuid(),
      createdByUser: createdByUser ?? faker.string.uuid(),
      title: faker.word.words({ count: { min: 1, max: 3 } }),
      createdAtDate: faker.date.recent(),
      isGroupChat: false,
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

export class ConversationParticipantMocker {
  static createFakeParticipant(
    conversationId: string,
    userId: string
  ): ConversationParticipant {
    return {
      conversationId,
      userId,
      joinedAtDate: faker.date.recent(),
      leftAtDate: null,
    };
  }

  static createFakeParticipants(
    conversationId: string,
    creatorId: string
  ): ConversationParticipant[] {
    // Always include creator as first participant
    const participants = [
      ConversationParticipantMocker.createFakeParticipant(
        conversationId,
        creatorId
      ),
    ];

    return participants;
  }
}
