import { supabase } from '@/auth-services/clients.service';
import { Logo } from '@/components/brand/Logo';
import { NavTab } from '@/components/navigation/NavTab';
import { TopBar } from '@/components/navigation/TopBar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-session';
import { waitVibrate } from '@/utils/vibration';
import { Earth, PenLine, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function Overview() {
  const [openSide, setOpenSide] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    if (sideBarRef.current) {
      setSidebarWidth(sideBarRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <div className="relative max-h-screen overflow-hidden h-dvh">
        {/* sidebar */}
        <div className="fixed inset-y-0 z-20 hidden w-64 border-r bg-sidebar md:block border-sidebar-border">
          <Logo className="sticky top-0 hidden w-full px-4 py-3 md:flex" />

          <aside className="relative px-2 space-y-1 w-full h-[calc(100%-8%)] overflow-y-auto scrollbar-none">
            <nav className="mt-1 rounded-md bg-input">
              <ul className="flex flex-col space-y-2">
                <NavTab />
              </ul>
            </nav>

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-2 pb-6 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950/80 min-h-15">
              <div className="w-full active:bg-muted">
                <Button size="medium" className="w-full">
                  <Plus /> Create new note
                </Button>
              </div>
              {/* prov logout */}
              <div className="w-full active:bg-muted">
                <Button
                  onClick={async () => await supabase.auth.signOut()}
                  size="medium"
                  className="w-full font-normal border bg-muted/90 text-foreground/90 border-border"
                >
                  Logout
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div
          onClick={() => {
            waitVibrate(200, 'low');
            setOpenSide(false);
          }}
          className={`${
            openSide
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          } inset-0 transition-opacity duration-300 ease-in-out bg-black/50 cursor-pointer fixed z-40 md:hidden`}
        ></div>

        {/* sidebar mobile */}
        <div
          ref={sideBarRef}
          className={`${
            openSide ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform will-change-transform duration-200 p-4 z-50 ease-in-out w-5/6 bg-background fixed inset-y-0 border-r border-border rounded-r-2xl overflow-hidden`}
        >
          <aside
            className={`${
              openSide ? 'scale-100' : 'scale-20'
            } size-full tansition-transform will-change-transform duration-250 rounded-xl flex-col space-y-3 *:border *:border-border *:h-20 *:w-full *:bg-muted/60 *:rounded-lg ease-in-out overflow-y-auto flex items-center`}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </aside>
        </div>

        {/* main content */}
        <div
          style={
            !isMobile
              ? {}
              : {
                  transform: openSide
                    ? `translateX(${sidebarWidth}px)`
                    : 'translateX(0)',
                }
          }
          className="relative h-full transition-transform duration-200 ease-in-out will-change-transform md:transition-all md:will-change-auto md:duration-50 md:ml-64"
        >
          <TopBar setOpenSide={setOpenSide} openSide={openSide} />

          <main className="grid items-start min-h-full grid-cols-4 gap-2 px-4 overflow-y-auto">
            <div className="flex justify-center py-6 col-span-full">
              <div className="flex flex-col items-center justify-center w-full gap-4 p-10 rounded-lg md:w-2/3 bg-muted">
                <h4 className="text-lg font-black">
                  Good morning {user?.email}
                </h4>
                <p className="text-sm text-center text-muted-foreground">
                  If you click this browse button, your Overview system down
                  instead, and keep click, calm. As a JS dev, click this button
                  please.
                </p>
                <Button>
                  <Earth /> Browse notes
                </Button>
              </div>
            </div>
          </main>
        </div>

        {!openSide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-24 md:bottom-6 right-4"
          >
            <button className="flex items-center justify-center p-2 rounded-full shadow-md bg-primary shadow-primary/30 md:shadow-blue-800/20 size-14 active:opacity-80 md:hover:opacity-80">
              <PenLine className="size-auto" />
            </button>
          </motion.div>
        )}

        {/* BottomBar */}
        <div
          style={
            !isMobile
              ? {}
              : {
                  transform: openSide
                    ? `translateX(${sidebarWidth}px)`
                    : 'translateX(0)',
                }
          }
          className="fixed inset-x-0 bottom-0 z-20 h-16 transition-transform duration-200 ease-in-out border-t bg-sidebar backdrop-blur-sm md:hidden border-border"
        >
          <nav className="select-none size-full">
            <ul className="flex items-center justify-around size-full">
              <NavTab />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Overview;
