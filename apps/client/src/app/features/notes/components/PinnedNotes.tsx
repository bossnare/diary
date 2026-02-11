import { type SelectionManager } from '@/app/hooks/use-selection-manager';
import { NoteList } from './NoteList';
import type { NoteInterface } from '@/app/types/note.type';
import { Pin } from 'lucide-react';

type Props = {
  selection: SelectionManager;
  data: NoteInterface[];
};

export function PinnedNotes({ selection, data }: Props) {
  return (
    <section className="bg-muted dark:bg-background">
      <header className="px-1 pb-2">
        <div className="flex gap-2 items-center text-foreground/80">
          <Pin className="size-4" />
          <h3 className="font-medium tracking-tight scroll-m-20">
            Pinned notes ({data.length})
          </h3>
        </div>
      </header>
      <main>
        <NoteList variant="default" selection={selection} notes={data} />
      </main>
    </section>
  );
}
