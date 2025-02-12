import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { ReactNode } from 'react';
import { loadFonts, usePrepareApp } from '~/lib/hooks/usePrepareApp';
import { AppQueryProvider } from '~/lib/tanstack/QueryProvider';
import { AppSQLiteProvider } from '~/sqlite/AppSqliteProvider';
import FullPageLoading from '../components/Common/FullPageLoading';
import '../global.css';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppQueryProvider>
        <AppSQLiteProvider>{children}</AppSQLiteProvider>
      </AppQueryProvider>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ApplicationProvider>
  );
};

export default function RootLayout() {
  const { appIsReady } = usePrepareApp([loadFonts()]);

  if (!appIsReady) {
    return <FullPageLoading />;
  }
  return (
    <AppWrapper>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chatRoom" options={{ headerShown: false }} />
      </Stack>
    </AppWrapper>
  );
}
