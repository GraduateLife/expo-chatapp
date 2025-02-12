import React, { useRef, useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { MyUserId } from '~/Tempfile';
import { useVisibilityWatcher } from '~/lib/components/VisibilityWatcherView';
import { Message } from '~/sqlite/schemas';
import { AspectRatio } from '../Common/AspectRatio';
import { defaultAnimationSettings } from '../ui/animation';
import { cn, formatTime } from '../ui/utils';

const BubbleDefaultColor = {
  user: 'bg-blue-100',
  other: 'bg-gray-100',
};

const BubblePressedColor = {
  user: 'bg-blue-200',
  other: 'bg-gray-200',
};

export const ChatBubble = ({
  textContent,
  userId,
  sendAtDate,
  imageUrl,
  viewedAtDate,
}: Message) => {
  const isUser = userId === MyUserId;

  const [bubbleColor, setBubbleColor] = useState(
    isUser ? BubbleDefaultColor.user : BubbleDefaultColor.other
  );
  const scale = useSharedValue(1);
  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const ref = useRef<View>(null);

  const { isVisible, onLayout } = useVisibilityWatcher(ref);

  return (
    <View
      ref={ref}
      onLayout={onLayout}
      className={cn(
        'my-3',
        isUser ? 'items-end pl-3 pr-2' : 'items-start pl-2 pr-3'
      )}
    >
      <ChatBubbleHeader
        isUser={isUser}
        timestamp={formatTime(sendAtDate)}
        isViewed={isVisible}
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
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <View className="w-fit">
        <Text className="text-sm text-gray-500">{timestamp}</Text>
      </View>
      {!isUser && (
        <View className="relative ml-2">
          {/* is read */}
          <Ionicons name="eye" size={20} color={isViewed ? 'green' : 'gray'} />
        </View>
      )}
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
