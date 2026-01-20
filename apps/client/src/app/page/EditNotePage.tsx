import { useParams } from 'react-router-dom';
import { NoteEditor } from '@/app/components/users/NoteEditor';
import { Spinner } from '@/shared/components/Spinner';
import { useNoteId } from '@/app/hooks/use-note';

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
