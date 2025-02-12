import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';
import { botsTable, usersTable } from './schemas';
import { getDbAsync } from './util';

export const useFetchMyFriends = () => {
  return useQuery({
    queryKey: ['myFriends'],
    queryFn: async () => {
      return await ContactUtil.getMyFriends();
    },
  });
};

export class ContactUtil {
  static async getMe() {
    const db = await getDbAsync();
    const me = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.isBot, false));

    return me[0];
  }

  static async getMyFriends() {
    const db = await getDbAsync();
    const me = await ContactUtil.getMe();
    const friends = await db
      .select({
        userId: usersTable.userId,
        username: usersTable.username,
        avatarUrl: usersTable.avatarUrl,
        email: usersTable.email,
      })
      .from(botsTable)
      .innerJoin(usersTable, eq(botsTable.botId, usersTable.userId))
      .where(eq(botsTable.ownerId, me.userId));

    return friends;
  }
}
