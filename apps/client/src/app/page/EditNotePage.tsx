import { useParams } from 'react-router-dom';
import { useNoteId } from '../api/note-id.api';
import { NoteEditor } from '../components/users/NoteEditor';

export const EditNotePage = () => {
  const { id: noteId } = useParams(); // get notes id

  const { data, isPending, isError, error } = useNoteId(noteId);
  console.log(data?.title);

  if (isPending) return null;

  if (isError) return <div className="text-center">{error.message}</div>;

  return <NoteEditor note={data} />;
};
