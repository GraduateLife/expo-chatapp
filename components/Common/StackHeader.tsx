import { Stack } from 'expo-router';

export default function StackHeader() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: '#38bdf8' },
            headerTintColor: '#fff',
            headerLeft: () => <></>,
          }}
        />
      </Stack>
    </>
  );
}
