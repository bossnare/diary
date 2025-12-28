import DashboardLayout from '@/app/layout/AppLayout';
import Overview from '@/app/page/Overview';
import { HomeScreenLoader } from '@/shared/components/HomeScreenLoader';
import { useAuth } from '@/hooks/use-auth';
import { useIsPublicRoute } from '@/hooks/useIsPublicRoute';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicLayout } from '../public-site/PublicLayout';
import { NotFound } from '@/shared/components/not-found';
import { LandingPage } from '@/public-site/page/Home';
import { SignUp } from '@/public-site/page/Signup';

export const AppRoutes = () => {
  const { pending, session } = useAuth();
  const isPublicRoute = useIsPublicRoute();

  return (
    <>
      {pending ? (
        // is pending auth
        <HomeScreenLoader raison={isPublicRoute} />
      ) : (
        <Routes>
          {/* public */}
          <Route element={<PublicLayout session={session} />}>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/about"
              element={<div className="py-4 text-center">No content yet.</div>}
            />
            <Route
              path="/pricing"
              element={<div className="py-4 text-center">No content yet.</div>}
            />
            <Route
              path="/contact"
              element={<div className="py-4 text-center">No content yet.</div>}
            />
            {/* auth - public */}
            <Route path="/auth">
              <Route path="register" element={<SignUp />} />
            </Route>
          </Route>
          {/* protected */}
          <Route element={<ProtectedRoutes session={session} />}>
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="search" element={<div>Search Route</div>} />
              <Route
                path="notification"
                element={
                  <div className="py-4 text-center">Notifications Route</div>
                }
              />
              <Route path="tags" element={<div>Tags Route</div>} />
            </Route>
          </Route>
          {/* bad route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
