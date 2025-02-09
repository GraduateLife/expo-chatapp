import { Button } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import { clearDatabase } from '~/localStorage/util';

export default function Contacts() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Account</Text>
      <Button onPress={clearDatabase}>
        <Text>Clear Database</Text>
      </Button>
    </View>
  );
}
