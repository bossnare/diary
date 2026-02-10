import { useEffect, useState } from 'react';
import * as Note from '@/app/types/note.type';
import * as NoteApi from '@/app/api/note.api';

export const useAutoSave = (
  enabled: boolean,
  body: { id: string; data: Note.Update },
  delay: number = 800
) => {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (!enabled || !body) {
      setStatus('idle');
      return;
    }

    setStatus('saving');

    const handler = setTimeout(async () => {
      try {
        await NoteApi.updateNote(body.id, body.data);
        setStatus('saved');
      } finally {
        setStatus('idle');
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, body, enabled]);

  return status;
};
