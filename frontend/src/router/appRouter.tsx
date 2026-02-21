import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/mainLayouts.tsx';
import Home from '../pages/home.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { useAuth } from '../context/authContext.tsx';
import PrivateRoutes from './protectedRoute.jsx';
import NotFound from '../pages/noFound.jsx';
import AdminLayout from '../layouts/adminLayouts.tsx';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}