import { faker } from '@faker-js/faker';
import { Contact } from '../models/types';

export class ContactMocker {
  static createFakeContact(): Contact {
    return {
      userId: faker.string.uuid(),
      userName: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      lastSeenDate: faker.date.recent(),
      onlineStatus: faker.helpers.arrayElement(['online', 'offline', 'busy']),
      signature: faker.lorem.sentence(),
    };
  }

  static createMultipleContacts(count: number): Contact[] {
    return Array.from({ length: count }, () => this.createFakeContact());
  }
}
