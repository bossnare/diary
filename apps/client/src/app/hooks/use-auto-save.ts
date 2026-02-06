import { useEffect, useState } from 'react';
import * as Note from '@/app/types/note.type';
import { useUpdateNote } from './use-note';

export const useAutoSave = (
  enabled: boolean,
  body: { id: string; data: Note.Update },
  delay: number = 800
) => {
  const updateNote = useUpdateNote();
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (!enabled || !body) {
      setStatus('idle');
      return;
    }

    setStatus('saving');

    const handler = setTimeout(async () => {
      try {
        await updateNote.mutateAsync(body);
        setStatus('saved');
      } finally {
        setStatus('idle');
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, body, updateNote, enabled]);

  return status;
};
