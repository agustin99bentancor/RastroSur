import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/mainLayouts.tsx';
import Home from '../pages/home.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { useAuth } from '../context/authContext.tsx';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}