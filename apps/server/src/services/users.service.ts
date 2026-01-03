import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const UsersService = {
  async getAll() {
    const data = await db.select().from(profiles);
    const count = data.length;
    return { data, count };
  },

  async getUserFromToken(token: string) {
    const decoded = jwt.decode(token) as { sub: string; email: string };
    return {
      id: decoded.sub,
      email: decoded.email,
    };
  },

  async getMeById(id: string) {
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
