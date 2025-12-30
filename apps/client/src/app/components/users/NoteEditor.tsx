import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export const NoteEditor = ({
  open,
  close,
}: {
  open?: boolean;
  close?: () => void;
}) => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const [chars, setChars] = useState(0);
  const [focusedHeight, setFocusedHeight] = useState(0);

  useEffect(() => {
    if (areaRef.current) areaRef.current.focus();
  }, []);

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-0 px-4 left-0 bg-background size-full lg:w-[calc(100%-16rem)] z-999 lg:absolute lg:left-64 lg:top-14"
        >
          <nav className="flex justify-between items-center w-full h-12 py-2 lg:px-4">
            <button
              onClick={close}
              className="text-primary p-0 font-semibold active:opacity-80"
            >
              Cancel
            </button>
            <span className="text-muted-foreground">New notes</span>
            <Button className="font-bold select-none" variant="ghost">
              Save
            </Button>
          </nav>

          <main className="flex flex-col h-[calc(100%-6.5rem)] py-2 space-y-3">
            <textarea
              rows={1}
              className="text-2xl tracking-tight leading-10 font-bold placeholder:text-xl w-full resize-none focus:outline-0"
              placeholder="Title"
              onChange={(e) => {
                const autoHeight = e.currentTarget.scrollHeight + 10; // 10 : line-height of text
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = autoHeight + 'px';
                setFocusedHeight(autoHeight);
              }}
              onBlur={(e) => {
                e.currentTarget.style.height = 'auto';
              }}
              onFocus={(e) =>
                (e.currentTarget.style.height =
                  focusedHeight === 0 ? 'auto' : `${focusedHeight}px`)
              }
            ></textarea>
            <div className="text-sm space-x-2 text-muted-foreground">
              <span>
                {new Date().toLocaleDateString('en-EN', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
              <span className="w-0.5 border-l border-muted"></span>{' '}
              <span>
                {chars} {chars > 1 ? 'characters' : 'character'}
              </span>
            </div>
            <textarea
              ref={areaRef}
              onChange={(e) => setChars(e.target.value.length)}
              name=""
              id=""
              className="w-full h-full font-normal text-lg resize-none focus:outline-0"
              placeholder="Start typing freely..."
            ></textarea>
          </main>

          <nav className="absolute bottom-0 h-14 left-0 w-full py-2 bg-sidebar/50"></nav>
        </motion.div>
      )}
    </>
  );
};
