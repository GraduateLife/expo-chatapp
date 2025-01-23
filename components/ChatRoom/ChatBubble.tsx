import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Alert, Image } from 'react-native';

import { ChatBubbleInfo } from '../ChatRoom/ChatBubbleInfo';
import { cn, formatTime } from '../ui/utils';
import { ChatSuggestions } from './ChatBubbleSuggestions';
import { useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ChatBubbleSendStatus } from './ChatBubbleSendStatus';
import { AspectRatio } from '../Common/AspectRatio';
import { useImageStore } from '~/store/imageStore';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  className?: string;
  timestamp?: string;
  imageUrl?: string;
  suggestions?: string[];
  onPressInterrupter?: () => void;
}

export const ChatBubble = ({ ...props }: ChatBubbleProps) => {
  return (
    <Pressable onLongPress={() => Alert.alert('Hello')}>
      <ChatBubbleCore {...props} />
    </Pressable>
  );
};

const ChatBubbleCore = ({
  message,
  className,
  isUser = false,
  timestamp = formatTime(),
  imageUrl,
  onPressInterrupter,
}: ChatBubbleProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const initialOpacity = useSharedValue<number>(0);
  const rotateIcon = useSharedValue(0);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateIcon.value}deg` }],
  }));

  const handlePress = () => {
    rotateIcon.value = withSpring(showSuggestions ? 0 : 180, {
      damping: 10,
      stiffness: 200,
      mass: 0.5,
    });
    setShowSuggestions(!showSuggestions);
    onPressInterrupter?.();
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withDelay(1000, withTiming(initialOpacity.value + 1, { duration: 1000 })),
  }));

  return (
    <View className={cn(` my-3 px-5 ${isUser ? 'items-end' : 'items-start'}`, className)}>
      <View>
        <View className="flex-row items-center justify-between gap-3">
          <ChatBubbleSendStatus />
          <Text className="text-sm text-gray-500 ">{timestamp}</Text>
        </View>
      </View>
      <View
        className={cn(
          'max-h-[300px] max-w-[98%] rounded-2xl p-2',
          isUser ? 'rounded-tr-sm bg-blue-100' : 'rounded-tl-sm bg-gray-100'
        )}>
        <Text className="text-lg text-black">{message}</Text>

        {imageUrl && (
          <View className="max-w-[400px]">
            <AspectRatio ratio={4 / 3}>
              <Image source={{ uri: imageUrl }} className="h-full w-full" resizeMode="contain" />
            </AspectRatio>
          </View>
        )}

        <Pressable
          className={cn(
            'absolute -bottom-2',
            isUser ? '-left-2' : '-right-2',
            'rounded-full bg-slate-200 p-1'
          )}
          onPress={handlePress}>
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons name="chevron-down" size={10} color="white" />
          </Animated.View>
        </Pressable>
      </View>

      {showSuggestions && (
        <Animated.View
          style={animatedStyles}
          className={cn(isUser ? 'items-end' : 'items-start', 'mt-1')}>
          <ChatSuggestions suggestions={['abc', 'def', 'ghi']} />
        </Animated.View>
      )}
    </View>
  );
};
