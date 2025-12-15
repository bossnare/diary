import { Login } from '@/components/auth/Login';
import Overview from '@/components/dashboard/Overview';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="search" element={<div>Bels Route</div>} />
          <Route path="notification" element={<div>Search Route</div>} />
          <Route path="tags" element={<div>Tags Route</div>} />
        </Route>
      </Route>
    </Routes>
  );
};
