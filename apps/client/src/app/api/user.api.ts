import { fetcher } from '@/app/lib/fetcher';
import type { UserInterface } from '@/app/types/user.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => fetcher('/fake/me'),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMeCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<UserInterface>({
    queryKey: ['me'],
  });
}
