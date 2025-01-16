import { Link } from 'expo-router';
import { ListItem } from 'tamagui';

export default function ContactItem({ item }: { item: any }) {
  return (
    <Link asChild href={`/chatRoom/${item}`}>
      <ListItem hoverTheme pressTheme>
        {item}
      </ListItem>
    </Link>
  );
}
