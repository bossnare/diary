import { cn } from '@/lib/utils';

type OverlayProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  conditionValue: boolean;
};

export const Overlay = ({
  conditionValue,
  className,
  ...props
}: OverlayProps) => {
  return (
    <div
      {...props}
      role="button"
      className={cn(
        conditionValue
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
        'inset-0 transition-opacity duration-300 ease-in-out bg-black/50 cursor-pointer fixed',
        className
      )}
    ></div>
  );
};
