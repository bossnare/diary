import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { CreateOption } from './CreateOption';

type Props = {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showOn?: 'mobile' | 'desktop';
};

export function OptionDrawer(props: Props) {
  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className="dark:bg-sidebar rounded-4xl! w-[96%] mx-auto data-[vaul-drawer-direction=bottom]:bottom-3 overflow-hidden border-t-0!">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader className="space-y-3">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <div className="pb-8">
            <CreateOption onClose={props.onClose} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
