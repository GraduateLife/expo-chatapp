import { Stack } from 'expo-router';

export default function ChatRoomLayout() {
  return (
    <Stack>
      <Stack.Screen name="[contactId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="ChatToUser.modal"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Chat Details', // customize this
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
