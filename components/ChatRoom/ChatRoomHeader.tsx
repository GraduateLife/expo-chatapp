import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { ChatBubbleInfo } from './ChatBubbleInfo';

export const ChatRoomHeader = () => {
  const { contactId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View
      className="mx-2 flex-row items-center justify-between bg-white pb-4"
      style={{ paddingTop: Platform.OS === 'ios' ? 70 : 25 }}
    >
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="flex items-center justify-center rounded-full  bg-white/30 p-2"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="" />
        </TouchableOpacity>
        <Pressable
          className="flex-1 rounded-full border border-stone-200 bg-white/30 p-1.5"
          onPress={() =>
            router.push(`/chatRoom/ChatToUser.modal?contactId=${contactId}`)
          }
        >
          <ChatBubbleInfo
            userName={'Joe Done'}
            id={contactId.toString()}
            signature={'this is a signature'}
            onlineStatus={'busy'}
          />
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </View>
  );
};
