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
import {
  Check,
  FolderSymlink,
  ListChecks,
  Lock,
  Pin,
  Plus,
  Trash,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ErrorState } from '../components/ErrorState';
import { ConfirmDialog } from '../features/ui/ConfirmDialog';
import { ConfirmDrawer } from '../features/ui/ConfirmDrawer';
import { EmptyEmpty as EmptyNotes } from '../features/ui/Empty';
import { OverviewToolbar } from '../features/ui/OverviewToolbar';
import { SortingDrawer } from '../features/ui/SortingDrawer';
import { ToolbarButton as SelectionModeToolbarButton } from '../features/ui/ToolbarButton';
import {
  useBulkPinned,
  useHomeNote,
  useSoftDeleteMany,
} from '../hooks/use-note';
import { useNoteServices } from '../hooks/use-note-service';
import { useSelectionManager } from '../hooks/use-selection-manager';
import { cn } from '../lib/utils';
import { RecentNotes } from '../features/notes/components/RecentNotes';
import { PinnedNotes } from '../features/notes/components/PinnedNotes';

function Overview() {
  const { data: homeNotes, isError, error, refetch, isPending } = useHomeNote();
  const { recent, pinned } = homeNotes ?? {
    recent: [],
    pinned: [],
    // meta: {},
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

  const RenderNote = () => {
    if (isPending)
      return (
        <div className="flex items-center justify-center py-10 h-100">
          <Spinner />
        </div>
      );

    if (isError) return <ErrorState error={error} onRetry={refetch} />;

    if (all?.length < 1)
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
        <nav className="sticky top-0 pt-6 mx-2 z-16 md:px-5 bg-muted dark:bg-background">
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

        <div className="flex flex-col gap-10 px-3 pt-3 pb-4 md:px-6">
          <PinnedNotes selection={selection} data={pinned} />
          <RecentNotes selection={selection} data={recent} />
        </div>
      </>
    );
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
            <div className="grow">
              <RenderNote />
            </div>

            <div className="sticky inset-y-0 top-0! flex-col hidden gap-2 p-3 bg-sidebar lg:flex shrink-0 w-80">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Task</h3>
                  <Button className="bg-background hover:bg-background! shadow-sm hover:text-foreground/80! text-foreground">
                    <Plus className="size-4" /> Add task
                  </Button>
                </div>
                <div className="shadow-xs min-h-40 rounded-xl max-h-50 bg-background">
                  <ul className="flex flex-col overflow-hidden">
                    <li className="px-4 py-3">
                      <label
                        htmlFor="task"
                        className="flex items-center gap-4 cursor-pointer"
                      >
                        <span className="flex items-center justify-center border rounded-md active:scale-98 size-5 border-border">
                          <Check className="size-4 text-primary" />
                        </span>
                        <span className="font-medium">
                          Delete all messy code
                        </span>
                      </label>
                      <input
                        id="task"
                        hidden
                        type="checkbox"
                        name="task"
                        value="task"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
