import { faker } from '@faker-js/faker';
import { Message } from '../models/types';

const MyUserId = '$user';

export class MessageMocker {
  static createFakeMessage(): Message {
    return {
      messageId: faker.string.uuid(),
      userId: Math.random() > 0.5 ? faker.string.uuid() : MyUserId,
      textContent: faker.lorem.paragraph(),
      isViewed: false,
      sendAtDate: faker.date.recent(),
      imageUrl: Math.random() > 0.7 ? faker.image.url() : undefined, // 30% chance to have an image
    };
  }

  static createMultipleMessages(count: number): Message[] {
    return Array.from({ length: count }, () => this.createFakeMessage());
  }
}
