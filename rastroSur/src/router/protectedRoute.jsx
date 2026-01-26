import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext.tsx';

const PrivateRoutes = () => {
    const {isAuthenticated } = useAuth();
return (
    isAuthenticated ? <Outlet/> : <Navigate to='*'/>
  )
}
export default PrivateRoutes;