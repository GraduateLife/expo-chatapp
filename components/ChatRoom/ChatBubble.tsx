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

const BubbleColor = {
  user: 'bg-blue-100',
  other: 'bg-gray-100',
};

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  className?: string;
  sendAtDate?: Date;
  imageUrl?: string;
  suggestions?: string[];
  isVisible: boolean;
  onPressInterrupter?: () => void;
}

export const ChatBubble = ({ ...props }: ChatBubbleProps) => {
  return (
    <Pressable onLongPress={() => Alert.alert('Hello')}>
      <ChatBubbleCore {...props} />
    </Pressable>
  );
};

const useHasStayedInView = (isVisible: boolean) => {
  const [isViewed, setIsViewed] = useState(false);
  const visibilityTimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isVisible && !isViewed) {
      // Start timer when message becomes visible
      visibilityTimer.current = setTimeout(() => {
        setIsViewed(true);
        // Here you can also call an API or dispatch an action to mark the message as viewed
      }, 2000);
    } else if (!isVisible && !isViewed) {
      // Clear timer if message goes out of view before 3 seconds
      if (visibilityTimer.current) {
        clearTimeout(visibilityTimer.current);
      }
    }

    return () => {
      if (visibilityTimer.current) {
        clearTimeout(visibilityTimer.current);
      }
    };
  }, [isVisible, isViewed]);
};

const ChatBubbleCore = ({
  message,
  className,
  isUser,
  sendAtDate,
  imageUrl,
  isVisible,
  onPressInterrupter,
}: ChatBubbleProps) => {
  const timestamp = formatTime(sendAtDate);

  const [isViewed, setIsViewed] = useState(false);
  const visibilityTimer = useRef<NodeJS.Timeout>();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const initialOpacity = useSharedValue<number>(0);
  const rotateIcon = useSharedValue(0);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateIcon.value}deg` }],
  }));

  const handlePress = () => {
    rotateIcon.value = withSpring(showSuggestions ? 0 : 180, defaultAnimationSettings);
    setShowSuggestions(!showSuggestions);
    onPressInterrupter?.();
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withDelay(1000, withTiming(initialOpacity.value + 1, { duration: 1000 })),
  }));

  useEffect(() => {
    if (isVisible && !isViewed) {
      // Start timer when message becomes visible
      visibilityTimer.current = setTimeout(() => {
        setIsViewed(true);
        // Here you can also call an API or dispatch an action to mark the message as viewed
      }, 2000);
    } else if (!isVisible && !isViewed) {
      // Clear timer if message goes out of view before 3 seconds
      if (visibilityTimer.current) {
        clearTimeout(visibilityTimer.current);
      }
    }

    return () => {
      if (visibilityTimer.current) {
        clearTimeout(visibilityTimer.current);
      }
    };
  }, [isVisible, isViewed]);

  return (
    <View
      className={cn('my-3', isUser ? 'items-end pl-3 pr-2' : 'items-start pl-2 pr-3', className)}>
      <ChatBubbleHeader isUser={isUser} timestamp={timestamp} isViewed={isViewed} />
      <View
        className={cn(
          'max-w-[95%] rounded-2xl p-3',
          isUser ? `rounded-tr-sm ${BubbleColor.user}` : `rounded-tl-sm ${BubbleColor.other}`
        )}>
        <Text className="text-lg text-black">{message}</Text>

        {imageUrl && <ChatBubbleImage imageUrl={imageUrl} />}

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
