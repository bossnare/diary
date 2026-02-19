import * as taskApi from '@/app/api/task.api';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { TaskInterface } from '@/app/types/task.type';

export function useTask() {
  return useQuery<TaskInterface[], AxiosError>({
    queryKey: ['tasks'],
    queryFn: () => taskApi.findAll(),
    staleTime: 0,
  });
}
