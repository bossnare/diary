import { type SelectionManager } from '@/app/hooks/use-selection-manager';
import { NoteList } from './NoteList';
import type { NoteInterface } from '@/app/types/note.type';

type Props = {
  selection: SelectionManager;
  data: NoteInterface[];
};

export function RecentNotes({ selection, data }: Props) {
  return (
    <section className="bg-muted dark:bg-background">
      <header className="px-1 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium tracking-tight text-foreground/80 scroll-m-20">
            Recents
          </h3>
        </div>
      </header>
      <main>
        <NoteList selection={selection} notes={data} />
      </main>
    </section>
  );
}
