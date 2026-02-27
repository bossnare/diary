import * as taskApi from '@/app/api/task.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import * as Task from '@/app/types/task.type';

export function useTask() {
  return useQuery<Task.TaskInterface[], AxiosError>({
    queryKey: ['tasks'],
    queryFn: () => taskApi.findAll(),
    staleTime: 0,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Task.Create) => taskApi.createTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateToggle() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Task.UpdateToggle }) =>
      taskApi.updateToggle(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
