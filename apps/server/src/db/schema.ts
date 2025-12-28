import { relations } from 'drizzle-orm';
import { authUsers } from 'drizzle-orm/supabase'; // supase users tables
import { pgTable, varchar, timestamp, text, uuid } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .primaryKey()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  avarata_url: text('avatar_url'),
});

export const notes = pgTable('notes', {
  id: varchar('id', { length: 24 }).primaryKey().$default(nanoid),
  userId: uuid('user_id').references(() => profiles.id, {
    onDelete: 'cascade',
  }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(profiles, ({ many }) => ({
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(profiles, {
    fields: [notes.userId],
    references: [profiles.id],
  }),
}));
