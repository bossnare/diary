import { cn } from '@/lib/utils';

export const Button = ({
  children,
  size = 'large',
  className,
  onClick,
}: {
  children: React.ReactNode;
  size?: 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}) => {
  const variants = size === 'large' ? 'h-10 px-6' : 'h-9 px-5';

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex transition-opacity will-change-opacity duration-300 ease-in-out items-center justify-center font-medium px-6 gap-2 bg-primary rounded-md md:hover:opacity-80 active:opacity-60',
        variants,
        className
      )}
    >
      {children}
    </button>
  );
};

export const ButtonIcon = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'transition-colors will-change-colors duration-300 ease-in-out p-2 rounded-full md:hover:opacity-80 active:opacity-80 active:bg-muted-foreground md:hover:bg-muted-foreground',
        className
      )}
    >
      {children}
    </button>
  );
};
