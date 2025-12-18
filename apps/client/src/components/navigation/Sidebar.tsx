import { Settings } from 'lucide-react';
import { forwardRef } from 'react';
import { MiniProfile } from '../users/MiniProfile';
import { ButtonIcon, Button } from '../ui/button';
// import { ToggleTheme } from '../ui/toggle-theme';
import { supabase } from '@/services/auth-client.service';
import { sideBarLabel } from './navigation.label';
import { SideBarTabWrapper } from './sideBarTab';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
};

export const MobileSidebar = forwardRef<HTMLDivElement, Props>(
  ({ open, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform will-change-transform text-sidebar-foreground duration-200 px-4 py-2 z-50 ease-in-out w-6/7 bg-sidebar fixed inset-y-0 border-r border-sidebar-border overflow-hidden`}
      >
        <aside className={`relative size-full rounded-xl overflow-y-auto`}>
          <MiniProfile
            btnAction={
              <ButtonIcon>
                <Settings />
              </ButtonIcon>
            }
          />
          <div className="h-1 my-4 border-t border-sidebar-border"></div>

          <ul className="flex flex-col gap-2">
            {sideBarLabel.map((s) => (
              <>
                {s.hiddenOnMobile ? null : (
                  <li key={s.id}>
                    <SideBarTabWrapper>
                      <s.icon className="size-5" /> {s.label}
                    </SideBarTabWrapper>
                  </li>
                )}
              </>
            ))}
          </ul>
          <div className="absolute inset-x-0 w-full px-2 bottom-2 active:bg-muted">
            <Button
              onClick={async () => await supabase.auth.signOut()}
              size="large"
              className="w-full font-normal border bg-muted text-foreground/90 border-input"
            >
              Logout
            </Button>
          </div>
        </aside>
      </div>
    );
  }
);
