import { fetcher } from '@/lib/fetcher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UserInterface } from '@/types/user.interface';

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
