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
    'relative transition-colors duration-300 ease-in-out flex items-center justify-center md:justify-start md:rounded-md w-full cursor-pointer gap-3 p-3 md:px-3 md:h-9 ease-in-out';
  const inactiveClass =
    'font-medium rounded-full md:hover:opacity-80 text-muted-foreground active:bg-muted-foreground/20 md:hover:bg-muted/60';

  return (
    <button
      className={cn(defaultClass, isActive ? activeClass : inactiveClass)}
    >
      {
        label === 'Search' ? (<Icon
      weight={isActive ? 'fill' : 'regular'}
        className=
          'md:size-6 size-7 rounded-md'
      />) : (
        <Icon
        className=
          'md:size-6 size-7 rounded-md'
      />
      )
      }
      <span className="hidden md:block">{label}</span>
      {/* underline */}
      {isActive && (
        <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
      )}
    </button>
  );
};
