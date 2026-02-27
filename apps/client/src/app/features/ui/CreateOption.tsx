import { handleWait } from '@/shared/utils/handle-wait';
import { ClipboardPaste, FolderOpen, SquarePen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FileDropZone } from '../notes/components/FileDropZone';
import { useNoteServices } from '@/app/hooks/use-note-service';
import {useQueryToggle} from '@/shared/hooks/use-query-toggle'

type ActionKey = 'empty' | 'fromFile' | 'fromClipboard';
type ActionLabel = {
  label: string;
  icon: React.ElementType;
  subtitle: string;
  key: ActionKey;
};

export const CreateOption = ({ onClose }: { onClose?: () => void }) => {
  const NoteServices = useNoteServices();
  const {isOpen: isOpenFromFile,open: openFromFile, close: closeFromFile} = useQueryToggle({key: 'action', value: 'fromFile'})

  const options: ActionLabel[] = [
    {
      label: 'Create empty',
      key: 'empty',
      subtitle: 'Start with a blank note.',
      icon: SquarePen,
    },
    {
      label: 'Create from file',
      key: 'fromFile',
      subtitle: 'Import content from a file.',
      icon: FolderOpen,
    },
    {
      label: 'Paste from clipboard',
      key: 'fromClipboard',
      subtitle: 'Use text from your clipboard.',
      icon: ClipboardPaste,
    },
  ];

  const actionMaps = {
    empty: () => {
      onClose?.(); // close drawer
      NoteServices.openNewNote();
    },
    fromFile: () => {
     openFromFile()
    },
    fromClipboard: () => {
      onClose?.(); // close drawer
      NoteServices.pasteFromClipboard();
    },
  };

  const handleChooseAction = (actionKey: ActionKey) => {
    const action = actionMaps[actionKey];
    if (!action) return;
    return action();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpenFromFile ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
          key={'file-dropzone'}
          className="px-3"
        >
          <FileDropZone
            onContinue={() => {
              onClose?.(); // close drawer
                            NoteServices.openCreateFromFile()
              closeFromFile() // close query state from file if continue to copy the file content to new note
            }}
            className="h-58 lg:h-56 w-[92%] mx-auto"
          />
        </motion.div>
      ) : (
        <motion.ul
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.1 }}
          key="option-lists"
          className="flex flex-col justify-center gap-3"
        >
          {options.map((o) => (
            <li>
              <div
                role="button"
                onClick={() => handleWait(() => handleChooseAction(o.key), 250)}
                className="flex active:text-muted-foreground hover:text-muted-foreground items-center w-full h-16 gap-3 px-4 lg:px-0 rounded-md select-none active:bg-muted dark:active:bg-background"
              >
                <span className="flex items-center justify-center rounded-full size-12 lg:size-10 bg-muted">
                  <o.icon className="lg:size-5" />
                </span>
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight">{o.label}</span>
                  <p className="text-sm text-muted-foreground">{o.subtitle}</p>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
