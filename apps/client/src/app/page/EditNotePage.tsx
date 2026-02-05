import { NoteEditor } from '@/app/features/notes/components/NoteEditor';
import { useNoteId } from '@/app/hooks/use-note';
import { Spinner } from '@/shared/components/Spinner';
import { useParams } from 'react-router-dom';
import { ErrorState } from '../components/ErrorState';
import { NotFoundData } from '../components/NotFoundData';

export const EditNotePage = () => {
  const { id: noteId } = useParams(); // get notes id

  const { data, isPending, isError, error, refetch } = useNoteId(noteId);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  if (!data || Object.keys(data).length === 0) return <NotFoundData />;

  return <NoteEditor note={data} />;
};
