import Ionicons from '@expo/vector-icons/build/Ionicons';
import { memo, useCallback, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useListItemIsVisible } from '~/lib/hooks/useListItemIsVisible';
import { useScrollToBottom } from '~/lib/hooks/useScrollToBottom';
import { useMessages } from '~/models/message-ops';
import { Message } from '~/models/types';
import { useInputStore } from '~/store/inputStore';
import { isSystemMessage } from '../ui/utils';
import { ChatBubble } from './ChatBubble';
//TODO: ugly code

// Add these memoized components outside the main component
const MemoizedSystemMessage = memo(({ message }: { message: string }) => {
  return (
    <View>
      <Text className="text-center text-gray-500">{message}</Text>
    </View>
  );
});

const MemoizedChatBubble = memo(ChatBubble);

const MessageItem = memo(
  ({ item, visibleIds }: { item: Message; visibleIds: string[] }) => {
    if (isSystemMessage(item)) {
      return <MemoizedSystemMessage message={item.textContent} />;
    }

    return (
      <MemoizedChatBubble
        messageId={item.messageId}
        textContent={item.textContent}
        userId={item.userId}
        imageUrl={item.imageUrl}
        sendAtDate={new Date(item.sendAtDate)}
        isViewed={item.isViewed}
        isVisible={visibleIds.includes(item.messageId)}
      />
    );
  }
);

export const Conversation = () => {
  const messages = useMessages();
  const { listRef, isAtBottom, onScrollListener, scrollToBottom } =
    useScrollToBottom();
  const { visibleIds, onViewableItemsChanged, viewabilityConfig } =
    useListItemIsVisible({
      keyExtractorField: 'messageId',
      visiblePercentage: 100,
    });
  const { isInputFocused, setInputFocused } = useInputStore();
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Add gesture handler for scroll
  const handleScroll = useCallback(
    (event: any) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const currentTime = Date.now();
      const deltaY = currentY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      // If scrolling up (positive velocity) and input is focused, unfocus it
      // Adjust the threshold value (0.5) as needed
      if (velocity < -0.5 && isInputFocused) {
        setInputFocused(false);
        Keyboard.dismiss();
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;
    },
    [isInputFocused, setInputFocused]
  );

  useEffect(() => {
    if (isInputFocused) {
      scrollToBottom();
    }
  }, [isInputFocused, scrollToBottom]);

  // Clean up throttle on unmount

  const scrollToMessageId = useCallback(
    (messageId: string) => {
      const messageIndex = messages.findIndex(
        (msg) => msg.messageId === messageId
      );
      if (messageIndex !== -1) {
        listRef.current?.scrollToIndex({
          index: messageIndex,
          animated: true,
          viewPosition: 0.5,
          viewOffset: 0,
        });
      }
    },
    [messages]
  );

  const onScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      listRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: false,
      });

      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }, 100);
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageItem item={item} visibleIds={visibleIds} />
    ),
    [visibleIds]
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        onScroll={(e) => {
          onScrollListener(e);
          handleScroll(e);
        }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        data={messages}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={renderItem}
        keyExtractor={(item) => item.messageId}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />

      {!isAtBottom ? (
        <TouchableOpacity
          onPress={scrollToBottom}
          className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2"
        >
          <Ionicons name="chevron-down" size={22} color={'gray'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => scrollToMessageId('123')}
          className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2"
        >
          <Ionicons name="chevron-up" size={22} color={'gray'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
