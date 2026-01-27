import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  PanelLeftClose,
  PanelRightClose,
  ChevronRight,
} from 'lucide-react';

type Props = React.HTMLAttributes<HTMLElement> & {
  onCancelEditor: () => void;
  toggleOpen: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
};

export function EditorToolbar({
  isOpen,
  toggleOpen,
  onCancelEditor,
  children,
  className,
}: Props) {
  return (
    <nav className={cn(className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <span className="hidden lg:inline-flex">
          <Button onClick={toggleOpen} variant="ghost" size="icon">
            {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
          </Button>
        </span>

        <span className="flex flex-wrap gap-3">
          <Button
            onClick={onCancelEditor}
            variant="ghost"
            className="bg-accent/20"
            size="icon-lg"
          >
            <ChevronLeft />
          </Button>
          <Button className="bg-accent/20" variant="ghost" size="icon-lg">
            <ChevronRight />
          </Button>
        </span>
      </div>
      {/* divide */}
      {isOpen ? null : (
        <div className="mx-2 my-4 border-t border-sidebar-border"></div>
      )}
      {children}
    </nav>
  );
}
