import { cn } from '@/app/lib/utils';
import logo from '@/assets/icon_mono.svg';
type Props = React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'lg' };

export const Logo = ({ className, size = 'lg', ...props }: Props) => {
  const dflt = 'flex font-extrabold leading-none tracking-tighter select-none';
  const lg = 'text-[21px] lg:text-2xl';
  const sm = 'text-[18px] lg:text-[20px]';
  const iconSize = size === 'sm' ? 'size-5' : 'size-6';

  const sz = {
    lg,
    sm,
  };

  return (
    <div
      {...props}
      className={cn(
        ' flex items-center gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80',
        className
      )}
    >
      <img
        src={logo}
        fetchPriority="high"
        loading="eager"
        alt="logo"
        className={cn(iconSize, 'shrink-0! dark:invert')}
      />
      <span className={cn(dflt, sz[size], 'text-foreground')}>memoroom</span>
    </div>
  );
};
