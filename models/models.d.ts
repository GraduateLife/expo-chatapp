declare type Contact = {
  id: string;
  userName: string;
  avatarUrl?: string;
  signature: string;
  onlineStatus: OnlineStatus;
};
declare type OnlineStatus = 'online' | 'offline' | 'busy';
