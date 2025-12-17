import { Logo } from '@/components/brand/Logo';
import { ButtonIcon } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';
import { landingMenuVariants } from '@/motions/motion.variant';
import { TextAlignJustify, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Login } from './Login';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative">
      <header>
        <nav className="sticky inset-x-0 top-0 flex items-center h-12 gap-2 px-2 py-1 border-b shadow-lg z-99 md:px-3 bg-sidebar border-sidebar-border">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-4 grow">
            {/* mobile menu button */}
            <ButtonIcon onClick={toggleOpenMenu} className="md:hidden">
              <TextAlignJustify className="size-[26px]" />
            </ButtonIcon>
          </div>
        </nav>
      </header>
      {/* main */}
      <main className="px-4 py-2">Landing page</main>

      {/* mobile menu content */}
      <AnimatePresence>
        {openMenu && (
          <motion.nav
            variants={landingMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'spring',
              mass: 0.3,
              stiffness: 100,
              damping: 10,
            }}
            className="fixed inset-0 bg-sidebar z-100"
          >
            <div className="flex justify-end px-1 py-1">
              <ButtonIcon onClick={toggleOpenMenu} className="md:hidden">
                <X className="size-8" />
              </ButtonIcon>
            </div>
            <Login />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
