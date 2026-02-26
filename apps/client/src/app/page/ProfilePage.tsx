import { useNavigate, useParams } from 'react-router-dom';
import { UserAvatar } from '../features/users/UserAvatar';
import { useUserProfile } from '@/app/hooks/use-user';
import { ErrorState } from '../components/ErrorState';
import { Spinner } from '@/shared/components/Spinner';
import { ArrowLeft, ChevronLeft, Link } from 'lucide-react';
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
  const navigate = useNavigate();

  const link = `${import.meta.env.VITE_SITE_URL}/${profile?.username}`;

  const handleBack = () => navigate(-1) || navigate('/app');

  const handleCopyLink = () => {
    setIsCopyingLink(true);
    setTimeout(() => {
      setIsCopyingLink(false);
      navigator.clipboard.writeText(link);
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
           <nav className="pr-2 h-12">
          <Button onClick={handleBack} size="icon-xl" variant="ghost"                 className="h-full! w-14! rounded-none pr-2!"
>
            <ChevronLeft />
          </Button>
        </nav>
        </header>
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );

  return (
    <>
      <header className="sticky z-10 bg-background top-0 inset-x-0">
        <nav className="pr-2 h-12">
          <Button onClick={handleBack} size="icon-xl" variant="ghost"                 className="h-full! w-14! rounded-none pr-2!"
>
            <ChevronLeft />
          </Button>
        </nav>
      </header>

      <main>
        <div className="relative max-w-4xl px-4 py-8 mx-auto space-y-4">
          <div className="absolute inset-x-0 top-0 h-24 bg-muted/50"></div>

          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <UserAvatar
              user={profile}
              fallback={profile?.username}
              className="border outline-4 size-28 lg:size-36 outline-background border-foreground/80"
            />
            <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:pt-12 grow">
              <p className="text-2xl font-bold text-center lg:text-3xl">
                {profile?.displayName || 'User Diary'}
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
              <div role="button">
                <span className="text-xl font-bold">14.2K</span> Followers
              </div>
              <span className="block h-full border-l border-border"></span>
              <div role="button">
                <span className="text-xl font-bold">12</span> Notes
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
