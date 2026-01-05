import { db } from '@/db';
import { notifications } from '@/db/schema';

export const NotificationService = {
  async getAll() {
    const data = await db.select().from(notifications);
    const count = data.length;
    return { data, count };
  },
};
