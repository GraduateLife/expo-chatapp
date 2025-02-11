import { faker } from '@faker-js/faker';
import { type User } from '../sqlite/schemas';

export class UserMocker {
  static createFakeUser(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      userId: faker.string.uuid(),
      avatarUrl: faker.image.url(),
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number({ style: 'international' }),
      authProvider: faker.helpers.arrayElement([
        'email',
        'google',
        'facebook',
        'apple',
      ]),
      authProviderId: faker.string.alphanumeric(24),
      username: faker.internet.displayName(),
      createdAtDate: faker.date.past(),
      lastActiveDate: faker.date.recent(),
      timezone: faker.location.timeZone(),
      preferredLanguage: faker.helpers.arrayElement([
        'en',
        'es',
        'fr',
        'de',
        'zh',
      ]),
      deletedAt: null,
    };
  }

  static createBotUser(): User {
    return {
      userId: faker.string.uuid(),
      avatarUrl: faker.image.url(),
      email: `bot_${faker.number.int(999)}@system.local`,
      phone: null,
      authProvider: 'system',
      authProviderId: null,
      username: `Bot_${faker.number.int(999)}`,
      createdAtDate: faker.date.past(),
      lastActiveDate: faker.date.recent(),
      timezone: 'UTC',
      preferredLanguage: 'en',
      deletedAt: null,
    };
  }
}
