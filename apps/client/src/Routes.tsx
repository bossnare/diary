import { Routes, Route } from 'react-router-dom';
import Overview from '@/components/dashboard/Overview';
import { Login } from '@/components/auth/Login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <div className="text-center text-xl font-bold py-4">
            Welcome to your dashboard
          </div>
        }
      />
      <Route path="/" element={<Overview />} />
    </Routes>
  );
};
