import { faker } from '@faker-js/faker';
import { Bot } from '../sqlite/schemas';
export class BotMocker {
  static createFakeBot(): Bot {
    return {
      botId: faker.string.uuid(),
      ownerId: faker.string.uuid(),
      botName: `Bot_${faker.company.name()}`,
      modelName: faker.internet.domainWord(),
      createdAtDate: new Date(),
      capabilities: faker.helpers
        .arrayElements(
          ['chat', 'image_generation', 'code_analysis', 'translation'],
          { min: 1, max: 4 }
        )
        .join(','),
    };
  }

  static createMultipleBots(count: number): Bot[] {
    return Array.from({ length: count }, () => BotMocker.createFakeBot());
  }
}
