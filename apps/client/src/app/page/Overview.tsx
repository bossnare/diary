import type {
  SelectionModeActionKey,
  SelectionModeLabel,
} from '@/app/types/label.type';
import empty_note from '@/assets/empty_note.svg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/shared/components/Spinner';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { Portal } from '@radix-ui/react-portal';
import { IconNote } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { FolderSymlink, ListChecks, Lock, Pin, Trash, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '../components/ErrorState';
import { NoteList } from '../features/notes/components/NoteList';
import { ConfirmDialog } from '../features/ui/ConfirmDialog';
import { ConfirmDrawer } from '../features/ui/ConfirmDrawer';
import { EmptyEmpty as EmptyNotes } from '../features/ui/Empty';
import { OverviewToolbar } from '../features/ui/OverviewToolbar';
import { SortingDrawer } from '../features/ui/SortingDrawer';
import { ToolbarButton as SelectionModeToolbarButton } from '../features/ui/ToolbarButton';
import { useNote, useSoftDeleteMany, useBulkPinned } from '../hooks/use-note';
import { useNoteServices } from '../hooks/use-note-services';
import { cn } from '../lib/utils';

function Overview() {
  const { data, isPending, isError, error, refetch } = useNote();
  const notes = data ?? [];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const isAllSelected = selected.size === notes.map((n) => n.id).length;
  const isHasSellected = selected.size > 0;

  const buttonXSize = useButtonSize({ mobile: 'icon-xl', landscape: 'icon' });
  const buttonToggleSelectAllSize = useButtonSize({
    mobile: 'icon-lg',
    landscape: 'icon',
  });

  const queryClient = useQueryClient();
  const handleRefreshNotes = () => {
    queryClient.refetchQueries({
      queryKey: ['notes'],
    });
  };

  // sorting query drawer params state - mobile only
  const {
    open: openNoteSorting,
    isOpen: isOpenNoteSorting,
    close: closeNoteSorting,
  } = useQueryToggle({ key: 'sorting', value: 'noteSorting' });
  // selection query params state
  const {
    open: openSelectionMode,
    isOpen: isSelectionMode,
    close: closeSelectionMode,
  } = useQueryToggle({
    key: 'select',
    value: 'notes',
  });

  const { isOpen: isOpenMobileSidebar } = useQueryToggle({
    key: 'sidebar',
    value: 'mobile',
  });
  // delete confirm drawer query params state - mobile only
  const {
    isOpen: isOpenDeleteConfirm,
    open: openDeleteConfirm,
    close: closeDeleteConfirm,
  } = useQueryToggle({
    key: 'ui',
    value: 'deleteNote',
  });

  // auto clear selected value on selectionMode close
  useEffect(() => {
    if (!isSelectionMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(new Set());
    }
  }, [isSelectionMode]);

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

  const { openNewNote, pasteFromClipboard } = useNoteServices();

  // toolbar label
  const selectionModeLabelItem: SelectionModeLabel[] = [
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

  const deleteConfirmTitle =
    selected.size > 1 ? `Delete notes?` : 'Delete this note?';
  const deleteConfirmDescription =
    selected.size > 1
      ? `These notes will no longer appear in your notes. You can undo this action`
      : `This notes will no longer appear in your notes. You can undo this action`;
  const deleteConfirmLabel =
    selected.size > 1 ? `Delete (${selected.size})` : 'Delete';

  const softDeleteMany = useSoftDeleteMany();
  const bulkPinned = useBulkPinned();

  const handleDelete = async () => {
    try {
      const deletedNotes = await softDeleteMany.mutateAsync({
        idsToRemove: [...selected], // transform as Array
      });

      toast(deletedNotes.message);
      console.log(deletedNotes);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePin = async () => {
    closeSelectionMode();

    try {
      const pinnedNotes = await bulkPinned.mutateAsync({
        ids: [...selected],
        data: { pinned: true },
      });
      toast.success(pinnedNotes.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectionModeAction = (actionKey: SelectionModeActionKey) => {
    switch (actionKey) {
      case 'move':
        console.log('move');
        break;
      case 'delete':
        openDeleteConfirm();
        break;
      case 'pin':
        handlePin();
        break;
    }
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner />
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  if (notes?.length < 1)
    return (
      <div className="py-4">
        <EmptyNotes
          illustration={empty_note}
          icon={IconNote}
          title="No Notes Yet"
          description="You haven't created any notes yet. Get started by creating your first notes."
          primaryLabel="Create Note"
          secondaryLabel="Paste from Clipboard"
          onPrimaryAction={openNewNote}
          onSecondaryAction={pasteFromClipboard}
        />
      </div>
    );

  return (
    <>
      <div className="relative min-h-screen pb-2 bg-muted dark:bg-background">
        {/* subtle overlay */}
        <div className="absolute inset-0 z-20 hidden pointer-events-none dark:block bg-primary/2"></div>
        {/* drawer - mobile only */}
        <ConfirmDrawer
          showOn="mobile"
          title={deleteConfirmTitle}
          description={deleteConfirmDescription}
          confirmLabel={deleteConfirmLabel}
          isOpen={isOpenDeleteConfirm}
          onClose={closeDeleteConfirm}
          buttonVariant={'secondary'}
          onConfirm={() => {
            handleDelete();
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
          buttonVariant={'secondary'}
          onConfirm={() => {
            handleDelete();
            closeSelectionMode();
          }}
        />
        <SortingDrawer
          showOn="mobile"
          isOpen={isOpenNoteSorting}
          onClose={closeNoteSorting}
        />
        {/* content */}
        <>
          <header className="sticky top-0 px-2 pt-8 mx-2 z-16 md:px-2 md:mx-5 bg-muted dark:bg-background">
            {isSelectionMode ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between pb-2 lg:gap-10"
              >
                {/* skip and info on select notes */}
                <div className="flex items-center gap-1">
                  <Button
                    onClick={closeSelectionMode}
                    size={buttonXSize}
                    variant="ghost"
                  >
                    <X />
                  </Button>
                  {/* desktop only */}
                  <span className="hidden font-medium font-inter md:inline-flex">
                    {selected.size} items selected
                  </span>
                </div>
                {/* mobile only */}
                <span className="text-xl font-medium md:hidden">
                  {selected.size} items selected
                </span>

                {/* toolbar */}
                <div className="justify-end hidden gap-2 md:flex grow">
                  <SelectionModeToolbarButton
                    onAction={handleSelectionModeAction}
                    disabled={!isHasSellected}
                    labelItems={selectionModeLabelItem}
                  />
                </div>

                {/* toggle select all button */}
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm lg:inline-flex">
                    {isAllSelected ? 'Unselect all' : 'Select all'}
                  </span>
                  <Button
                    onClick={() => toggleSelectAll(notes?.map((n) => n.id))}
                    size={buttonToggleSelectAllSize}
                    variant="ghost"
                  >
                    <ListChecks
                      className={cn(isAllSelected ? 'text-chart-2' : '')}
                    />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                  All notes
                </h3>
                <OverviewToolbar
                  openNoteSorting={openNoteSorting}
                  openSelectionMode={openSelectionMode}
                  handleRefreshNotes={handleRefreshNotes}
                />
              </div>
            )}
          </header>
          <main className="px-3 md:px-6">
            <NoteList
              selected={selected}
              isSelectionMode={isSelectionMode}
              notes={notes}
              toggleSelect={toggleSelect}
              openSelectionMode={openSelectionMode}
            />
          </main>
        </>
      </div>

      {/* mobile select toollip */}
      <Portal>
        {!isOpenMobileSidebar && isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0! flex items-center h-16 px-4 md:hidden z-22"
          >
            <div className="flex justify-between w-full">
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

export default Overview;
