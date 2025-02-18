import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchMyFriends } from '~/sqlite/contactUtils';
import { useFetchLastConversationId } from '~/sqlite/conversationUtils';
import { User } from '~/sqlite/schemas';

export function ContactList() {
  const { isLoading, data } = useFetchMyFriends();
  console.log('fetching friends', data);
  if (isLoading || !data) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView className="pl-6 pr-4 bg-stone-100">
      <Text className="text-5xl font-bold">Amigos</Text>
      <ScrollView>
        <View className="flex-1">
          {data.map((item) => (
            <ContactItem key={item.userId} contact={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ContactItem({
  contact,
}: {
  contact: Pick<User, 'userId' | 'username' | 'avatarUrl' | 'email'>;
}) {
  const { data: lastConversationId } = useFetchLastConversationId(
    contact.userId
  );
  console.log('lastConversationId', lastConversationId);
  console.log('contact', contact.userId);
  return (
    <Link href={`/chatRoom/${contact.userId}`}>
      <View className="flex-row items-center justify-between gap-y-4 gap-x-6">
        <Image
          source={{ uri: contact.avatarUrl ?? '' }}
          className="h-16 w-16 rounded-full"
        />
        <View className="flex-1 border-b border-gray-200 ">
          <View className="gap-y-4 my-4">
            <Text className="text-xl">{contact.username}</Text>
            <Text className="text-md">{contact.email}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-x-2">
          <Text className="text-md">
            {lastConversationId ? 'chating!' : ''}
          </Text>
        </View>
      </View>
    </Link>
  );
}
