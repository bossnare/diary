import { Routes, Route } from 'react-router-dom';
import Overview from '@/components/dashboard/Overview';
import { Login } from '@/components/auth/Login';
import { supabase } from './auth-services/clients.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppRoutes = ({ session }: { session: any }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <div className="flex flex-col items-center justify-center py-4 space-y-4 text-xl font-bold">
            Welcome to your dashboard{' '}
            <span className="font-medium text-muted-foreground">
              {session?.user.email}
            </span>
            <button
              className="px-4 py-2 text-base font-medium rounded-md bg-zinc-900"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </button>
          </div>
        }
      />
      <Route path="/" element={<Overview />} />
    </Routes>
  );
};
