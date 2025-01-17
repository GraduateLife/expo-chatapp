import { View } from 'react-native';
import { Spinner } from 'tamagui';
export default function LoadingPage() {
  return (
    <View className="flex h-full w-full items-center justify-center bg-cyan-400">
      <Spinner size="large" color="$blue10" />
    </View>
  );
}
