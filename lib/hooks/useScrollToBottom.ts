import { NativeScrollEvent } from 'react-native';

import { NativeSyntheticEvent } from 'react-native';

import { useState } from 'react';

import { useRef } from 'react';
import { FlatList } from 'react-native';

export const useScrollToBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const listRef = useRef<FlatList>(null);
  const onScrollListener = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    setIsAtBottom(isCloseToBottom);
  };
  const scrollToBottom = () => {
    listRef.current?.scrollToEnd({ animated: true });
  };
  return { listRef, isAtBottom, onScrollListener, scrollToBottom };
};
