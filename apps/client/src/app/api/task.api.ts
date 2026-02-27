import api from '../lib/api';
import { fetcher } from '../lib/fetcher';
import * as Task from '@/app/types/task.type';

export const findAll = async () => {
  const res = await fetcher('tasks');

  return res.data;
};

export const createTask = async (body: Task.Create) => {
  const res = await api.post('/tasks', body);

  return res.data;
};

export const updateToggle = async (id: string, body: Task.UpdateToggle) => {
  const res = await api.patch(`/tasks/${id}`, body);

  return res.data;
};
