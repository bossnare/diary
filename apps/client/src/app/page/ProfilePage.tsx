import { useParams } from 'react-router-dom';
import { UserAvatar } from '../features/users/UserAvatar';
import { useUserProfile } from '@/app/hooks/use-user';
import { ErrorState } from '../components/ErrorState';
import { Spinner } from '@/shared/components/Spinner';

export function ProfilePage() {
  const { username } = useParams();
  const {
    data: profile,
    isError,
    error,
    refetch,
    isPending,
  } = useUserProfile(username);
  console.log(profile);

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="px-4 py-8 space-y-4">
      <UserAvatar
        user={profile}
        fallback={profile?.username}
        className="mx-auto size-30"
      />
      <p className="text-3xl font-medium text-center">
        Hello{' '}
        <span className="font-bold">{profile?.displayName || 'You'} !</span>
      </p>
      <div className="max-w-4xl mx-auto h-80 rounded-2xl bg-muted"></div>
    </div>
  );
}
