import { BottomBar } from '@/components/navigation/BottomBar';
import { DesktopSidebar, MobileSidebar } from '@/components/navigation/Sidebar';
import { SideOver } from '@/components/navigation/SideOver';
import { TopBar } from '@/components/navigation/TopBar';
import PullToRefreshWrapper from '@/components/pull-to-refresh';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsDesktop } from '@/hooks/use-desktop';
import { useIsMobile } from '@/hooks/use-mobile';
import { fabButtonVariants } from '@/motions/motion.variant';
import { useLayoutStore } from '@/stores/UXStore';
import { PenLine } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const isOpenMobileSidebar = useLayoutStore((s) => s.isOpenMobileSidebar);
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const setIsOpenPanel = useLayoutStore((s) => s.setIsOpenPanel);
  const setIsOpenMobileSidebar = useLayoutStore(
    (s) => s.setIsOpenMobileSidebar
  );

  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  // avoid bad state interactivity
  // good lifecycle
  useEffect(() => {
    if (!isMobile) setIsOpenMobileSidebar(false);
  }, [isMobile, setIsOpenMobileSidebar]);

  useEffect(() => {
    if (!isDesktop) setIsOpenPanel(true);
    else setIsOpenPanel(false);
  }, [isDesktop, setIsOpenPanel]);

  //  reactive main width
  const MIN_PANEL_WIDTH = 60;
  const MAX_PANEL_WIDTH = 256;
  const SIDEBAR_WIDTH = isOpenPanel ? MAX_PANEL_WIDTH : MIN_PANEL_WIDTH;

  useEffect(() => {
    // get mobile sidebar width
    if (mobileSidebarRef.current) {
      setMobileSidebarWidth(
        mobileSidebarRef.current.getBoundingClientRect().width
      );
    }
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        {/* desktop sidebar */}
        <DesktopSidebar width={SIDEBAR_WIDTH} />
        {/* mobile sidebar  */}
        <MobileSidebar ref={mobileSidebarRef} /> {/* main content */}
        <div
          style={
            !isMobile
              ? {
                  transform: `translateX(${SIDEBAR_WIDTH}px)`,
                  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                }
              : {
                  transform: isOpenMobileSidebar
                    ? `translateX(${mobileSidebarWidth}px)`
                    : 'translateX(0)',
                  width: '100%',
                }
          }
          className="relative transition-transform duration-200 ease-in-out will-change-transform md:duration-100"
        >
          <TopBar />
          {/* route content */}
          <PullToRefreshWrapper
            onRefresh={async () => window.location.reload()}
          >
            <ScrollArea className="h-[calc(100dvh-116px)] md:h-[calc(100dvh-56px)]">
              <main className="pb-[60px] min-h-full px-2 py-2 md:px-4 overscroll-contain">
                <Outlet />
              </main>
            </ScrollArea>
          </PullToRefreshWrapper>
        </div>
        <AnimatePresence>
          {!isOpenMobileSidebar && (
            <motion.div
              variants={fabButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 md:bottom-12 right-4"
            >
              <Button className="text-white rounded-full shadow-lg size-14">
                <PenLine className="size-auto" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* mobile */}
        <BottomBar mobileSidebarWidth={mobileSidebarWidth} />
        {/* sideOver */}
        <SideOver />
      </div>
    </>
  );
}

export default DashboardLayout;
