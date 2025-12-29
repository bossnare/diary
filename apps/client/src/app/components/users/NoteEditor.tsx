import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

export const NoteEditor = ({
  open,
  close,
}: {
  open?: boolean;
  close?: () => void;
}) => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (areaRef.current) areaRef.current.focus();
  }, []);

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-0 left-0 bg-background size-full lg:w-[calc(100%-16rem)] z-999 lg:absolute lg:left-64 lg:top-14"
        >
          <nav className="flex justify-between w-full px-2 py-2 pb-4 lg:px-4">
            <button onClick={close} className="text-primary active:opacity-80">
              Cancel
            </button>
            <Button className="font-bold select-none" variant="ghost">
              Save
            </Button>
          </nav>

          <main className="flex flex-col h-full px-2 py-2 space-y-2 lg:px-4">
            <input
              type="text"
              className="text-xl placeholder:text-xl focus:outline-0"
              placeholder="Title"
            />
            <textarea
              ref={areaRef}
              name=""
              id=""
              className="w-full h-full resize-none focus:outline-0"
              placeholder="Start typing freely"
            ></textarea>
          </main>
        </motion.div>
      )}
    </>
  );
};
