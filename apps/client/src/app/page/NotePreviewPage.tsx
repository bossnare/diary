import { useParams } from 'react-router-dom';
import { useNoteId } from '../hooks/use-note';
import { NoteEditor } from '../features/notes/components/NoteEditor';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorState } from '../components/ErrorState';

export function NotePreviewPage() {
  const { id: noteId } = useParams(); // get notes id

  const { data: note, isPending, isError, error, refetch } = useNoteId(noteId);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return <NoteEditor note={note} mode="preview" />;
}
