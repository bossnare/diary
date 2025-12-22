import { landingPageLabel } from '@/app/components/navigation/navigation.label';
import { Paragraphe } from '@/app/components/Paragraphe';
import boxWithLine from '@/assets/box_with_line.png';
import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { landingBodyVariants } from '@/motions/motion.variant';
import { LandingPageMenu } from '@/public-site/components/navigation/LandingPageMenu';
import { Footer } from '@/shared/components/brand/Footer';
import { Logo } from '@/shared/components/brand/Logo';
import { ArrowDownCircle, Merge, TextAlignJustify } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      <header className="fixed inset-x-0 top-0 z-99">
        <nav className="inset-x-0 top-0 flex items-center justify-between h-12 gap-2 px-2 py-1 pr-1 md:pr-6 md:px-6">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>

          {/* nav */}
          <div className="hidden md:flex grow">
            <ul className="flex md:gap-4 lg:gap-8 text-accent-foreground *:px-2 mx-auto text-sm">
              {landingPageLabel.map((l) => (
                <li key={l.id}>
                  <NavLink to={l.route}>
                    {({ isActive }) => (
                      <button
                        className={cn(
                          isActive
                            ? 'text-primary'
                            : 'hover:not-focus:opacity-80 active:text-muted-foreground',
                          'relative flex justify-center',
                          'transition-colors duration-100 ease font-medium'
                        )}
                      >
                        {l.label}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              variants={landingBodyVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute rounded-full -bottom-3 size-2 bg-primary"
                            ></motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-4">
            <div className="flex gap-3 md:gap-4">
              <Button
                size="sm"
                className="shadow-xs hidden md:inline-flex bg-background text-foreground"
                variant="ghost"
              >
                Sign up
              </Button>
              <Button size="sm" variant="secondary" className="font-bold">
                Sign in
              </Button>
            </div>

            {/* mobile menu button */}
            <Button
              size="icon-lg"
              variant="ghost"
              onClick={toggleOpenMenu}
              className="md:hidden"
            >
              <TextAlignJustify className="size-[26px]" />
            </Button>
          </div>
        </nav>
      </header>
      {/* main */}
      <main className="relative min-h-screen">
        <section className="relative flex items-center justify-center px-4 h-dvh overflow-hidden">
          <div className="absolute rounded-full left-10 top-2 brightness-140 bg-primary h-70 w-50 lg:w-120 lg:h-80 -z-1"></div>
          <div className="absolute right-0 rounded-full bg-primary bottom-10 size-60 lg:size-80 -z-1"></div>
          {/* grainy noise */}
          <span className="absolute z-11 opacity-70 dark:opacity-80 mix-blend-overlay size-full bg-[url('./assets/noise.svg')]"></span>
          {/* box with line */}
          <div className="absolute bottom-0 z-12 size-50 md:size-90 right-2">
            <img
              src={boxWithLine}
              fetchPriority="high"
              alt="box-with-line"
              className="dark:invert size-full invert-0"
            />
          </div>
          {/* overlay blur */}
          <div className="absolute z-10 bg-background/50 backdrop-blur-3xl size-full"></div>

          <motion.div
            variants={landingBodyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'spring',
              mass: 0.3,
              stiffness: 600,
              damping: 60,
            }}
            className="flex flex-col items-center justify-center max-w-lg z-20 gap-6"
          >
            <span className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 text-balance">
                Create Your Second Brain
              </h1>
              <Paragraphe className="text-sm text-center text-foreground/80 font-medium">
                Organize ideas, share knowledge, and grow together. Your ideas
                don&apos;t belong alone.
              </Paragraphe>
            </span>

            <div className="flex gap-4">
              <Button variant="secondary" size="lg" className="font-semibold">
                <Merge />
                Explore community
              </Button>
              <Button size="lg" className="font-bold">
                <ArrowDownCircle /> Get started
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="pt-14 h-dvh">
          <h2 className="text-3xl font-bold tracking-tight text-center scroll-m-20 text-balance">
            Features
          </h2>
        </section>
      </main>

      {/* Menu content - mobile */}
      <LandingPageMenu open={openMenu} toggleOpen={toggleOpenMenu} />

      {/* Footer */}
      <footer className="px-3 py-4">
        <Footer />
      </footer>
    </div>
  );
};
