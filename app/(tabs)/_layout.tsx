import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function MainLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#38bdf8', //sky-400
          headerShown: false,
          tabBarInactiveTintColor: '#a1a1aa', //zinc-400
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarIcon: ({ color }) => <FontAwesome5 name="user-friends" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
