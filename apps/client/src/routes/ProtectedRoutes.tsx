import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
