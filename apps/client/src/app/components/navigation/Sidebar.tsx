import { MiniProfile } from '@/app/features/users/MiniProfile';
import { useNoteServices } from '@/app/hooks/use-note-service';
import { cn } from '@/app/lib/utils';
import { useLayoutStore } from '@/app/stores/layoutStore';
import { Button } from '@/components/ui/button';
import { Logo } from '@/shared/components/brand/Logo';
import { Overlay } from '@/shared/components/Overlay';
import { handleWait } from '@/shared/utils/handle-wait';
import { waitVibrate } from '@/shared/utils/vibration';
import { PanelLeftClose, PanelLeftOpen, Plus, PowerOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { FileDropZone } from '../../features/notes/components/FileDropZone';
import { tabLabel } from './label';
import { NavTab } from './NavTab';
import { useProfileServices } from '@/app/hooks/use-profile-service';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const MobileSidebar = ({
  open,
  close,
  openLogout,
  ref,
  ...props
}: SidebarProps & {
  open?: boolean;
  close: () => void;
  openLogout: () => void;
}) => {
  const { openProfile } = useProfileServices();

  return (
    <>
      {/* overlay */}
      <Overlay
        className="z-40 dark:bg-white/40 md:hidden"
        onClick={() => {
          close();
          waitVibrate(300, 'low');
        }}
        open={open}
      />

      <div
        {...props}
        ref={ref}
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform will-change-transform text-sidebar-foreground overflow-y-auto duration-300 z-50 ease-in-out w-5/6 bg-background fixed inset-y-0 border-r border-sidebar-border/30 overflow-hidden`}
      >
        {/* subtle overlay */}
        <div className="absolute inset-0 hidden pointer-events-none bg-primary/2 dark:block -z-1"></div>

        <aside className={`relative size-full rounded-xl py-2`}>
          <MiniProfile
            onClick={() => {
              close?.();
              handleWait(openProfile, 240);
            }}
            className="px-4 py-2 active:bg-muted dark:active:bg-card active:opacity-80"
          />

          <div className="mx-4 mb-4 border-t border-sidebar-border dark:border-sidebar-border/50"></div>

          <ul className="flex flex-col font-medium">
            {/* tab label map & interact */}
            {tabLabel.map((t) => (
              <li key={t.route}>
                <NavLink to={t.route} end={t.route === '/app'}>
                  {({ isActive }) => (
                    <button
                      onClick={close}
                      className={cn(
                        isActive ? 'font-bold' : 'font-normal',
                        'text-xl flex gap-5 px-6 py-3 items-center w-full active:bg-muted dark:active:bg-card text-sidebar-foreground'
                      )}
                    >
                      {t.label === 'Tags' ? (
                        <t.icon className="size-6" />
                      ) : (
                        <t.icon
                          className="size-6"
                          weight={isActive ? 'fill' : 'bold'}
                        />
                      )}{' '}
                      {t.label}
                    </button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* logout */}
          <div className="absolute left-0 w-full bottom-2">
            <button
              onClick={() => {
                close();
                handleWait(openLogout, 240);
              }}
              className={cn(
                'font-semibold text-xl flex gap-5 px-6 py-3 dark:active:bg-card  items-center w-full active:bg-muted'
              )}
            >
              <PowerOff /> Log out
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export const DesktopSidebar = ({
  width,
  ref,
  ...props
}: SidebarProps & { width: number }) => {
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const toggleOpenPanel = useLayoutStore((s) => s.toggleOpenPanel);
  const { openNewNote, openCreateFromFile } = useNoteServices();

  return (
    <aside
      style={{ width: `${width}px` }}
      {...props}
      ref={ref}
      className="fixed inset-y-0 z-20 hidden duration-260 ease-in-out border-r transition-all md:max-w-[62px] lg:max-w-64 text-sidebar-foreground bg-sidebar md:block border-sidebar-border"
    >
      {/* subtle overlay */}
      <div className="absolute inset-0 hidden pointer-events-none bg-primary/2 dark:block -z-1"></div>

      <div className="items-center justify-between hidden w-full px-3 py-3 pr-2 lg:flex ">
        {isOpenPanel && <Logo mono={true} />}
        <Button
          title="Ctrl+T"
          onClick={toggleOpenPanel}
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground/80"
        >
          {isOpenPanel ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>

      <div className="relative space-y-4 px-3 w-full md:h-full lg:h-[calc(100%-8%)] overflow-y-auto scrollbar-none">
        <nav className="mt-1 rounded-md">
          <ul className="flex flex-col gap-2">
            <NavTab />
          </ul>
        </nav>

        <div className="my-6 border-t border-sidebar-border/80"></div>

        {/* drag and drop file */}
        <div
          className={cn(
            isOpenPanel
              ? 'pointer-events-auto opacity-100 translate-x-0'
              : 'pointer-events-none opacity-0 -translate-x-full',
            'mt-4 transition overflow-hidden rounded-3xl bg-background/20'
          )}
        >
          <FileDropZone className="h-60" onContinue={openCreateFromFile} />
        </div>

        <div className="absolute inset-x-0 flex flex-col items-center gap-2 px-3 pb-2 bottom-2 bg-linear-to-b from-transparent dark:via-zinc-950/20 dark:to-zinc-950/80 min-h-15">
          <div className="w-full flex justify-center active:bg-muted">
            <Button
              onClick={openNewNote}
              title={isOpenPanel ? '' : 'create new note'}
              size="lg"
              variant="ghost"
              className="hidden w-full gap-6 overflow-hidden font-semibold lg:inline-flex justify-center"
            >
              <span className="p-1 rounded-full bg-secondary text-secondary-foreground">
                <Plus className="size-4" />
              </span>
              {isOpenPanel ? 'New note' : null}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
