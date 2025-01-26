import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function ChatToUserModal() {
  const router = useRouter();

  return (
    <View className="flex-1 p-4">
      <Text>Your Modal Content Here</Text>
    </View>
  );
}
