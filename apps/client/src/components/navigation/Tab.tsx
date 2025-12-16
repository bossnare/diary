import { cn } from '@/lib/utils';

export const Tab = ({
  isActive,
  Icon,
  label,
}: {
  isActive?: boolean;
  Icon: React.ElementType;
  label: string;
}) => {
  const activeClass = ' font-semibold text-sidebar-foreground md:bg-muted';
  const defaultClass =
    'relative flex items-center justify-center md:justify-start md:rounded-md w-full cursor-pointer gap-2 p-4 md:px-3 md:h-9 ease-in-out';
  const inactiveClass =
    'font-medium transition-colors rounded-full duration-300 ease-in-out md:hover:opacity-80 text-muted-foreground active:bg-muted-foreground/20 md:hover:bg-muted/60';

  return (
    <button
      className={cn(defaultClass, isActive ? activeClass : inactiveClass)}
    >
      <Icon className="md:size-5" />
      <span className="hidden md:block">{label}</span>
      {/* underline */}
      {isActive && (
        <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
      )}
    </button>
  );
};
