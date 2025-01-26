import { ListItem } from '@ui-kitten/components';
import { Link } from 'expo-router';

export default function ContactItem({ item }: { item: any }) {
  return (
    <Link asChild href={`/chatRoom/${item}`}>
      <ListItem title={item} />
    </Link>
  );
}
