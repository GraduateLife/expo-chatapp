import { BotMocker } from '~/.data/BotMocker';
import { ConversationMocker } from '~/.data/ConversationMocker';
import { MessageMocker } from '~/.data/MessageMocker';
import { UserMocker } from '~/.data/UserMocker';
import {
  generateMockData,
  readJsonAsObject,
  readRandomArrayProperty,
} from '~/.data/runner';

const GenerateMe = () => {
  return UserMocker.createFakeUser();
};
generateMockData(GenerateMe, 'me');

//me and 10 bots
const GenerateBots = () => {
  return BotMocker.createMultipleBots(10);
};
generateMockData(GenerateBots, 'bots');

//me and 10 conversations
const GenerateConversations = () => {
  const userId = readJsonAsObject('me').userId;
  return ConversationMocker.createMultipleConversations(10, userId);
};
generateMockData(GenerateConversations, 'conversations');

const GenerateConversationContent = (index: number) => {
  const conversationId = readRandomArrayProperty(
    'conversations',
    'conversationId',
    index
  );
  const myUserId = readJsonAsObject('me').userId;

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
