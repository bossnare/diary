import { useLongPress } from '@/app/hooks/use-long-press';
import type { SelectionManager } from '@/app/hooks/use-selection-manager';
import { cn } from '@/app/lib/utils';
import type { NoteToolbarItem, NoteActionKey } from '@/app/types/label.type';
import type { NoteInterface } from '@/app/types/note.type';
import { Button } from '@/components/ui/button';
import { handleWait } from '@/shared/utils/handle-wait';
import { IconCheck } from '@tabler/icons-react';
import { Ellipsis, FolderSymlink, Lock, Pin, Trash } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { DropDown as DropDownNoteCard } from '../../ui/DropDown';
import { ToolbarButton as NoteCardToolbarButton } from '../../ui/ToolbarButton';
import { NoteCard, type NoteCardVariant } from './NoteCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  selection?: SelectionManager;
  notes?: NoteInterface[];
  variant?: NoteCardVariant;
};

const NoteToolbarItemItem: NoteToolbarItem[] = [
  {
    label: 'Lock',
    icon: Lock,
    key: 'move',
  },
  {
    label: 'Move to',
    icon: FolderSymlink,
    key: 'move',
  },
  {
    label: 'Pin',
    icon: Pin,
    key: 'pin',
  },
  {
    label: 'Delete',
    icon: Trash,
    key: 'delete',
  },
];

export function NoteList({ selection, notes, variant, className }: Props) {
  const navigate = useNavigate();
  const longPress = useLongPress({
    onLongPress: (id: string) => {
      selection?.openSelectionMode?.();
      selection?.toggleSelect?.(id);
    },
  });

  // for select a notes card on mobile
  const isSelected = (notesId: string) => selection?.selected?.has(notesId);

  const handleClickNote = (noteId: string) => {
    if (variant !== 'default') {
      if (selection?.isSelectionMode) selection?.toggleSelect?.(noteId);
      else handleWait(() => navigate(`/note/${noteId}`), 250);
    } else {
      if (selection?.isSelectionMode) selection?.toggleSelect?.(noteId);
      else handleWait(() => navigate(`/note/${noteId}/edit`), 250);
    }
  };

  return (
    <div className={cn('pt-2', className)}>
      <AnimatePresence mode="popLayout">
        {notes?.map((note) => (
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            key={note.id}
            layout
          >
            <NoteCard
              variant={variant ?? 'default'}
              role="button"
              onTouchStart={() => longPress.handleTouchStart(note.id)}
              onClick={() => handleClickNote(note.id)}
              onTouchEnd={longPress.handleTouchEnd}
              onTouchMove={longPress.handleTouchMove}
              onTouchCancel={longPress.handleTouchCancel}
              className={cn(
                isSelected(note.id) && 'bg-card/80! dark:bg-muted!',
                'h-full! overflow-hidden'
              )}
              note={note}
            >
              {/* options toggle - desktop */}
              {!selection?.isSelectionMode && variant === 'default' && (
                <DropDownNoteCard
                  onClick={(e) => e.stopPropagation()}
                  sideOffset={12}
                  align="end"
                  showOn="desktop"
                  className="w-50 px-2"
                  trigger={
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      size="icon"
                      variant="ghost"
                      className="absolute hover:shadow-sm hidden scale-0 z-2 top-1.5 right-2 group-hover:scale-100 lg:inline-flex"
                    >
                      <Ellipsis />
                    </Button>
                  }
                >
                  <div className="flex flex-col justify-end gap-1 w-full [&_button]:justify-start">
                    <NoteCardToolbarButton<NoteActionKey>
                      onAction={() => null}
                      disabled={!note.id}
                      labelItems={NoteToolbarItemItem}
                    />
                  </div>
                </DropDownNoteCard>
              )}

              <div
                className={cn(
                  selection?.isSelectionMode ? 'scale-100' : 'scale-0',
                  'absolute z-2 bottom-3 right-3 lg:hover:bg-muted-foreground/60 size-7 lg:size-5 bg-muted-foreground/40 rounded-full transition'
                )}
              >
                <div
                  className={cn(
                    isSelected(note.id)
                      ? 'scale-100 opacity-100'
                      : 'scale-0 opacity-0',
                    'size-full flex items-center justify-center rounded-full transition bg-primary'
                  )}
                >
                  <IconCheck className="size-5 lg:size-4 text-secondary-foreground dark:text-foreground stroke-3" />
                </div>
              </div>
            </NoteCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
