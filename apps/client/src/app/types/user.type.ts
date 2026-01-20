import { type NoteInterface } from './note.type';

export interface UserInterface {
  pseudo: string;
  role: string;
  username: string;
  displayName: string;
  themeMode: string;
  email: string;
  id: string;
  notes: NoteInterface[];
  createdAt: string;
  updatedAt: string;
}
