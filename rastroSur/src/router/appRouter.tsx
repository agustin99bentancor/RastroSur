import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/mainLayouts.tsx';
import Home from '../pages/home.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { useAuth } from '../context/authContext.tsx';
import PrivateRoutes from './protectedRoute.jsx';
import NotFound from '../pages/noFound.jsx';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}