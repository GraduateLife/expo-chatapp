export type Contact = {
  userId: string;
  userName: string;
  avatarUrl?: string;
  lastSeenDate: Date;
  signature: string;
  userStatus: UserStatus;
};
export type UserStatus = 'online' | 'offline' | 'busy' | 'typing';

export type MessageType = 'raw-text' | 'rich-text' | 'audio';

export type Message = {
  messageId: string;
  userId: string;
  textContent: string;
  sendAtDate: Date;
  imageUrl?: string;
  isViewed: boolean;
};
