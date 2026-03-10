export type NoteActionKey = 'move' | 'delete' | 'pin' | 'lock';

export type BaseItem = {
  label: string;
  icon: React.ElementType;
};

export type NoteToolbarItem = BaseItem & {
  key: NoteActionKey;
};

export type EditorToolbarItem = BaseItem & {
  action: () => void;
};
