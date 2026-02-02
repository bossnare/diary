import { IconTrash } from '@tabler/icons-react';
import { NoteList } from '../features/notes/components/NoteList';
import { useNoteTrash } from '../hooks/use-note';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorState } from '../components/ErrorState';
import { EmptyEmpty as EmptyTrash } from '../features/ui/Empty';

export function NoteTrashPage() {
  const { data, isPending, isError, error, refetch } = useNoteTrash();
  const trash = data?.data ?? [];

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
    <div className="px-3 md:px-6">
      <header className="pt-8 pb-2">
        <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
          Trash ({data.count})
        </h3>
      </header>
      <main className="bg-muted dark:bg-transparent min-h-screen w-full">
        <NoteList variant="trash" notes={trash} />
      </main>
    </div>
  );
}
