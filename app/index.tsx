import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert, Image } from 'react-native';
import { Button, Theme, XStack, YStack } from 'tamagui';
import { Link, router, Stack } from 'expo-router';

import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Welcome() {
  return (
    <>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <View className="flex h-full w-full bg-slate-100 ">
        <SafeAreaView className="mx-auto flex h-full w-[90%] items-center justify-center">
          <Text className="font-[delius] text-6xl font-bold text-black">Welcome!</Text>
          <Image source={require('~/assets/logo.png')} className="my-4 size-80" />
          <View className="w-full">
            <Theme name="green">
              <Button
                size="$5"
                backgroundColor="#34d399" //emerald-400
                onPress={() => {
                  router.push('/(auth)/login');
                }}>
                <Button.Text>
                  <Text className="text-2xl font-semibold text-white">Login</Text>
                </Button.Text>
              </Button>
            </Theme>
          </View>
          <Text className="my-3 text-xl font-semibold text-gray-500">or</Text>
          <YStack>
            <Button
              chromeless
              iconAfter={<MaterialCommunityIcons name="account-check" size={24} color="#3b82f6" />} //blue-500
              onPress={() => {
                router.push('/(auth)/register');
              }}>
              <Button.Text>
                <Text className="text-xl font-semibold text-blue-500">Register</Text>
              </Button.Text>
            </Button>
            <Button
              chromeless
              iconAfter={<FontAwesome6 name="chevron-right" size={12} color="#a8a29e" />} //stone-400
              onPress={() => {
                router.push('/(tabs)');
              }}>
              <Button.Text>
                <Text className="text-xl font-semibold text-stone-400">Just let me in</Text>
              </Button.Text>
            </Button>
          </YStack>
        </SafeAreaView>
      </View>
    </>
  );
}
