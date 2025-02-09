export type AiContact = {
  model: string;
  contactName: string;
  avatarUrl?: string;
  lastSeenDate: Date;
  lastConversationId?: string;
  signature: string;
  userStatus: UserStatus;
};
export type UserStatus = 'online' | 'offline' | 'busy' | 'typing';

export type MessageType = 'raw-text' | 'rich-text' | 'audio';

export type Message = {
  messageId: string;
  userId: string;
  conversationId: string;
  textContent: string;
  sendAtDate: Date;
  imageUrl?: string;
  isViewed: boolean;
};

export type Conversation = {
  conversationId: string;
  createdByUser: string;
  title: string;
  createdAtDate: Date;
  lastMessageId: string;
};
