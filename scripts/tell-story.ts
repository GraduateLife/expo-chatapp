import { BotMocker } from '~/.data/BotMocker';
import { ConversationMocker } from '~/.data/ConversationMocker';
import { MessageMocker } from '~/.data/MessageMocker';
import { UserMocker } from '~/.data/UserMocker';
import {
  generateMockData,
  readJsonAsArray,
  readJsonAsObject,
  readRandomArrayProperty,
} from '~/.data/runner';
import { User } from '~/sqlite/schemas';
const GenerateMe = () => {
  return UserMocker.createFakeUser();
};
generateMockData(GenerateMe, 'me');

const GenerateUsers = () => {
  const me = readJsonAsObject<User>('me');
  return [me, ...UserMocker.createManyBotUsers(10)];
};
generateMockData(GenerateUsers, 'users');

const GenerateBots = () => {
  const me = readJsonAsObject<User>('me');
  const botUsers = readJsonAsArray<User>('users').filter((user) => user.isBot);
  return botUsers.map((user) =>
    BotMocker.createFakeBot({
      botId: user.userId,
      ownerId: me.userId,
      botName: user.username,
    })
  );
};
generateMockData(GenerateBots, 'bots');
//me and 10 conversations
const GenerateConversations = () => {
  const userId = readJsonAsObject<User>('me').userId;
  return ConversationMocker.createMultipleConversations(10, userId);
};
generateMockData(GenerateConversations, 'conversations');

const GenerateConversationContent = (index: number) => {
  const conversationId = readRandomArrayProperty(
    'conversations',
    'conversationId',
    index
  );
  const myUserId = readJsonAsObject<User>('me').userId;

  const withUserId = readRandomArrayProperty('bots', 'botId', index);
  const lastMessageId = readRandomArrayProperty(
    'conversations',
    'lastMessageId',
    index
  );
  return [
    ...MessageMocker.createMultipleMessages(10, {
      myUserId,
      withUserId,
      conversationId,
    }),
    MessageMocker.createFakeMessage({
      myUserId,
      withUserId,
      conversationId,
      sequenceNumber: 10,
      messageId: lastMessageId,
    }),
  ];
};

generateMockData(
  () => GenerateConversationContent(-1),
  'one_conversation_content'
);

generateMockData(
  () => GenerateConversationContent(4),
  'another_conversation_content'
);
