import React from 'react';
import { View, Text, Image } from 'react-native';
import { cn } from '../ui/utils';

interface ChatBubbleInfoProps {
  username: string;
  avatarUrl?: string;
  className?: string;
  imageSize?: number;
  textClassName?: string;
  isUser: boolean;
}

export const ChatBubbleInfo = ({
  username,
  isUser,
  avatarUrl,
  className,
  imageSize = 32, // default size of 32px (h-8 w-8)
  textClassName,
}: ChatBubbleInfoProps) => {
  return (
    <View className={cn('items-center gap-2', isUser ? 'flex-row-reverse' : 'flex-row', className)}>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          className={cn('rounded-full', isUser ? 'ml-2' : 'mr-2')}
          style={{ width: imageSize, height: imageSize }}
        />
      ) : (
        <View
          className={cn('items-center justify-center rounded-full bg-yellow-300')}
          style={{ width: imageSize, height: imageSize }}>
          <Text className="font-medium text-gray-700">{username.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <Text className={cn('text-sm font-medium', textClassName)}>{username}</Text>
    </View>
  );
};
