import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ChatBubble } from '~/components/ChatRoom/ChatBubble';
import { ChatBubbleInfo } from '~/components/ChatRoom/ChatBubbleInfo';
import StackHeader from '~/components/Common/StackHeader';
import { formatDay } from '~/components/ui/utils';

export default function ChatRoom() {
  const { contactId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerTitle: `Chat with ${contactId}` }} />
      <View className="flex-1 px-2 pt-4">
        <Text className="text-center text-xs text-gray-500">{formatDay()}</Text>
        <ChatBubbleInfo username="You" isUser={true} />
        <ChatBubble message="Hellorevgvthrtyjhhcerncieyrbcecrneucvbuecnierucneryuv" isUser={true} />
        <ChatBubbleInfo username="John Doe" isUser={false} />
        <ChatBubble
          message="Hello,bertb4tboenbu,ietnbiuetnbtrbrtbrtbrtvmueivbeyvbtu"
          isUser={false}
        />
      </View>
    </>
  );
}
