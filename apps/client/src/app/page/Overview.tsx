import type {
  SelectionModeActionKey,
  SelectionModeLabel,
} from '@/app/types/label.type';
import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { Portal } from '@radix-ui/react-portal';
import { useQueryClient } from '@tanstack/react-query';
import { FolderSymlink, ListChecks, Lock, Pin, Trash, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../features/ui/ConfirmDialog';
import { ConfirmDrawer } from '../features/ui/ConfirmDrawer';
import { OverviewToolbar } from '../features/ui/OverviewToolbar';
import { SortingDrawer } from '../features/ui/SortingDrawer';
import { ToolbarButton as SelectionModeToolbarButton } from '../features/ui/ToolbarButton';
import {
  useBulkPinned,
  useHomeNote,
  useSoftDeleteMany,
} from '../hooks/use-note';
import { useSelectionManager } from '../hooks/use-selection-manager';
import { cn } from '../lib/utils';
import { RecentNotes } from '../features/notes/components/RecentNotes';
import { PinnedNotes } from '../features/notes/components/PinnedNotes';
import { NotePanel } from '../features/notes/components/NotePanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskList } from '../features/tasks/components/TaskList';

function Overview() {
  const useHomeNoteApi = useHomeNote();
  const { recent, pinned } = useHomeNoteApi.data ?? {
    recent: [],
    pinned: [],
  };

  const selection = useSelectionManager<string>({
    queryKey: 'selectNotes',
    initialMode: 'none',
  });

  const all = [...recent, ...pinned];
  const allNoteIds = all.map((n) => n.id);
  const isAllSelected = selection.count === allNoteIds.length;
  const selectedNotes = all.filter((n) => selection.selected.has(n.id));
  const allPinned =
    selectedNotes.length > 0 && selectedNotes.every((n) => n.pinned);

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
    isOpen: isOpenNoteSorting,
    close: closeNoteSorting,
    toggle: toggleOpenNoteSorting,
  } = useQueryToggle({ key: 'sorting', value: 'noteSorting' });

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
      label: allPinned ? 'Unpin' : 'Pin',
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
    selection.count > 1 ? `Delete notes?` : 'Delete this note?';
  const deleteConfirmDescription =
    selection.count > 1
      ? `These notes will no longer appear in your notes. You can undo this action`
      : `This notes will no longer appear in your notes. You can undo this action`;
  const deleteConfirmLabel =
    selection.count > 1 ? `Delete (${selection.count})` : 'Delete';

  const softDeleteMany = useSoftDeleteMany();
  const bulkPinned = useBulkPinned();

  const handleDelete = async () => {
    try {
      const deletedNotes = await softDeleteMany.mutateAsync({
        idsToRemove: selection.selectedArray,
      });

      toast(deletedNotes.message);
      console.log(deletedNotes);
    } catch (err) {
      console.log(err);
    }
  };

  const togglePin = async () => {
    selection.closeSelection();

    try {
      await bulkPinned.mutateAsync({
        ids: selection.selectedArray,
        data: { pinned: !allPinned },
      });
      toast.success(
        allPinned ? 'Unpinned successfully' : 'Pinned successfully'
      );
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
        togglePin();
        break;
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-muted dark:bg-background">
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
            selection.closeSelection();
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
            selection.closeSelection();
          }}
        />
        <SortingDrawer
          showOn="mobile"
          isOpen={isOpenNoteSorting}
          onClose={closeNoteSorting}
        />
        {/* content */}
        <>
          <main className="flex">
            <ScrollArea className="grow h-[calc(100dvh-120px)] md:h-[calc(100dvh-56px)]">
              <NotePanel allData={all} api={useHomeNoteApi}>
                <nav className="sticky top-0 pt-6 mx-2 z-16 md:px-2 bg-muted dark:bg-background">
                  {selection.isSelectionMode ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between pb-2 lg:gap-10"
                    >
                      {/* cancel and info on select notes */}
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={selection.closeSelection}
                          size={buttonXSize}
                          variant="ghost"
                        >
                          <X />
                        </Button>
                        {/* desktop only */}
                        <span className="hidden font-inter md:inline-flex">
                          {selection.count} items selected
                        </span>
                      </div>
                      {/* mobile only */}
                      <span className="text-xl font-medium md:hidden">
                        {selection.count} items selected
                      </span>

                      {/* toolbar */}
                      <div className="justify-end hidden gap-2 md:flex grow">
                        <SelectionModeToolbarButton
                          onAction={handleSelectionModeAction}
                          disabled={!selection.isHasSelected}
                          labelItems={selectionModeLabelItem}
                        />
                      </div>

                      {/* toggle select all button */}
                      <div className="flex items-center gap-2">
                        <span className="hidden text-sm lg:inline-flex">
                          {isAllSelected ? 'Unselect all' : 'Select all'}
                        </span>
                        <Button
                          onClick={() => selection.toggleSelectAll(allNoteIds)}
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
                    <div className="flex items-center justify-end">
                      <OverviewToolbar
                        toggleOpenNoteSorting={toggleOpenNoteSorting}
                        openSelectionMode={() =>
                          selection.openSelectionMode('multiple')
                        }
                        handleRefreshNotes={handleRefreshNotes}
                        isOpenNoteSorting={isOpenNoteSorting}
                        closeNoteSorting={closeNoteSorting}
                      />
                    </div>
                  )}
                </nav>
                {/* NoteList per categorie */}
                <div className="flex flex-col gap-10 px-3 pt-3 pb-30 lg:px-5 md:px-6">
                  <PinnedNotes selection={selection} data={pinned} />
                  <RecentNotes selection={selection} data={recent} />
                </div>
              </NotePanel>
            </ScrollArea>
            {/* right panel for task, more options */}
            <ScrollArea className="h-[calc(100dvh-56px)] flex-col hidden p-3 border-l border-border dark:border-0 bg-sidebar lg:flex shrink-0 w-80">
              <TaskList />
              {/* suble overlay - black */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent dark:via-zinc-950/20 dark:to-zinc-950/80 h-15"></div>
            </ScrollArea>
          </main>
        </>
      </div>

      {/* mobile select toollip */}
      <Portal>
        {!isOpenMobileSidebar && selection.isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0! flex items-center h-16 px-4 md:hidden z-22"
          >
            <div className="flex justify-between w-full">
              <SelectionModeToolbarButton
                onAction={handleSelectionModeAction}
                disabled={!selection.isHasSelected}
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
