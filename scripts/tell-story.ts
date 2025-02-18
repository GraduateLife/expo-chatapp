import { BotMocker } from '~/.data/BotMocker';
import {
  ConversationMocker,
  ConversationParticipantMocker,
} from '~/.data/ConversationMocker';
import { MessageMocker } from '~/.data/MessageMocker';
import { UserMocker } from '~/.data/UserMocker';
import {
  generateMockData,
  readJsonArrayProperty,
  readJsonAsArray,
  readJsonAsObject,
  rewriteJsonArrayProperty,
} from '~/.data/runner';
import { Bot, Conversation, User } from '~/sqlite/schemas';
const GenerateMe = () => {
  return UserMocker.createFakeUser({ lastConversationId: null });
};
generateMockData(GenerateMe, 'me');

const GenerateUsers = () => {
  const me = readJsonAsObject<User>('me');
  return [
    me,
    ...UserMocker.createManyBotUsers(10, { lastConversationId: null }),
  ];
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

const myUserId = readJsonAsObject<User>('me').userId;

const GenerateConversationContent = (index: number) => {
  const conversationId = readJsonArrayProperty<Conversation, 'conversationId'>(
    'conversations',
    'conversationId',
    index
  );

  rewriteJsonArrayProperty<User, 'lastConversationId'>(
    'users',
    'lastConversationId',
    conversationId,
    index
  );

  const withUserId = readJsonArrayProperty<Bot, 'botId'>(
    'bots',
    'botId',
    index
  );

  const lastMessageId = readJsonArrayProperty<Conversation, 'lastMessageId'>(
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
      messageId: lastMessageId ?? undefined,
    }),
  ];
};

const LinkParticipants = (conversationIndex: number, fileName: string) => {
  generateMockData(
    () => GenerateConversationContent(conversationIndex),
    fileName
  );

  const conversationId = readJsonArrayProperty<Conversation, 'conversationId'>(
    'conversations',
    'conversationId',
    conversationIndex
  );
  const withUserId = readJsonArrayProperty<Bot, 'botId'>('bots', 'botId', -1);

  generateMockData(
    () =>
      ConversationParticipantMocker.createFakeParticipants(
        conversationId,
        myUserId
      ),
    'conversation_participants',
    true
  );
  generateMockData(
    () =>
      ConversationParticipantMocker.createFakeParticipants(
        conversationId,
        withUserId
      ),
    'conversation_participants',
    true
  );
};

LinkParticipants(-1, 'one_conversation_content');
LinkParticipants(4, 'another_conversation_content');
