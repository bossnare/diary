import { IconTrash } from '@tabler/icons-react';
import { NoteList } from '../features/notes/components/NoteList';
import { useNoteTrash } from '../hooks/use-note';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorState } from '../components/ErrorState';
import { EmptyEmpty as EmptyTrash } from '../features/ui/Empty';

export function NoteTrashPage() {
  const { data: notes, isPending, isError, error, refetch } = useNoteTrash();
  const trash = notes ?? [];
  console.log(notes);

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner />
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  if (trash?.length < 1)
    return (
      <div className="py-4">
        <EmptyTrash
          icon={IconTrash}
          title="No Trash Yet"
          description="You haven't any notes trash yet."
          noAction
        />
      </div>
    );

  return (
    <main className="px-3 pt-4 md:px-6 bg-muted dark:bg-transparent min-h-screen w-full">
      <NoteList notes={trash} />
    </main>
  );
}
