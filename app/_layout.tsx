import { createTamagui, TamaguiProvider, Theme, View } from 'tamagui';
import '../global.css';
import * as Font from 'expo-font';
import { Link, router, Stack } from 'expo-router';
import defaultConfig from '@tamagui/config/v3';
import { useState, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import FullPageLoading from '../components/Common/FullPageLoading';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'tamagui';
import BackButton from '~/components/Common/BackButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import tamaguiConfig from '~/tamagui.config';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

const tamaguiConfig = createTamagui(defaultConfig);

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          delius: require('~/assets/Delius-Regular.ttf'),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name="blue">
          <FullPageLoading />
        </Theme>
      </TamaguiProvider>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name="blue">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="chatRoom" options={{ headerShown: false }} />
          </Stack>
        </Theme>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
