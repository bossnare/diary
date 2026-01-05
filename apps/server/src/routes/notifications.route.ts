import Elysia, { t } from 'elysia';
import { NotificationService } from '@/services/notifications.service';
import jwt from 'jsonwebtoken';

export const notificationsRoute = new Elysia({
  prefix: '/notifications',
}).get('/', async ({ set }) => {
  const { data, count } = await NotificationService.getAll();
  set.status = 200;

  return {
    success: true,
    timestamp: Date.now(),
    count,
    data,
  };
});
