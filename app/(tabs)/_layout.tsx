import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Stack, Tabs } from 'expo-router';
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
            tabBarLabel: ({ color }) => <Text className={`text-[${color}]`}>Chats</Text>,
            tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarLabel: ({ color }) => <Text className={`text-[${color}]`}>Contacts</Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="phone-outgoing" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="qrcode"
          options={{
            title: 'QRCode',
            tabBarLabel: () => <></>,
            tabBarIcon: ({ color }) => (
              <View className="mt-6 h-10 w-10 items-center justify-center rounded-sm bg-gray-100">
                <MaterialCommunityIcons name="qrcode" size={36} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="saves"
          options={{
            title: 'Saves',
            tabBarLabel: ({ color }) => <Text className={`text-[${color}]`}>Saves</Text>,
            tabBarIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarLabel: ({ color }) => <Text className={`text-[${color}]`}>Account</Text>,
            tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
