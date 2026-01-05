import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface } from '@/app/types/note.interface';

import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useNote() {
  return useQuery<NoteInterface[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await fetcher('/notes');
      return res.data; // return {.., data}
    },
    staleTime: 3_000, // 3 sec
    // cacheTime: 1000 * 60 * 5, // 5 min
    gcTime: 2 * 60 * 100, // 2 min
    refetchOnWindowFocus: true,
  });
}

export function useNoteCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NoteInterface[]>({
    queryKey: ['notes'],
  });
}
