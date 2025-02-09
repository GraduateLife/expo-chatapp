import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Contacts table
export const contactsTable = sqliteTable('contacts_table', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull(),
  avatarUrl: text('avatar_url'),
  lastSeenDate: integer('last_seen_date', { mode: 'timestamp' }).notNull(),
  lastConversationId: text('last_conversation_id'),
  signature: text('signature').notNull(),
  userStatus: text('user_status', {
    enum: ['online', 'offline', 'busy', 'typing'],
  }).notNull(),
});

// Messages table
export const messagesTable = sqliteTable('messages_table', {
  messageId: text('message_id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => contactsTable.userId),
  conversationId: text('conversation_id')
    .notNull()
    .references(() => conversationsTable.conversationId),
  textContent: text('text_content').notNull(),
  sendAtDate: integer('send_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  imageUrl: text('image_url'),
  isViewed: integer('is_viewed', { mode: 'boolean' }).notNull().default(false),
});

// Conversations table
export const conversationsTable = sqliteTable('conversations_table', {
  conversationId: text('conversation_id').primaryKey(),
  createdByUser: text('created_by_user')
    .notNull()
    .references(() => contactsTable.userId),
  title: text('title'),
  createdAt: integer('created_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  lastMessageId: text('last_message_id'),
});
