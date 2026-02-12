import { useParams } from 'react-router-dom';
import { UserAvatar } from '../features/users/UserAvatar';
import { useUserProfile } from '@/app/hooks/use-user';
import { ErrorState } from '../components/ErrorState';
import { Spinner } from '@/shared/components/Spinner';
import { ArrowLeft, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ProfilePage() {
  const [isCopyingLink, setIsCopyingLink] = useState(false);

  const { username } = useParams();
  const {
    data: profile,
    isError,
    error,
    refetch,
    isPending,
  } = useUserProfile(username);
  const link = `${import.meta.env.VITE_SITE_URL}/${profile?.username}`;

  const handleCopyLink = () => {
    setIsCopyingLink(true);
    navigator.clipboard.writeText(link);
    setTimeout(() => {
      setIsCopyingLink(false);
    }, 800);
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center w-full h-dvh bg-background">
        <Spinner size="sm"></Spinner>
      </div>
    );

  if (isError)
    return (
      <div>
        <header>
          <nav className="px-2 py-2">
            <Button size="icon-lg" variant="ghost">
              <ArrowLeft />
            </Button>
          </nav>
        </header>
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );

  return (
    <div className="relative max-w-4xl px-4 py-8 mx-auto space-y-4">
      <div className="absolute inset-x-0 top-0 h-24 bg-muted/40"></div>

      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <UserAvatar
          user={profile}
          fallback={profile?.username}
          className="border outline-4 size-28 lg:size-36 outline-background border-foreground/80"
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:pt-10 grow">
          <p className="text-2xl font-bold text-center lg:text-3xl">
            {profile?.displayName || 'You'}
          </p>
          <Button
            disabled={isCopyingLink}
            onClick={handleCopyLink}
            variant="outline"
          >
            <Link /> {isCopyingLink ? 'Copying ...' : 'Copy link'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-4 mx-auto h-80 rounded-2xl">
        <div className="flex items-center justify-center w-full gap-8 p-3 border rounded-lg bg-muted/30 dark:bg-transparent border-border">
          <div>
            <span className="text-xl font-bold">14.2K</span> Followers
          </div>
          <span className="block h-full border-l border-border"></span>
          <div>
            <span className="text-xl font-bold">12</span> Notes
          </div>
        </div>
      </div>
    </div>
  );
}
