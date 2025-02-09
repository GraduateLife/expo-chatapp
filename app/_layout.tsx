import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { loadFonts, usePrepareApp } from '~/lib/hooks/usePrepareApp';
import { AppSQLiteProvider } from '~/localStorage/AppSqliteProvider';
import FullPageLoading from '../components/Common/FullPageLoading';
import '../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const { appIsReady } = usePrepareApp([loadFonts()]);

  if (!appIsReady) {
    return <FullPageLoading />;
  }
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppSQLiteProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="chatRoom" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </AppSQLiteProvider>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ApplicationProvider>
  );
}
