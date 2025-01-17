import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'tamagui';
import ContactItem from '~/components/Contact/ContactItem';
const data = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
export default function Contacts() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Contacts (' + data.length + ')' });
  }, [navigation]);
  return (
    <>
      <FlatList
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return <ContactItem item={item} />;
        }}
        data={data}
      />
    </>
  );
}
