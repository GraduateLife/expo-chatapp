import React, { useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useHasStayedInViewForSeconds } from '~/lib/hooks/useHasStayedInViewForSeconds';

import { Message } from '~/models/types';

import { MyUserId } from '~/Tempfile';
import { AspectRatio } from '../Common/AspectRatio';
import { defaultAnimationSettings } from '../ui/animation';
import { cn, formatTime } from '../ui/utils';
import { ChatBubbleSendStatus } from './ChatBubbleSendStatus';

const BubbleDefaultColor = {
  user: 'bg-blue-100',
  other: 'bg-gray-100',
};

const BubblePressedColor = {
  user: 'bg-blue-200',
  other: 'bg-gray-200',
};

interface ChatBubbleProps extends Message {
  className?: string;
  isVisible: boolean;
  isViewed: boolean;
}

export const ChatBubble = ({ ...props }: ChatBubbleProps) => {
  return <ChatBubbleCore {...props} />;
};

const ChatBubbleCore = ({
  textContent,
  className,
  userId,
  sendAtDate,
  imageUrl,
  isVisible,
  isViewed,
}: ChatBubbleProps) => {
  const isUser = userId === MyUserId;

  const [thisIsViewed, setThisIsViewed] = useState(isViewed);
  const [bubbleColor, setBubbleColor] = useState(
    isUser ? BubbleDefaultColor.user : BubbleDefaultColor.other
  );
  const scale = useSharedValue(1);
  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  useHasStayedInViewForSeconds(isVisible, 2, () => setThisIsViewed(true), [
    thisIsViewed,
  ]);

  return (
    <View
      className={cn(
        'my-3',
        isUser ? 'items-end pl-3 pr-2' : 'items-start pl-2 pr-3',
        className
      )}
    >
      <ChatBubbleHeader
        isUser={isUser}
        timestamp={formatTime(sendAtDate)}
        isViewed={thisIsViewed}
      />
      <Pressable
        onPress={() => {
          Alert.alert('Hello');
        }}
        onPressIn={() => {
          setBubbleColor(
            isUser ? BubblePressedColor.user : BubblePressedColor.other
          );
          scale.value = withSpring(0.97, defaultAnimationSettings);
        }}
        onPressOut={() => {
          setBubbleColor(
            isUser ? BubbleDefaultColor.user : BubbleDefaultColor.other
          );
          scale.value = withSpring(1, defaultAnimationSettings);
        }}
      >
        <Animated.View
          style={bubbleAnimatedStyle}
          className={cn(
            'max-w-[95%] rounded-2xl p-3',
            isUser
              ? `rounded-tr-sm ${bubbleColor}`
              : `rounded-tl-sm ${bubbleColor}`
          )}
        >
          <Text className="text-lg text-black">{textContent}</Text>

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
      )}
    >
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
      onPressOut={handlePressOut}
    >
      <Animated.View style={imageAnimatedStyle}>
        <AspectRatio
          ratio={4 / 3}
          imageUrl={imageUrl}
          className="max-h-[250px]"
        />
      </Animated.View>
    </Pressable>
  );
};
