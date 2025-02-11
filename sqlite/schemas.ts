import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Messages table
export const messagesTable = sqliteTable('messages_table', {
  messageId: text('message_id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.userId),
  conversationId: text('conversation_id')
    .notNull()
    .references(() => conversationsTable.conversationId),
  sequenceNumber: integer('sequence_number').notNull(),
  textContent: text('text_content').notNull(),
  sendAtDate: integer('send_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  imageUrl: text('image_url'),
  viewedAtDate: integer('viewed_at_date', { mode: 'timestamp' }),
});

// Conversations table
export const conversationsTable = sqliteTable('conversations_table', {
  conversationId: text('conversation_id').primaryKey(),
  createdByUser: text('created_by_user')
    .notNull()
    .references(() => usersTable.userId),
  title: text('title'),
  createdAtDate: integer('created_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  lastMessageId: text('last_message_id'),
});

//FIXME: a mistake! should not store users in local!
export const usersTable = sqliteTable('users_table', {
  userId: text('user_id').primaryKey(),
  avatarUrl: text('avatar_url'),
  email: text('email').unique(),
  phone: text('phone').unique(),
  authProvider: text('auth_provider'), // OAuth provider (e.g., google, facebook)
  authProviderId: text('auth_provider_id'), // OAuth unique ID
  username: text('username').notNull(),
  createdAtDate: integer('created_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  lastActiveDate: integer('last_active', { mode: 'timestamp' }),
  timezone: text('timezone').notNull(),
  preferredLanguage: text('preferred_language').default('en'),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }), // Soft delete
});

// Bots table
export const botsTable = sqliteTable('bots_table', {
  botId: text('bot_id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  botName: text('bot_name').notNull(),
  modelName: text('model_name').notNull(),
  capabilities: text('capabilities').notNull(), // JSON string for SQLite
  createdAtDate: integer('created_at_date', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Message = typeof messagesTable.$inferSelect;
export type Conversation = typeof conversationsTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
export type Bot = typeof botsTable.$inferSelect;
