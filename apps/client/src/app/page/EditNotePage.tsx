import { NoteEditor } from '@/app/features/notes/components/NoteEditor';
import { useNoteId } from '@/app/hooks/use-note';
import { Spinner } from '@/shared/components/Spinner';
import { useParams } from 'react-router-dom';

export const EditNotePage = () => {
  const { id: noteId } = useParams(); // get notes id

  const { data, isPending, isError, error } = useNoteId(noteId);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError) return <div className="text-center">{error.message}</div>;

  return <NoteEditor note={data} />;
};
