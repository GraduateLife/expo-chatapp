import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';

type BubbleStatus = 'happening' | 'okay';

const getBubbleStatusColor = (bubbleStatus: BubbleStatus) => {
  switch (bubbleStatus) {
    case 'happening':
      return 'gray';
    case 'okay':
      return 'green';
  }
};

export const ChatBubbleSendStatus = ({
  isUser,
  isViewed,
}: {
  isUser: boolean;
  isViewed: boolean;
}) => {
  const [sendStatus, setSendStatus] = useState<BubbleStatus>('happening');

  if (!isUser)
    return (
      <View className="relative">
        {/* is read */}
        <Ionicons name="checkmark-circle" size={18} color={isViewed ? 'green' : 'gray'} />
      </View>
    );
};
