export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  edited: boolean;
  numberOfEdits: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type Create = {
  title: string;
  content: string;
  color?: string;
};

export type Update = Partial<NoteInterface>; // for softDelete, updateNote, ...
