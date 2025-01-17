import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  return (
    <TouchableOpacity className="p-2" onPress={router.back}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
}
