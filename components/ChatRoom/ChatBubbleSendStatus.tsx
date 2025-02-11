import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export const ChatBubbleSendStatus = ({
  isUser,
  isViewed,
}: {
  isUser: boolean;
  isViewed: boolean;
}) => {
  if (!isUser)
    return (
      <View className="relative ml-2">
        {/* is read */}
        <Ionicons name="eye" size={20} color={isViewed ? 'green' : 'gray'} />
      </View>
    );
};
