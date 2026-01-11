import { useParams } from 'react-router-dom';
import { useNoteId } from '../api/note-id.api';
import { NoteEditor } from '../components/users/NoteEditor';
import { Spinner } from '@/shared/components/Spinner';

export const EditNotePage = () => {
  const { id: noteId } = useParams(); // get notes id

  const { data, isPending, isError, error } = useNoteId(noteId);
  console.log(data?.title);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError) return <div className="text-center">{error.message}</div>;

  return <NoteEditor note={data} />;
};
