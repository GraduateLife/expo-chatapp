import { faker } from '@faker-js/faker';
import { Message } from '../models/types';
export class MessageMocker {
  static createFakeMessage(isUser: boolean = false): Message {
    return {
      messageId: faker.string.uuid(),
      userId: faker.string.uuid(),
      message: faker.lorem.paragraph(),
      isUser: isUser,
      isViewed: false,
      timestamp: faker.date.recent(),
      imageUrl: Math.random() > 0.7 ? faker.image.url() : undefined, // 30% chance to have an image
    };
  }

  static createMultipleMessages(count: number, isUser?: boolean): Message[] {
    return Array.from({ length: count }, () =>
      this.createFakeMessage(isUser ?? Math.random() > 0.5)
    );
  }
}
