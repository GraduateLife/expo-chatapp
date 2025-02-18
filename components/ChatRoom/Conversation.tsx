import Ionicons from '@expo/vector-icons/build/Ionicons';
import { memo, useCallback, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useScrollToBottom } from '~/lib/hooks/useScrollToBottom';
import { useFetchMessages } from '~/sqlite/conversationUtils';

import { useScrollUpToDismissKeyboard } from '~/lib/hooks/useScrollUpToDismissKeyboard';
import { Message } from '~/sqlite/schemas';
import { useInputStore } from '~/store/inputStore';
import { ChatBubble } from './ChatBubble';

const MessageItem = memo(({ item }: { item: Message }) => {
  return <ChatBubble {...item} />;
});

export const Conversation = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { data: messages } = useFetchMessages(conversationId);
  const { listRef, isAtBottom, onScrollListener, scrollToBottom } =
    useScrollToBottom();
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

  const renderItem = useCallback(
    ({ item }: { item: Message }) => <MessageItem item={item} />,
    [messages]
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        onScroll={(e) => {
          onScrollListener(e);
          handleScroll(e);
        }}
        data={messages}
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
