// for new notes, edit, ...edit free

import { ScrollArea } from '@/components/ui/scroll-area';
import { Outlet } from 'react-router-dom';

function MiniAppLayout() {
  return (
    <>
      <ScrollArea className="h-[calc(100dvh-60px)] scroll-touch scroll-smooth overscroll-contain">
        <main className="h-full">
          <Outlet />
        </main>
      </ScrollArea>
    </>
  );
}

export default MiniAppLayout;
