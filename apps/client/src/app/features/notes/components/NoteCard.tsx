import { dateUltraFormat } from '@/app/lib/date-format';
import { cn } from '@/app/lib/utils';
import type { NoteInterface } from '@/app/types/note.type';
import { addDays, differenceInDays } from 'date-fns';
import { Pin } from 'lucide-react';

export type NoteCardVariant = 'default' | 'trash' | 'archived';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  note: NoteInterface;
  variant?: NoteCardVariant;
};

export const NoteCard = ({
  className,
  children,
  note,
  variant = 'default',
  ...props
}: Props) => {
  const isTrash = variant === 'trash';
  const cardVariantMap: Record<
    NoteCardVariant,
    {
      readonly: boolean;
      showActions: boolean;
      dateField: 'updatedAt' | 'deletedAt';
    }
  > = {
    default: {
      readonly: false,
      showActions: true,
      dateField: 'updatedAt',
    },
    trash: {
      readonly: true,
      showActions: false,
      dateField: 'deletedAt',
    },
    archived: {
      readonly: true,
      showActions: false,
      dateField: 'updatedAt',
    },
  };

  const config = cardVariantMap[variant];

  const lineClampContent = {
    default: 'line-clamp-5 lg:line-clamp-1',
    trash: 'line-clamp-2 lg:line-clamp-1',
    archived: 'line-clamp-3 lg:line-clamp-1',
  };

  const TRASH_DAY = 30; // jours
  const expiresAt = addDays(new Date(note.deletedAt), TRASH_DAY);
  const daysLeft = differenceInDays(expiresAt, new Date());
  const daysLeftColor =
    daysLeft <= 3
      ? 'text-destructive'
      : daysLeft <= 10
        ? 'text-[#FFB302]'
        : 'text-chart-2';

  return (
    <div
      className={cn(
        'relative flex flex-col font-inter gap-4 p-4 transition cursor-pointer select-none bg-background group active:scale-99 lg:active:scale-100 dark:shadow-none hover:bg-background/80 dark:hover:bg-muted active:opacity-60 dark:bg-muted/80 lg:shadow-sm rounded-2xl lg:rounded-xl',
        className
      )}
      {...props}
    >
      <span className="text-lg w-[90%] font-bold truncate md:text-base line-clamp-1 text-wrap">
        {note.title || 'Untitled'}
      </span>
      <span
        className={cn(
          'truncate transition-colors group-active:text-foreground text-foreground/80 text-wrap md:text-sm',
          lineClampContent[variant]
        )}
      >
        {note.content}
      </span>
      {/* metadata */}
      <div className="text-[13px] mt-auto text-muted-foreground flex flex-col gap-2">
        <span className="flex items-center gap-2">
          {isTrash && 'Trashed:'} {dateUltraFormat(note[config.dateField])}
          {variant == 'default' && note.pinned && (
            <span className="inline-flex text-chart-2">
              <Pin className="size-3 rotate-40" />
            </span>
          )}
        </span>

        {isTrash && (
          <>
            {daysLeft > 0 ? (
              <span>
                Deleting in{' '}
                <span className={`${daysLeftColor}`}>{daysLeft} days</span>
              </span>
            ) : (
              <span>
                Deleting <span className={`${daysLeftColor}`}>today</span>
              </span>
            )}
          </>
        )}
      </div>

      {children}
    </div>
  );
};
