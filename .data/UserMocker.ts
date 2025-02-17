import { faker } from '@faker-js/faker';
import { type User } from '../sqlite/schemas';

export class UserMocker {
  static createFakeUser({
    lastConversationId = null,
  }: {
    lastConversationId: string | null;
  }): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      userId: faker.string.uuid(),
      avatarUrl: faker.image.url(),
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number({ style: 'international' }),
      lastConversationId: lastConversationId,
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
      deletedAtDate: null,
      isBot: false,
    };
  }

  static createBotUser({
    lastConversationId = null,
  }: {
    lastConversationId: string | null;
  }): User {
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
      lastConversationId: lastConversationId,
      timezone: 'UTC',
      preferredLanguage: 'en',
      deletedAtDate: null,
      isBot: true,
    };
  }
  static createManyBotUsers(
    count: number,
    { lastConversationId }: { lastConversationId: string | null }
  ): User[] {
    return Array.from({ length: count }, () =>
      UserMocker.createBotUser({ lastConversationId })
    );
  }
}
