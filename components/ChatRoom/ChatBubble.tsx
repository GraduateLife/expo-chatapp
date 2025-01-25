import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, Alert, Image, Linking } from 'react-native';

import { ChatBubbleInfo } from '../ChatRoom/ChatBubbleInfo';
import { cn, formatTime } from '../ui/utils';
import { ChatSuggestions } from './ChatBubbleSuggestions';
import { useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ChatBubbleSendStatus } from './ChatBubbleSendStatus';
import { AspectRatio } from '../Common/AspectRatio';
import { defaultAnimationSettings } from '../ui/animation';
import { useHasStayedInViewForSeconds } from '~/lib/hooks/useHasStayedInViewForSeconds';

const BubbleDefaultColor = {
  user: 'bg-blue-100',
  other: 'bg-gray-100',
};

const BubblePressedColor = {
  user: 'bg-blue-200',
  other: 'bg-gray-200',
};

interface ChatBubbleProps {
  messageId: string;
  message: string;
  isUser: boolean;
  className?: string;
  sendAtDate?: Date;
  imageUrl?: string;
  suggestions?: string[];
  isVisible: boolean;
  isViewed: boolean;
}

export const ChatBubble = ({ ...props }: ChatBubbleProps) => {
  return <ChatBubbleCore {...props} />;
};

const ChatBubbleCore = ({
  messageId,
  message,
  className,
  isUser,
  sendAtDate,
  imageUrl,
  isVisible,
  isViewed,
}: ChatBubbleProps) => {
  const timestamp = formatTime(sendAtDate);

  const [thisIsViewed, setThisIsViewed] = useState(isViewed);
  const [bubbleColor, setBubbleColor] = useState(
    isUser ? BubbleDefaultColor.user : BubbleDefaultColor.other
  );
  const scale = useSharedValue(1);
  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  useHasStayedInViewForSeconds(isVisible, 2, () => setThisIsViewed(true), [thisIsViewed]);

  return (
    <View
      className={cn('my-3', isUser ? 'items-end pl-3 pr-2' : 'items-start pl-2 pr-3', className)}>
      <ChatBubbleHeader isUser={isUser} timestamp={timestamp} isViewed={thisIsViewed} />
      <Pressable
        onPress={() => {
          Alert.alert('Hello');
        }}
        onPressIn={() => {
          setBubbleColor(isUser ? BubblePressedColor.user : BubblePressedColor.other);
          scale.value = withSpring(0.97, defaultAnimationSettings);
        }}
        onPressOut={() => {
          setBubbleColor(isUser ? BubbleDefaultColor.user : BubbleDefaultColor.other);
          scale.value = withSpring(1, defaultAnimationSettings);
        }}>
        <Animated.View
          style={bubbleAnimatedStyle}
          className={cn(
            'max-w-[95%] rounded-2xl p-3',
            isUser ? `rounded-tr-sm ${bubbleColor}` : `rounded-tl-sm ${bubbleColor}`
          )}>
          <Text className="text-lg text-black">{message}</Text>

          {imageUrl && <ChatBubbleImage imageUrl={imageUrl} />}
        </Animated.View>
      </Pressable>
    </View>
  );
};

const ChatBubbleHeader = ({
  isUser,
  timestamp,
  isViewed,
}: {
  isUser: boolean;
  timestamp: string;
  isViewed: boolean;
}) => {
  return (
    <View
      className={cn(
        'items-center justify-between',
        isUser ? 'flex-row-reverse gap-5' : 'flex-row'
      )}>
      <View className="w-fit">
        <Text className="text-sm text-gray-500">{timestamp}</Text>
      </View>
      <ChatBubbleSendStatus isUser={isUser} isViewed={isViewed} />
    </View>
  );
};

const ChatBubbleImage = ({ imageUrl }: { imageUrl: string }) => {
  const scale = useSharedValue(1);
  const handlePressIn = () => {
    scale.value = withSpring(0.97, defaultAnimationSettings);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, defaultAnimationSettings);
  };

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Pressable
      onPress={() => Linking.openURL(imageUrl)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={imageAnimatedStyle}>
        <AspectRatio ratio={4 / 3} imageUrl={imageUrl} className="max-h-[250px]" />
      </Animated.View>
    </Pressable>
  );
};
