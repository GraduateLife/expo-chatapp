import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

export default function ChatRoomLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
        }}>
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
        <Stack.Screen
          name="ReadyToSendImage.modal"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Ready to send an image?', // customize this
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}
