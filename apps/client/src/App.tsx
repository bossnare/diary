import { useState, useEffect } from 'react';
import { NotebookPenIcon } from 'lucide-react';

type Note = {
  id: string;
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/notes');
        const data = await res.json();
        setNotes(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="relative h-dvh max-h-screen">
      <nav className="sticky inset-x-0 top-0 h-12 py-2 flex items-center md:h-14 gap-1">
        <div className="p-1 rounded-full bg-blue-800">
          <div className="size-5 bg-white rounded-full"></div>
        </div>
        <h1 className="font-black text-3xl">Noti</h1>
      </nav>
      <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto px-2 grid grid-cols-4 items-start gap-2">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="h-20 text-white space-y-2">
              <h2>{note.title}</h2>
              <p className="text-gray-400">{note.content}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col col-span-full items-center gap-4 py-4">
            <NotebookPenIcon />
            <p className="text-gray-400">All notes not found yet!</p>
            <button className="bg-blue-800 h-10 px-4 rounded-md flex items-center">
              Create one
            </button>
          </div>
        )}
      </div>

      <nav className="fixed inset-x-0 bottom-0">
        I&apos;m a fixed bottom navigation{' '}
      </nav>
    </div>
  );
}

export default App;
