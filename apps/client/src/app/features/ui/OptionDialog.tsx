import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { CreateOption } from './CreateOption';

type Props = {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showOn?: 'mobile' | 'desktop';
};

export function OptionDialog(props: Props) {
  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <Dialog open={props.isOpen} onOpenChnage={props.onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
          {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
        </DialogHeader>
        <div>
          <CreateOption onClose={props.onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
