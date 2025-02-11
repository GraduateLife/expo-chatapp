import { eq } from 'drizzle-orm';
import { contactsTable } from './schemas';
import { getDbAsync } from './util';

export class ContactUtil {
  static async getAllContacts(userId: string) {
    const db = await getDbAsync();
    const contacts = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.userId, userId))
      .orderBy(contactsTable.lastSeenDate);

    return contacts;
  }
}
