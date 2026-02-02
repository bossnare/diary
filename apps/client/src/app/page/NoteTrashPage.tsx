import { IconCheck, IconTrash } from '@tabler/icons-react';
import { NoteList } from '../features/notes/components/NoteList';
import { useNoteTrash, useRestoreMany, useDeleteMany } from '../hooks/use-note';
import { Spinner } from '@/shared/components/Spinner';
import { ErrorState } from '../components/ErrorState';
import { EmptyEmpty as EmptyTrash } from '../features/ui/Empty';
import { Button } from '@/components/ui/button';
import { ListCheck, RotateCcw, Trash, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../lib/utils';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { Portal } from '@radix-ui/react-portal';
import { ToolbarButton as SelectionModeToolbarButton } from '../features/ui/ToolbarButton';
import { ConfirmDialog } from '../features/ui/ConfirmDialog';
import { ConfirmDrawer } from '../features/ui/ConfirmDrawer';
import { toast } from 'sonner';

export function NoteTrashPage() {
  const { data, isPending, isError, error, refetch } = useNoteTrash();
  const trash = data?.data ?? [];

  // api
  const restoreMany = useRestoreMany();
  const deleteMany = useDeleteMany();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  const buttonXSize = useButtonSize({ mobile: 'icon-xl', landscape: 'icon' });
  const selectionModeLabelItem: {
    label: string;
    icon: React.ElementType;
    key: 'delete' | 'move';
  }[] = [
    {
      label: 'Restore',
      key: 'move',
      icon: RotateCcw,
    },
    {
      label: 'Remove',
      key: 'delete',
      icon: Trash,
    },
  ];

  const {
    isOpen: isSelectionMode,
    open: openSelectionMode,
    close: closeSelectionMode,
  } = useQueryToggle({ key: 'selection', value: 'trash' });

  const { isOpen: isOpenMobileSidebar } = useQueryToggle({
    key: 'sidebar',
    value: 'mobile',
  });

  const {
    isOpen: isOpenDeleteConfirm,
    open: openDeleteConfirm,
    close: closeDeleteConfirm,
  } = useQueryToggle({ key: 'confirm', value: 'deletetrash' });

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const isAllSelected = selected.size === trash.map((n) => n.id).length;
  const isHasSellected = selected.size > 0;

  const toggleSelect = (notesId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(notesId) ? next.delete(notesId) : next.add(notesId);
      return next;
    });
  };

  const toggleSelectAll = (allNotesId: string[]) => {
    setSelected((prev) => {
      const isAllSelected = prev.size === allNotesId.length;
      if (isAllSelected) {
        return new Set(); // clear all
      }
      return new Set(allNotesId); // set all
    });
  };

  const handleRemove = async () => {
    try {
      const deletedNotes = await deleteMany.mutateAsync([...selected]);
      toast(deletedNotes.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestore = async () => {
    try {
      const restoredNotes = await restoreMany.mutateAsync({
        idsToRestore: [...selected],
      });
      toast(restoredNotes.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectionModeAction = (key: 'move' | 'delete') => {
    switch (key) {
      case 'move':
        handleRestore();
        break;
      case 'delete':
        openDeleteConfirm();
        break;
    }
  };

  const deleteConfirmTitle =
    selected.size > 1
      ? `Remove notes permanently`
      : 'Remove this note permanently';
  const deleteConfirmDescription =
    selected.size > 1
      ? `These notes will be permanently removed and cannot be recovered. This action will erase them from trash forever. Are you sure want to continue?`
      : `This note will be permanently removed and cannot be recovered. This action will erase this from trash forever. Are you sure want to continue?`;
  const deleteConfirmLabel =
    selected.size > 1 ? `Remove (${selected.size})` : 'Remove';

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner />
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  if (trash?.length < 1)
    return (
      <div className="py-4">
        <EmptyTrash
          icon={IconTrash}
          title="No Trash Yet"
          description="You haven't any notes trash yet."
          noAction
        />
      </div>
    );

  return (
    <>
      <ConfirmDrawer
        showOn="mobile"
        title={deleteConfirmTitle}
        description={deleteConfirmDescription}
        confirmLabel={deleteConfirmLabel}
        isOpen={isOpenDeleteConfirm}
        onClose={closeDeleteConfirm}
        buttonVariant={'destructive'}
        onConfirm={() => {
          handleRemove();
          closeSelectionMode();
        }}
      />
      {/* confirm dialog - desktop only */}
      <ConfirmDialog
        showOn="desktop"
        title={deleteConfirmTitle}
        description={deleteConfirmDescription}
        confirmLabel={deleteConfirmLabel}
        isOpen={isOpenDeleteConfirm}
        onClose={closeDeleteConfirm}
        buttonVariant={'destructive'}
        onConfirm={() => {
          handleRemove();
          closeSelectionMode();
        }}
      />
      <div className="relative px-3 pb-2 md:px-6 bg-muted dark:bg-background">
        {/* subtle overlay */}
        <div className="absolute inset-0 z-20 hidden pointer-events-none dark:block bg-primary/2"></div>

        <header className="sticky top-0 z-10 flex items-center justify-between gap-10 pt-8 pb-2 pr-2 bg-muted dark:bg-background">
          <div className="flex items-center gap-2">
            {isSelectionMode ? (
              <Button
                size={buttonXSize}
                onClick={closeSelectionMode}
                variant="ghost"
              >
                <X />
              </Button>
            ) : (
              <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                Trash ({data.count})
              </h3>
            )}
            {isSelectionMode && (
              <span className="hidden text-foreground/80 md:block">
                {isAllSelected ? 'All' : selected.size} items selected
              </span>
            )}
          </div>

          {/* desktop toolbar */}
          <div className="justify-end hidden gap-2 md:flex grow">
            <SelectionModeToolbarButton
              onAction={handleSelectionModeAction}
              disabled={!isHasSellected}
              labelItems={selectionModeLabelItem}
            />
          </div>

          <div>
            {isSelectionMode ? (
              <div
                onClick={() => toggleSelectAll(trash.map((n) => n.id))}
                role="button"
                className={cn(
                  isAllSelected ? 'border-transparent' : 'border-foreground',
                  'border rounded-full trasnition active:scale-96 size-7 lg:size-6'
                )}
              >
                <div
                  className={cn(
                    isAllSelected ? 'scale-100' : 'scale-0',
                    'size-full bg-primary rounded-full flex items-center justify-center'
                  )}
                >
                  <IconCheck className="size-5 lg:size-4 text-secondary-foreground dark:text-foreground stroke-3" />
                </div>
              </div>
            ) : (
              <Button
                onClick={openSelectionMode}
                size="icon-lg"
                variant="ghost"
              >
                <ListCheck />
              </Button>
            )}
          </div>
        </header>
        {isSelectionMode ? (
          <span className="block px-2 py-3 text-2xl text-foreground/80 md:hidden">
            {isAllSelected ? 'All' : selected.size} items selected
          </span>
        ) : (
          <p
            ref={ref}
            className={cn(
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-10 translate-y-2',
              'w-full py-2 text-sm text-muted-foreground transition duration-600'
            )}
          >
            Notes moved to trash are kept for 30 days before being permanently
            deleted.
          </p>
        )}
        <main className="w-full min-h-screen">
          <NoteList
            variant="trash"
            notes={trash}
            isSelectionMode={isSelectionMode}
            selected={selected}
            toggleSelect={toggleSelect}
          />
        </main>
      </div>

      {/* mobile toolbar */}
      <Portal>
        {!isOpenMobileSidebar && isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0! flex items-center h-16 px-4 md:hidden z-22"
          >
            <div className="flex justify-center w-full gap-2">
              <SelectionModeToolbarButton
                onAction={handleSelectionModeAction}
                disabled={!isHasSellected}
                labelItems={selectionModeLabelItem}
              />
            </div>
          </motion.div>
        )}
      </Portal>
    </>
  );
}
