import { Button } from '@/components/ui/button';
import { handleWait } from '@/shared/utils/handle-wait';
import { Ellipsis } from 'lucide-react';
import { kebabMenuLabel } from './label';
import { useIsDesktop } from '@/shared/hooks/use-desktop';
import { useNavigate } from 'react-router-dom';
import { DropDown as DropDownKebabMenu } from '@/app/features/ui/DropDown';

type Props = {
  open?: boolean;
  close: () => void;
  toggle: () => void;
};

export const KebabMenu = ({ open, close, toggle }: Props) => {
  // const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  // const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isDesktop = useIsDesktop();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     const target = e.target as Node;
  //     if (!isMobile) return; // stop click anywhere = close on desktop
  //     if (
  //       triggerRef?.current?.contains(target) ||
  //       kebabMenuRef?.current?.contains(target)
  //     )
  //       return;
  //     close();
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [close, isMobile]);
  if (isDesktop) return null;

  return (
    <>
      {/* trigger button */}

      {/* Kebab menu */}
      <DropDownKebabMenu
        controlled
        align="end"
        sideOffset={12}
        showOn="mobile"
        className="bg-background dark:bg-sidebar"
        toggleOpen={toggle}
        isOpen={open}
        trigger={
          <Button
            variant="ghost"
            size="icon-lg"
            className="duration-300 md:hidden"
          >
            <Ellipsis />
          </Button>
        }
      >
        <ul className="flex flex-col gap">
          {kebabMenuLabel.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => {
                  handleWait(() => {
                    close();
                    navigate(m.href);
                  }, 230);
                }}
                className="flex items-center w-full h-12 gap-3 px-4 text-foreground/90 active:bg-muted dark:active:bg-muted-foreground/30 active:opacity-70"
              >
                <m.icon className="size-5" /> {m.label}
              </button>
            </li>
          ))}
        </ul>
      </DropDownKebabMenu>
      {/* {!isOpenMobileSidebar && open && (
        
      )} */}
    </>
  );
};
