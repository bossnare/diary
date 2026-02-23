import type * as Note from '@/app/types/note.type';

import * as noteApi from '@/app/api/note.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AxiosError } from 'axios';

export function useNote() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? 'updatedAt';
  const order = searchParams.get('order') ?? 'desc';
  const params = new URLSearchParams();
  params.set('sort', sort);
  params.set('order', order);

  return useQuery<Note.NoteInterface[], AxiosError>({
    queryKey: ['notes', sort, order],
    queryFn: () => noteApi.getAllNotes(params),
    staleTime: 0,
  });
}

export function useHomeNote() {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') ?? 8;
  const params = new URLSearchParams();
  params.set('limit', String(limit));

  return useQuery<
    {
      pinned: Note.NoteInterface[];
      recent: Note.NoteInterface[];
      meta: { total: number; recent: number; pinned: number };
    },
    AxiosError
  >({
    queryKey: ['notes', limit],
    queryFn: () => noteApi.getHomeNotes(params),
    staleTime: 0,
  });
}

export const useNoteTrash = () => {
  return useQuery<{ count: number; data: Note.NoteInterface[] }, AxiosError>({
    queryKey: ['notes-trash'],
    queryFn: () => noteApi.getAllNotesTrash(),
    staleTime: 0,
  });
};

export function useNoteId(id?: string) {
  return useQuery<Note.NoteInterface, AxiosError>({
    queryKey: ['notes', id],
    queryFn: () => noteApi.getNoteById(id),
    enabled: !!id,
    staleTime: 0,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data: Note.Create) => noteApi.createNote(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return create;
}

export function useUpdateNote() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Note.Update }) =>
      noteApi.updateNote(id, data),
    onSuccess: (data, { id }) => {
      qc.invalidateQueries({ queryKey: ['notes', id] }, data);
    },
  });
}

export function useBulkPinned() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, data }: { ids: string[]; data: Note.Update }) =>
      noteApi.bulkPinned(ids, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useSoftDeleteMany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, string[]>) =>
      noteApi.softDeleteMany(data),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ['notes'] });
    },
  });
}

export function useRestoreMany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, string[]>) => noteApi.restoreMany(data),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ['notes-trash'] });
    },
  });
}

export function useDeleteMany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: string[]) => noteApi.deleteMany(data),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ['notes-trash'] });
    },
  });
}

export function useNoteCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<Note.NoteInterface[]>({
    queryKey: ['notes'],
  });
}

export type UseHomeNoteReturn = ReturnType<typeof useHomeNote>;
