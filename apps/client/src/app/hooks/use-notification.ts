import * as notificationApi from '@/app/features/notifications/services/api/notification.api';
import type { NotificationInterface } from '@/app/types/notification.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useNotification() {
  return useQuery<NotificationInterface[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.findAll(),
  });
}

export function useNotificationCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NotificationInterface[]>({
    queryKey: ['notifications'],
  });
}
