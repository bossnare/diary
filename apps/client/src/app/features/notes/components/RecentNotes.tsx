import { type SelectionManager } from '@/app/hooks/use-selection-manager';
import { NoteList } from './NoteList';
import type { NoteInterface } from '@/app/types/note.type';
import { Clock } from 'lucide-react';

type Props = {
  selection: SelectionManager;
  data: NoteInterface[];
};

export function RecentNotes({ selection, data }: Props) {
  return (
    <section className="bg-muted dark:bg-background">
      <header className="px-1 pb-2">
        <div className="flex items-center gap-2 text-foreground/80">
          <Clock className="size-4" />
          <h3 className="font-medium tracking-tight scroll-m-20">
            Recent ({data.length})
          </h3>
        </div>
      </header>
      <main>
        <NoteList variant="default" selection={selection} notes={data} />
      </main>
    </section>
  );
}
