import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { SortingButton } from './SortingButton';

export function SortingDrawer({
  isOpen,
  onClose,
  showOn,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  showOn?: 'mobile' | 'desktop';
}) {
  const isMobile = useIsMobile();

  if (showOn === 'mobile' && !isMobile) return null;
  if (showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="dark:bg-muted overflow-hidden rounded-4xl! w-[96%] mx-auto data-[vaul-drawer-direction=bottom]:bottom-3">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-[20px]">Sort notes</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="pb-8 space-y-1">
            <SortingButton />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
