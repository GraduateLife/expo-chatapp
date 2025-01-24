import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import { ChatBubble } from '~/components/ChatRoom/ChatBubble';
import { ChatBubbleInfo } from '~/components/ChatRoom/ChatBubbleInfo';
import { cn, formatDay } from '~/components/ui/utils';
import { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { AspectRatio } from '~/components/Common/AspectRatio';
import { Conversation } from '~/components/ChatRoom/Conversation';
import { useMessageStore } from '~/store/messageStore';

const Header = () => {
  const { contactId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View
      className="mx-2 flex-row items-center justify-between bg-white pb-4"
      style={{ paddingTop: Platform.OS === 'ios' ? 70 : 25 }}>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="flex items-center justify-center rounded-full  bg-white/30 p-2"
          onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="" />
        </TouchableOpacity>
        <Pressable
          className="flex-1 rounded-full border border-stone-200 bg-white/30 p-1.5"
          onPress={() => router.push(`/chatRoom/ChatToUser.modal?contactId=${contactId}`)}>
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
  const { selectedImage, setSelectedImage } = useMessageStore();

  return (
    <View className="relative flex-1 bg-white pb-[50px]">
      <Header />
      <KeyboardAvoidingView behavior="padding" className="flex-1" keyboardVerticalOffset={10}>
        <Conversation />

        {selectedImage && (
          <View className="relative mb-4 min-h-16 bg-stone-200/30">
            <AspectRatio ratio={4 / 3} className={`h-[100px]`}>
              <Image source={{ uri: selectedImage }} className="h-full w-full" />
            </AspectRatio>
            <TouchableOpacity
              className="absolute right-2 top-2 rounded-full bg-white/30 p-1"
              onPress={() => setSelectedImage(null)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
      <InputArea />
    </View>
  );
}

const PhotoPicker = () => {
  const { setSelectedImage } = useMessageStore();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <TouchableOpacity className="rounded-full bg-blue-500 p-2" onPress={pickImage}>
      <Ionicons name="image" size={24} color="white" />
    </TouchableOpacity>
  );
};

const InputArea = () => {
  const { message, setMessage, selectedImage, setSelectedImage } = useMessageStore();
  const inputRef = useRef<TextInput>(null);
  const handleSendMessage = () => {
    // Add your send message logic here
    if (selectedImage) {
      console.log('send image', selectedImage);
    }
    console.log('send message', message);
    // After successful upload/send:
    useMessageStore.getState().reset();
  };

  return (
    <>
      <View className="mx-4 mt-2 flex-row items-center justify-between gap-2">
        <PhotoPicker />
        <Input
          ref={inputRef}
          style={{ flex: 1 }}
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Write a message..."
        />
        <TouchableOpacity
          className={cn`rounded-full bg-blue-500 p-2 ${!message ? 'opacity-50' : ''}`}
          onPress={handleSendMessage}
          disabled={!message}>
          <Ionicons name="send" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    </>
  );
};
