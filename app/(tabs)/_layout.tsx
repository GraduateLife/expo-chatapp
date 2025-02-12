import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function MainLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#38bdf8', //sky-400
          headerShown: false,
          tabBarInactiveTintColor: '#a1a1aa', //zinc-400
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubbles" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="phone-outgoing"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="qrcode"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <View className="mt-6 h-10 w-10 items-center justify-center rounded-sm bg-gray-100">
                <MaterialCommunityIcons name="plus" size={36} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="saves"
          options={{
            title: 'Saves',
            tabBarIcon: ({ color }) => (
              <Feather name="box" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
