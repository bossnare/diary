import { cn } from '@/app/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { dropdownMenuVariants } from '@/shared/motions/motion.variant';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { motion } from 'motion/react';

type Props = {
  toggleOpen?: () => void;
  showOn: 'mobile' | 'desktop';
  trigger: React.ReactNode;
  isOpen?: boolean;
  controlled?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof DropdownMenuPrimitive.Content>;

export function DropDown({
  toggleOpen,
  showOn,
  trigger,
  isOpen,
  children,
  controlled,
  className,
  ...props
}: Props) {
  const isMobile = useIsMobile();

  if (showOn === 'mobile' && !isMobile) return null;
  if (showOn === 'desktop' && isMobile) return null;

  return (
    <DropdownMenu
      open={controlled ? isOpen : undefined}
      onOpenChange={
        controlled
          ? (nextOpen) => (nextOpen ? toggleOpen?.() : toggleOpen?.())
          : undefined
      }
    >
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        {...props}
        className={cn('px-0 border-0 rounded-lg shadow-xl w-76', className)}
      >
        <motion.div
          variants={dropdownMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full py-2 overflow-hidden"
        >
          {children}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
