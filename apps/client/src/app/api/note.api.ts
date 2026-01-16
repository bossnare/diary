import api from '../lib/api';
import type { NoteInterface, CreateNote } from '../types/note.interface';

export const createNote = async (data: CreateNote) => {
  const res = await api.post('/notes', data);

  return res.data;
};

export const updateNote = async (id: string, data: NoteInterface) => {
  const res = await api.patch(`/notes/${id}`, data);

  return res.data;
};

export const updateManyNote = async (dataId: string[]) => {
  const res = await api.patch('/notes', {
    ids: dataId,
  });

  return res.data;
};

export const softDeleteOne = async (id: string) => {
  const res = await api.patch(`/notes/${id}`);

  return res.data;
};

export const softDeleteMany = async (data: Record<string, string[]>) => {
  const res = await api.patch('/notes', data);

  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);

  return res.data;
};
// export const deleteManyNote = (dataId: string[]) =>
//   api.delete('/notes', {
//     ids: dataId,
//   });
