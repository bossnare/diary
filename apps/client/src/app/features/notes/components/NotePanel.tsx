import { Spinner } from '@/shared/components/Spinner';
import { AndroidSpinner } from '@/shared/components/AndroidSpinner';
import type { UseHomeNoteReturn } from '@/app/hooks/use-note';
import { ErrorState } from '@/app/components/ErrorState';
import { useNoteServices } from '@/app/hooks/use-note-service';
import type { NoteInterface } from '@/app/types/note.type';
import { EmptyEmpty as EmptyNotes } from '../../ui/Empty';
import empty_note from '@/assets/empty_note.svg';
import { IconNote } from '@tabler/icons-react';

type Props = {
  api: UseHomeNoteReturn;
  children: React.ReactNode;
  allData: NoteInterface[];
};

export const NotePanel = ({ children, api, allData }: Props) => {
  const { openNewNote, pasteFromClipboard } = useNoteServices();

  if (api.isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <AndroidSpinner />
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
