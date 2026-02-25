import { UserAvatar } from '@/app/features/users/UserAvatar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/shared/components/brand/Logo';
import { useAuth } from '@/shared/hooks/use-auth';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { waitVibrate } from '@/shared/utils/vibration';
import { Plus, Search, TextAlignJustify, TriangleAlert } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useId } from 'react';
import { KebabMenu } from './KebabMenu';
import { useUser } from '@/app/hooks/use-user';

export const TopBar = ({
  openSideOver,
  openCreateOptions,
}: {
  openSideOver?: () => void;
  openCreateOptions: () => void;
}) => {
  const inputId = useId();
  const { user } = useAuth();
  const { data: userData } = useUser();

  const { open: openMobileSidebar } = useQueryToggle({
    key: 'sidebar',
    value: 'mobile',
  });

  const {
    isOpen: isOpenKebabMenu,
    toggle: toggleOpenKebabMenu,
    close: closeKebabMenu,
  } = useQueryToggle({ key: 'menu', value: 'kebab' });

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center justify-between gap-2 px-2 py-1 pl-1 lg:border-b lg:border-border dark:lg:border-0 h-14 z-99 md:h-14 md:px-2 bg-sidebar">
      {/* subtle overlay */}
      <div className="absolute inset-0 hidden pointer-events-none bg-primary/2 dark:block -z-1"></div>

      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <Button
          size="icon-lg"
          variant="ghost"
          onClick={() => {
            waitVibrate(300, 'low');
            openMobileSidebar();
          }}
          className="md:hidden"
        >
          <TextAlignJustify className="size-[26px]" />
        </Button>
      </div>

      <Logo mono={true} className="md:hidden" />

      {/* desktop navigation */}
      <div className="hidden h-10 py-1 px-2 rounded-md bg-input gap-2 md:inline-flex md:w-[50%] lg:w-[36%] items-center shrink-0">
        <label htmlFor={inputId}>
          <Search className="text-muted-foreground size-5" />
        </label>
        <input
          id={inputId}
          type="text"
          spellCheck={false}
          name="current-search"
          className="focus:outline-none pl-0.5 text-foreground/90 grow placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="Search your notes, workspaces, ..."
        />
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-4 md:grow">
        <Button
          onClick={openCreateOptions}
          size="icon-lg"
          variant="ghost"
          className="relative hidden lg:inline-flex"
        >
          <Plus />
        </Button>
        <div
          role="button"
          onClick={openSideOver}
          title={user?.user_metadata.name.split('(')[0]}
          className="relative hidden cursor-pointer size-8 md:block active:bg-input md:hover:bg-input active:opacity-70"
        >
          <UserAvatar
            user={userData}
            className="size-full bg-input outline-offset-1 outline outline-input"
          />
          {/* badge */}
          {user && !user.user_metadata.email_verified && (
            <span className="absolute p-1 bg-yellow-200 rounded-full -top-1 -right-1">
              <TriangleAlert className="text-yellow-600 size-4" />
            </span>
          )}
        </div>
        {/* mobile navigation tab */}
        <AnimatePresence>
          <KebabMenu
            toggle={toggleOpenKebabMenu}
            open={isOpenKebabMenu}
            close={closeKebabMenu}
          />
        </AnimatePresence>
      </div>
    </nav>
  );
};
