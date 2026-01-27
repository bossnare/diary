export type SelectionActionKey = 'move' | 'delete';

export type BaseItem = {
  label: string;
  icon: React.ElementType;
};

export type SelectionActionLabel = BaseItem & {
  key: SelectionActionKey;
};

export type EditorToolbarItem = BaseItem & {
  action: () => void;
};
