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
} from 'react-native';
import { ChatBubble } from '~/components/ChatRoom/ChatBubble';
import { ChatBubbleInfo } from '~/components/ChatRoom/ChatBubbleInfo';
import { cn, formatDay } from '~/components/ui/utils';
import { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useImageStore } from '~/store/imageStore';
import { AspectRatio } from '~/components/Common/AspectRatio';

type Message = {
  userId: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
};

const mockMessages: Message[] = [
  {
    userId: '1',
    message: 'Hello',
    isUser: true,
    timestamp: new Date('2025-01-23T12:00:00Z'),
    imageUrl:
      'file:///Users/zhangyuntao/Library/Developer/CoreSimulator/Devices/0D77DB80-9C90-4606-9C19-272A5CBBDE04/data/Containers/Data/Application/87E8C0FD-1156-417C-857D-CBE53F8BB323/Library/Caches/ExponentExperienceData/@anonymous/expo-chatapp-mb-352ed4b5-0782-4685-823b-626983162222/ImagePicker/B53D7D6C-20B2-4A7E-A047-EFD2F552C310.jpg',
  },
  {
    userId: '2',
    message: 'Hello',
    isUser: false,
    timestamp: new Date('2025-01-23T12:00:00Z'),
  },
];

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
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const [message, setMessage] = useState<string>('');

  const selectedImage = useImageStore((state) => state.selectedImage);
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = () => {
    console.log(selectedImage);
    const newMessage: Message = {
      userId: '1',
      message: message,
      isUser: true,
      timestamp: new Date(),
      imageUrl: selectedImage ?? undefined,
    };
    console.log(newMessage);
    mockMessages.push(newMessage);
    setMessage('');
    setSelectedImage(null);
  };

  return (
    <>
      <View className="flex-1 bg-white pb-[80px]">
        <Header />
        <KeyboardAvoidingView behavior="padding" className="flex-1" keyboardVerticalOffset={10}>
          <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 70 }}>
            <Text className="text-center text-sm text-stone-500">
              {formatDay(mockMessages[0].timestamp)}
            </Text>
            {mockMessages.map((message) => (
              <ChatBubble
                key={message.userId + message.timestamp.getTime()}
                message={message.message}
                isUser={message.isUser}
                imageUrl={message.imageUrl}
              />
            ))}
          </ScrollView>
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
          <View className="mx-4 flex-row items-center justify-between gap-2">
            <PhotoPicker />
            <Input
              ref={inputRef}
              style={{ flex: 1 }}
              onChangeText={(text) => setMessage(text)}
              value={message}
              placeholder="Write a message..."
              onFocus={() => scrollToBottom()}
            />
            <TouchableOpacity
              className={cn`rounded-full bg-blue-500 p-2 ${!message ? 'opacity-50' : ''}`}
              onPress={handleSendMessage}
              disabled={!message}>
              <Ionicons name="send" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const PhotoPicker = () => {
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);

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
