import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface } from '@/app/types/note.interface';

import { useQuery, useQueryClient } from '@tanstack/react-query';

type NoteResponse = {
  data: NoteInterface[];
};

export function useMe() {
  return useQuery<NoteResponse>({
    queryKey: ['notes'],
    queryFn: async () => fetcher('/notes'),
    staleTime: 5 * 1000, // 5 sec
    cacheTime: 1000 * 60 * 5, // 5 min
    gcTime: 2 * 60 * 100, // 2 min
    refetchOnWindowFocus: true,
  });
}

export function useMeCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NoteResponse>({
    queryKey: ['notes'],
  });
}
