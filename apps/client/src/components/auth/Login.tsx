import { Button } from '@/components/ui/button';
import { AuthService } from '@/auth-services/clients.service';

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6">
      <span className="flex items-center gap-2 text-xl font-bold">
        <img src="/icon_32x32.svg" className="size-7" alt="Logo" />{' '}
        <h2>Sign in</h2>{' '}
      </span>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button
          className="bg-secondary text-secondary-foreground"
          onClick={() => AuthService.googleSign()}
        >
          Continue with Google
        </Button>
        <Button
          className="bg-secondary text-secondary-foreground"
          onClick={() => AuthService.githubSign()}
        >
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};
