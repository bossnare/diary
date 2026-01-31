import { useParams } from 'react-router-dom';
import { UserAvatar } from '../features/users/UserAvatar';
import { useUser } from '@/app/hooks/use-user';

export function Profile() {
  const { username } = useParams();
  const { data: user } = useUser();

  return (
    <div className="px-4 py-8 space-y-4">
      <UserAvatar user={user} fallback={username} className="mx-auto size-30" />
      <p className="text-3xl font-medium text-center">
        Hello <span className="font-bold">{username || 'You'} !</span>
      </p>
      <div className="max-w-4xl mx-auto h-80 rounded-2xl bg-muted"></div>
    </div>
  );
}
