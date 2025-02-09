import { ConversationMocker } from '~/.data/ConversationMocker';
import { MessageMocker } from '~/.data/MessageMocker';
import { generateMockData, readJsonProperty } from '~/.data/runner';

generateMockData(
  () => ConversationMocker.createFakeConversation(),
  'conversation'
);
const conversationId = readJsonProperty('conversation', 'conversationId');
const createdByUser = readJsonProperty('conversation', 'createdByUser');
const lastMessageId = readJsonProperty('conversation', 'lastMessageId');

const StartConversation = () => {
  return [
    ...MessageMocker.createMultipleMessages(10, createdByUser, conversationId),
    MessageMocker.createFakeMessage(
      createdByUser,
      conversationId,
      lastMessageId
    ),
  ];
};

generateMockData(StartConversation, 'msg_cov' + conversationId.slice(0, 4));
