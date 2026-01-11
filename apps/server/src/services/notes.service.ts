import { db } from '@/db';
import { notes } from '@/db/schema';
import { InsertNote } from '@/types/base.type';
import { desc, eq, asc, sql } from 'drizzle-orm';
import type { NotesQueryType } from '@/types/query.type';

export const NotesService = {
  async getAll() {
    const data = await db.select().from(notes);
    const count = data.length;
    return { data, count };
  },
  async getMyAll(userId: string, query: NotesQueryType) {
    const sort = query.sort ?? 'updatedAt';
    const order = query.order ?? 'desc';

    const data = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(order === 'desc' ? desc(notes[sort]) : asc(notes[sort]));
    const count = data.length;
    return { data, count };
  },

  async getById(id: string) {
    const [data] = await db.select().from(notes).where(eq(notes.id, id));
    return data;
  },
  async create(body: InsertNote, userId: string) {
    const payload = {
      ...body,
      userId,
    };
    const [createdNote] = await db.insert(notes).values(payload).returning();

    return createdNote;
  },
  async update(body: InsertNote, id: string) {
    const payload = {
      ...body,
      updatedAt: new Date(),
      numberOfEdits: sql`${notes.numberOfEdits} + 1`, // increment
      edited: true,
    };
    const [updatedNote] = await db
      .update(notes)
      .set(payload)
      .where(eq(notes.id, id))
      .returning();

    return updatedNote;
  },
};
