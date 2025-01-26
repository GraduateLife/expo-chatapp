import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { seedDatabase } from '~/.data/seeder';
import FullPageLoading from '../components/Common/FullPageLoading';
import '../global.css';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};
const loadFonts = async () => {
  await Font.loadAsync({
    delius: require('~/assets/Delius-Regular.ttf'),
  });
  console.log('Fonts loaded');
};

const usePrepareApp = (
  doSomething: Array<Promise<void>>,
  timeout: number = 10000
) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all(doSomething);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, timeout));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  return { appIsReady };
};
export default function RootLayout() {
  const { appIsReady } = usePrepareApp([loadFonts(), seedDatabase()]);
  if (!appIsReady) {
    return <FullPageLoading />;
  }
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="chatRoom" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ApplicationProvider>
  );
}

const migrateDbIfNeeded = async () => {
  const db = await SQLite.openDatabaseAsync('app.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);
};
