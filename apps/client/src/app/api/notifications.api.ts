import { fetcher } from '@/app/lib/fetcher';
import type { NotificationInterface } from '@/app/types/notification.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useNotification() {
  return useQuery<NotificationInterface[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await fetcher('/notifications');
      return res.data; // return {.., data}
    },
    staleTime: 3_000, // 3 sec
    gcTime: 5 * 60 * 100, // 5 min
    refetchOnWindowFocus: true,
  });
}

export function useNotificationCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NotificationInterface[]>({
    queryKey: ['notifications'],
  });
}
