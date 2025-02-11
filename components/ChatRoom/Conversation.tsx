import Ionicons from '@expo/vector-icons/build/Ionicons';
import { memo, useCallback, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useListItemIsVisible } from '~/lib/hooks/useListItemIsVisible';
import { useScrollToBottom } from '~/lib/hooks/useScrollToBottom';
import { useFetchMessages } from '~/sqlite/conversationUtils';

import { useScrollUpToDismissKeyboard } from '~/lib/hooks/useScrollUpToDismissKeyboard';
import { Message } from '~/sqlite/schemas';
import { useInputStore } from '~/store/inputStore';
import { ChatBubble } from './ChatBubble';

const MessageItem = memo(
  ({ item, visibleIds }: { item: Message; visibleIds: string[] }) => {
    return (
      <ChatBubble {...item} isVisible={visibleIds.includes(item.messageId)} />
    );
  }
);

export const Conversation = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { data: messages } = useFetchMessages(conversationId);
  const { listRef, isAtBottom, onScrollListener, scrollToBottom } =
    useScrollToBottom();
  const { visibleIds, onViewableItemsChanged, viewabilityConfig } =
    useListItemIsVisible({
      keyExtractorField: 'messageId',
      visiblePercentage: 100,
    });
  const { isInputFocused, setInputFocused } = useInputStore();
  const { handleScroll } = useScrollUpToDismissKeyboard(
    isInputFocused,
    setInputFocused
  );

  useEffect(() => {
    if (isInputFocused) {
      scrollToBottom();
    }
  }, [isInputFocused, scrollToBottom]);

  // Clean up throttle on unmount

  const scrollToMessageId = useCallback(
    (messageId: string) => {
      const messageIndex = messages!.findIndex(
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

      {!isAtBottom && (
        <TouchableOpacity
          onPress={scrollToBottom}
          className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2"
        >
          <Ionicons name="chevron-down" size={22} color={'gray'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
