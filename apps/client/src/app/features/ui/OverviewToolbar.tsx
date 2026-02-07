import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { kebabMenuVariants } from '@/shared/motions/motion.variant';
import { LassoSelect, ArrowDownNarrowWide, ListRestart } from 'lucide-react';
import { motion } from 'motion/react';
import { SortingButton } from './SortingButton';

type Props = {
  openSelectionMode: () => void;
  handleRefreshNotes: () => void;
  toggleOpenNoteSorting: () => void;
  isOpenNoteSorting: boolean;
  closeNoteSorting: () => void;
};

export function OverviewToolbar(props: Props) {
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });

  return (
    <div className="flex gap-4">
      <Button
        onClick={props.openSelectionMode}
        variant="ghost"
        size={buttonSize}
      >
        <LassoSelect />
      </Button>
      <Button
        onClick={props.handleRefreshNotes}
        variant="ghost"
        className="hidden md:inline-flex"
        size="icon"
      >
        <ListRestart />
      </Button>

      {/* mobile button only */}
      <Button
        onClick={props.toggleOpenNoteSorting}
        variant="ghost"
        className="transition-colors! md:hidden"
        size={buttonSize}
      >
        <ArrowDownNarrowWide />
      </Button>

      <DropdownMenu
        open={props.isOpenNoteSorting}
        onOpenChange={(nextOpen) =>
          nextOpen ? props.toggleOpenNoteSorting() : props.closeNoteSorting()
        }
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="transition-colors! hidden md:inline-flex"
            size={buttonSize}
          >
            <ArrowDownNarrowWide />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          className="px-0 bg-transparent border-0 w-60 hidden md:block"
        >
          <motion.div
            variants={kebabMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full py-2 px-2 overflow-hidden rounded-lg shadow-xl bg-background dark:bg-sidebar"
          >
            <span className="text-xs text-muted-foreground px-2">
              Sort notes
            </span>
            <SortingButton />
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
