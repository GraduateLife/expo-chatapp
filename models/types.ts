export type Contact = {
  userId: string;
  userName: string;
  avatarUrl?: string;
  lastSeenDate: Date;
  signature: string;
  onlineStatus: OnlineStatus;
};
export type OnlineStatus = 'online' | 'offline' | 'busy';

export type Message = {
  messageId: string;
  userId: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  isViewed: boolean;
};
