import React from 'react';
import { Image, Text, View } from 'react-native';
import { cn } from '../ui/utils';

type ChatBubbleInfoProps = Contact & {
  className?: string;
};

const getUserNameFirstLetter = (userName: string) => {
  return userName.charAt(0).toUpperCase();
};

const getOnlineStatusColor = (onlineStatus: OnlineStatus) => {
  switch (onlineStatus) {
    case 'online':
      return 'bg-green-500';
    case 'offline':
      return 'bg-gray-400';
    case 'busy':
      return 'bg-amber-500';
  }
};

export const ChatBubbleInfo = ({
  userName,
  avatarUrl,
  className,
  signature,
  onlineStatus,
}: ChatBubbleInfoProps) => {
  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <View className="relative flex-row items-center gap-2">
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            className={cn('rounded-full')}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <View
            className={cn(
              'items-center justify-center rounded-full bg-yellow-300'
            )}
            style={{ width: 40, height: 40 }}
          >
            <Text className="text-lg text-gray-700">
              {getUserNameFirstLetter(userName)}
            </Text>
          </View>
        )}
        <View className="absolute bottom-0 right-0">
          <View
            className={cn(
              'size-3 rounded-full',
              getOnlineStatusColor(onlineStatus)
            )}
          />
        </View>
      </View>
      <View className="flex-1">
        <Text className={cn('text-lg font-medium')}>{userName}</Text>
        <Text className="text-sm text-gray-500">{signature}</Text>
      </View>
    </View>
  );
};
