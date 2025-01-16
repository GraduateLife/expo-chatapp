import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';
import StackHeader from '~/components/Common/StackHeader';

export default function ChatRoom() {
  const { contactId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerTitle: contactId as string }} />
      <Text>{contactId}</Text>
    </>
  );
}
