import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert, Image } from 'react-native';
import { Button, XStack, YStack } from 'tamagui';
import { router, Stack } from 'expo-router';
import { Routes } from '~/routes';

export default function Welcome() {
  return (
    <>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <View className="flex h-full w-full bg-slate-50 ">
        <SafeAreaView className="mx-auto flex h-full w-[90%] items-center justify-center">
          <Text className="font-[delius] text-6xl font-bold text-black">Welcome!</Text>
          <Image source={require('~/assets/logo.png')} className="my-4 size-80" />
          <XStack gap={10}>
            <Button
              size="$6"
              backgroundColor="#34d399" //emerald-400
              onPress={() => {
                router.push(Routes.MAIN_INDEX);
              }}>
              <Button.Text>
                <Text className="text-white">Login</Text>
              </Button.Text>
            </Button>
            <Button
              size="$6"
              variant="outlined"
              onPress={() => {
                router.push(Routes.MAIN_INDEX);
              }}>
              Register
            </Button>
          </XStack>
        </SafeAreaView>
      </View>
    </>
  );
}
