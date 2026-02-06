import { UserAvatar } from './UserAvatar';
import { cn } from '@/app/lib/utils';
import { useUser } from '@/app/hooks/use-user';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const MiniProfile = ({ className, ...props }: Props) => {
  const { data: user } = useUser();

  return (
    <div
      {...props}
      className={cn('flex items-center select-none gap-3 mb-4', className)}
    >
      <UserAvatar user={user} />
      <div className="flex flex-col -space-y-1 overflow-hidden">
        <span className="text-lg font-bold tracking-tight truncate md:text-base line-clamp-1">
          {user?.displayName.split(' (')[0] || 'User Diary'}
        </span>
        <span className="text-sm text-muted-foreground">View your profile</span>
      </div>
    </div>
  );
};
