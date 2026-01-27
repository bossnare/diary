import { useAuth } from '@/shared/hooks/use-auth';
import { UserAvatar } from './UserAvatar';
import { cn } from '@/app/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const MiniProfile = ({ className }: Props) => {
  const { user } = useAuth();

  return (
    <div className={cn('flex items-center select-none gap-3 mb-4', className)}>
      <UserAvatar user={user} />
      <div className="flex flex-col -space-y-1 overflow-hidden">
        <span className="text-lg font-bold tracking-tight truncate md:text-base line-clamp-1">
          {user?.user_metadata.name.split(' (')[0] || 'User Diary'}
        </span>
        <span className="text-sm text-muted-foreground">
          {user?.user_metadata.email_verified && 'View your profile'}
        </span>
      </div>
    </div>
  );
};
