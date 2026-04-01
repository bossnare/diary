import { cn } from '@/app/lib/utils';

export const Tab = ({
  isActive,
  Icon,
  label,
}: {
  isActive?: boolean;
  Icon: React.ElementType;
  label: string;
}) => {
  const activeClass =
    'text-primary';
  const defaultClass =
    'relative transition-colors overflow-hidden duration-300 md:duration-100 ease-in-out rounded-full active:bg-muted-foreground/10 md:hover:bg-input/80 flex items-center justify-center md:justify-start md:rounded-sm w-full cursor-pointer gap-4 p-3 md:px-1.5 md:h-10 ease-in-out font-bold!';
  const inactiveClass = 'font-medium md:text-current';

  return (
    <button
      className={cn(defaultClass, isActive ? activeClass : inactiveClass)}
    >
      {label === 'Tags' ? (
        <Icon weight={'bold'} className="shrink-0 md:size-7 size-7" />
      ) : (
        <Icon
          weight={isActive ? 'fill' : 'bold'}
          className="shrink-0 md:size-7 size-7"
        />
      )}
      <span className="hidden lg:block lg:text-[16px]">{label}</span>
      {/* underline */}
      {isActive && (
        <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
      )}
    </button>
  );
};
