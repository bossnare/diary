import { db } from '@/db';
import {  users } from '@/db/schema';
import type { NewUser, User, Note } from '@/types/base.type';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

export const UsersService = {
  async getAll() {
    const data = await db.select().from(users);
    const count = data.length;
    return { data, count };
  },

  async findMeByToken(currentUserEmail: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, currentUserEmail),
      columns: {
        password: false,
      },
      with: {
        notes: true,
      },
    });
  },

  async getById(id: string) {
    return await db.select().from(users).where(eq(users.id, id));
  },

  async create(body: NewUser) {
    const hashedPassword = await argon2.hash(body.password);
    const user = await db
      .insert(users)
      .values({
        password: hashedPassword,
        email: body.email,
        username: body.username,
      })
      .returning(); // returning: return new data json object

    return user[0];
  },
};
