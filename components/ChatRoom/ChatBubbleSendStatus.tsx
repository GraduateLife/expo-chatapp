import { Ionicons } from '@expo/vector-icons';
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
  if (!isUser)
    return (
      <View className="relative">
        {/* is read */}
        <Ionicons name="eye" size={18} color={isViewed ? 'green' : 'gray'} />
      </View>
    );
};
