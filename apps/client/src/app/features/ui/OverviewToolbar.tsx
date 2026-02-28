import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { kebabMenuVariants } from '@/shared/motions/motion.variant';
import {
  LassoSelect,
  ArrowDownNarrowWide,
  ListRestart,
  LayoutList,
  LayoutGrid,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SortingButton } from './SortingButton';
import type { SelectionMode } from '@/app/hooks/use-selection-manager';
import { useIsMobile } from '@/shared/hooks/use-mobile';

type Props = {
  openSelectionMode: (mode?: SelectionMode) => void;
  handleRefreshNotes: () => void;
  toggleOpenNoteSorting: () => void;
  isOpenNoteSorting: boolean;
  closeNoteSorting: () => void;
};

export function OverviewToolbar(props: Props) {
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-4">
      <Button variant="ghost" size={buttonSize}>
        <LayoutList />
      </Button>
      <Button variant="ghost" size={buttonSize}>
        <LayoutGrid />
      </Button>
      <Button
        onClick={() => props.openSelectionMode()}
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

      {!isMobile ? (
        <DropdownMenu
          open={props.isOpenNoteSorting}
          onOpenChange={(nextOpen) =>
            nextOpen ? props.toggleOpenNoteSorting() : props.closeNoteSorting()
          }
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="transition-colors!"
              size={buttonSize}
            >
              <ArrowDownNarrowWide />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={0}
            className="hidden px-0 border-0 rounded-lg shadow-xl w-60 md:block bg-background dark:bg-sidebar"
          >
            <motion.div
              variants={kebabMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full px-2 py-2 overflow-hidden"
            >
              <span className="px-2 text-xs text-muted-foreground">
                Sort notes
              </span>
              <SortingButton />
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}
