import { db } from '@/db';
import { profiles } from '@/db/schema';
import type { NewUser, User, Note } from '@/types/base.type';
import { eq } from 'drizzle-orm';

export const UsersService = {
  async getAll() {
    const data = await db.select().from(profiles);
    const count = data.length;
    return { data, count };
  },

  async findMeByToken(id: string) {
    return await db.query.profiles.findFirst({
      where: eq(profiles.id, id),
      with: {
        notes: true,
      },
    });
  },

  async getById(id: string) {
    return await db.select().from(profiles).where(eq(profiles.id, id));
  },
};
