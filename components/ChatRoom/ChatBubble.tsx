import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

import { ChatBubbleInfo } from '../ChatRoom/ChatBubbleInfo';
import { cn, formatTime } from '../ui/utils';
import { ChatSuggestions } from './ChatBubbleSuggestions';
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
  suggestions?: string[];
}

export const ChatBubble = ({
  message,
  isUser = false,
  timestamp = formatTime(),
}: ChatBubbleProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const heightAnim = useSharedValue<number>(0);
  const animatedStyles = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, { duration: 1000 }),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuggestions(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className={`my-1.5 px-5 ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={cn(
          'max-w-[80%] rounded-2xl p-3',
          isUser ? 'rounded-tr-sm bg-blue-100' : 'rounded-tl-sm bg-white'
        )}>
        <Text className="text-lg text-black">{message}</Text>
        {timestamp && (
          <Text
            className={cn('mt-1.5 text-xs text-gray-500', isUser ? 'self-end ' : 'self-start ')}>
            {timestamp}
          </Text>
        )}
        {showSuggestions && (
          <Animated.View style={animatedStyles} className={isUser ? 'items-end' : 'items-start'}>
            <ChatSuggestions suggestions={['abc', 'def', 'ghi']} />
          </Animated.View>
        )}
      </View>
    </View>
  );
};
