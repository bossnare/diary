import { ErrorState } from '@/app/components/ErrorState';
import type { UseHomeNoteReturn } from '@/app/hooks/use-note';
import { useNoteActions } from '@/app/hooks/use-note-action';
import type { NoteInterface } from '@/app/types/note.type';
import empty_note from '@/assets/empty_note.svg';
import { Spinner } from '@/shared/components/Spinner';
import { IconNote } from '@tabler/icons-react';
import { EmptyEmpty as EmptyNotes } from '../../ui/Empty';

type Props = {
  api: UseHomeNoteReturn;
  children: React.ReactNode;
  allData: NoteInterface[];
};

export const NotePanel = ({ children, api, allData }: Props) => {
  const { openNewNote, pasteFromClipboard } = useNoteActions();

  if (api.isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner />
      </div>
    );

  if (api.isError)
    return <ErrorState error={api.error} onRetry={api.refetch} />;

  if (allData?.length < 1)
    return (
      <div className="py-4">
        <EmptyNotes
          illustration={empty_note}
          icon={IconNote}
          title="No Notes Yet"
          description="You haven't created any notes yet. Get started by creating your first notes."
          primaryLabel="Create Note"
          secondaryLabel="Paste from Clipboard"
          onPrimaryAction={openNewNote}
          onSecondaryAction={pasteFromClipboard}
        />
      </div>
    );

  return <>{children}</>;
};
