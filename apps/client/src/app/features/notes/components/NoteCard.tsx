import { dateUltraFormat } from '@/app/lib/date-format';
import { cn } from '@/app/lib/utils';
import type { NoteInterface } from '@/app/types/note.type';

type Props = React.HTMLAttributes<HTMLDivElement> & { note: NoteInterface };

export const NoteCard = ({ className, children, note, ...props }: Props) => {
  return (
    <div
      className={cn(
        'relative flex flex-col font-inter gap-4 p-4 transition cursor-pointer select-none bg-card group active:scale-99 lg:active:scale-100 dark:shadow-none hover:bg-background/80 dark:hover:bg-muted active:opacity-60 dark:bg-muted/80 lg:shadow-sm rounded-2xl lg:rounded-xl',
        className
      )}
      {...props}
    >
      <span className="text-lg w-[90%] font-bold leading-none truncate md:text-base line-clamp-2 lg:line-clamp-1 text-wrap">
        {note.title || 'Untitled'}
      </span>
      <span className="truncate transition-colors group-active:text-foreground text-muted-foreground text-wrap md:text-sm line-clamp-4 lg:line-clamp-1">
        {note.content}
      </span>
      <span className="text-xs text-muted-foreground">
        {dateUltraFormat(note.updatedAt)}
      </span>

      {children}
    </div>
  );
};
