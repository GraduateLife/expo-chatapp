import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const loadFonts = async () => {
  await Font.loadAsync({
    delius: require('~/assets/Delius-Regular.ttf'),
  });
  console.log('Fonts loaded');
};

export const usePrepareApp = (
  doSomething: Array<Promise<void>>,
  timeout: number = 5000
) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error(`Preparation timed out after ${timeout}ms`));
          }, timeout);
        });

        await Promise.race([Promise.all(doSomething), timeoutPromise]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [timeout, doSomething]);
  return { appIsReady };
};
