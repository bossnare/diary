import type { JSONContent } from '@tiptap/react';

export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  jsonContent: JSONContent;
  edited: boolean;
  numberOfEdits: number;
  status: string;
  userId: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type Create = {
  title: string;
  content: string;
  jsonContent: JSONContent;
  color?: string;
};

export type Update = Partial<NoteInterface>; // for softDelete, updateNote, ...
