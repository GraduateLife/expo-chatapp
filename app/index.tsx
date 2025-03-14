import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@ui-kitten/components';
import React from 'react';
import { useSendPrompt } from '~/AiChat/api';

export default function Welcome() {
  const { data, error } = useSendPrompt('hi?');
  const [response, setResponse] = React.useState<string>('');

  return (
    <>
      <View className="flex h-full w-full bg-slate-100">
        <SafeAreaView className="mx-auto flex h-full w-[90%] items-center justify-center">
          <Text className="font-[delius] text-6xl font-bold text-black">
            Welcome!
          </Text>
          <Image
            source={require('~/assets/icon.png')}
            className="my-4 size-80"
          />
          <View className="w-full">
            <Button
              status="success"
              size="giant"
              onPress={() => {
                router.push('/(auth)/login');
              }}
            >
              <Text className="text-2xl font-semibold text-white">Login</Text>
            </Button>
          </View>
          <Text className="my-3 text-xl font-semibold text-gray-500">or</Text>
          <Button
            onPress={() => {
              router.push('/(auth)/register');
            }}
          >
            Register
          </Button>
          <Button
            onPress={() => {
              if (data) {
                setResponse(data.response);
              } else if (error) {
                console.error('Error:', error);
              }
            }}
          >
            hello test
          </Button>
          {response && (
            <Text className="mt-2 text-base text-gray-700">{response}</Text>
          )}
          <Button
            onPress={() => {
              router.push('/(tabs)');
            }}
          >
            <Text className="text-xl font-semibold text-stone-400">
              Just let me in
            </Text>
          </Button>
        </SafeAreaView>
      </View>
    </>
  );
}
