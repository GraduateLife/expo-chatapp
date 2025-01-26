import { Button, Input } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';

import { AspectRatio } from '~/components/Common/AspectRatio';

export default function ReadyToSendImageModal() {
  const router = useRouter();
  const { image, contactId } = useLocalSearchParams() as {
    image: string;
    contactId: string;
  };
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    return () => {
      // This will be called when the component unmounts (modal closes)
      console.log('Modal closed');
    };
  }, []);

  const handleSend = () => {
    setMessage('');
    router.back();
  };
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View className="p-4">
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <AspectRatio ratio={4 / 3}>
            <Image source={{ uri: image }} className="h-full" />
          </AspectRatio>
          <Text className="text-md m-4">Send to {contactId}</Text>
          <Text className="text-md m-4">
            Do you want say something about it?
          </Text>
          <Input
            multiline
            numberOfLines={message.length > 30 ? 2 : undefined}
            onChangeText={setMessage}
            value={message}
            style={{ marginBottom: 10, minHeight: 40 }}
          />
          <Button onPress={handleSend}>Send</Button>
        </KeyboardAvoidingView>
      </View>
    </Pressable>
  );
}
