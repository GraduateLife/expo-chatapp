import { Ionicons } from '@expo/vector-icons';
import { Input } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatBubbleInfo } from '~/components/ChatRoom/ChatBubbleInfo';
import { Conversation } from '~/components/ChatRoom/Conversation';
import { AspectRatio } from '~/components/Common/AspectRatio';
import { cn, formatFileSize, getImageAspectRatio } from '~/components/ui/utils';
import { useInputStore } from '~/store/inputStore';
import { useMessageStore } from '~/store/messageStore';

const Header = () => {
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

export default function ChatRoom() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View className="flex-1 bg-white">
        <Header />
        <View className="flex-1">
          <Conversation />
        </View>
        <View className="w-full bg-white">
          <InputArea />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const ImagePreviewer = () => {
  const {
    imageUri,
    imageHeight,
    imageWidth,
    imageType,
    imageFileSize,
    setImageProperties,
  } = useMessageStore();
  if (!imageUri) return null;
  return (
    <View className=" bg-stone-100/90">
      <View className="flex-row items-center justify-between">
        <View className="relative h-[50px]  ">
          <AspectRatio
            ratio={getImageAspectRatio(imageWidth, imageHeight)}
            className={`h-[50px]`}
          >
            <Image source={{ uri: imageUri }} className="h-full w-full" />
          </AspectRatio>
        </View>
        <View className="flex-1 pl-3">
          <Text className="text-md text-stone-500">{`Type: ${imageType}`}</Text>
          <Text className="text-md text-stone-500">{`Size: ${formatFileSize(imageFileSize)}`}</Text>
          <Text className="text-md text-stone-500">{`Ratio: ${getImageAspectRatio(imageWidth, imageHeight)} (${imageWidth}px x ${imageHeight}px)`}</Text>
        </View>
        <TouchableOpacity
          className="mr-2 rounded-full bg-blue-500/30 p-1"
          onPress={() => setImageProperties(null)}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PhotoPicker = () => {
  const { setImageProperties } = useMessageStore();
  const { setInputFocused } = useInputStore();

  const pickImage = async () => {
    // Dismiss keyboard and reset focus
    Keyboard.dismiss();
    setInputFocused(false);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageProperties({
        uri: asset.uri,
        height: asset.height,
        width: asset.width,
        type: asset.mimeType,
        fileSize: asset.fileSize,
      });
    }
  };

  return (
    <TouchableOpacity
      className="rounded-full bg-blue-500 p-2"
      onPress={pickImage}
    >
      <Ionicons name="image" size={24} color="white" />
    </TouchableOpacity>
  );
};

const InputArea = () => {
  const { message, setMessage, imageUri, setImageProperties } =
    useMessageStore();
  const { isInputFocused, setInputFocused } = useInputStore();

  const getMarginBottom = () => {
    if (isInputFocused) return 'mb-0';
    if (imageUri) return 'mb-12';
    return 'mb-6';
  };

  const handleSendMessage = () => {
    // Add your send message logic here
    if (imageUri) {
      console.log('send image', imageUri);
    }
    console.log('send message', message);
    // After successful upload/send:
    useMessageStore.getState().reset();
  };

  return (
    <View
      className={cn(`w-full border-t border-stone-100 ${getMarginBottom()}`)}
    >
      <View
        className={cn(
          `mx-4 my-2 flex-row items-center justify-between gap-2 rounded-full border border-stone-200 bg-white p-2 ${
            isInputFocused ? 'border-orange-500' : ''
          }`
        )}
      >
        <PhotoPicker />
        <Input
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={{ flex: 1 }}
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Write a message..."
        />
        <TouchableOpacity
          className={cn`rounded-full bg-blue-500 p-2 ${!message ? 'opacity-50' : ''}`}
          onPress={handleSendMessage}
          disabled={!message}
        >
          <Ionicons name="send" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <ImagePreviewer />
    </View>
  );
};
