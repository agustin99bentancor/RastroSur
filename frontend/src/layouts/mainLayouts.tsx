import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderPublic from '../component/headerPublic.jsx';
import LoginModal from '../modals/loginModal.tsx';
import { loginUser,LoginCredentials, logoutUser } from '../services/authService.tsx';
import { useAuth } from '../context/authContext.tsx';
import axios, { AxiosError } from 'axios';


export default function MainLayout() {
    const {isAuthenticated, setAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [ error , setError ] = useState<string | null>(null);

    function handleLogout() {
        logoutUser()
            .then(() => {
                setAuthenticated(false);
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
        }

  return (
    <>
        <HeaderPublic
            isAuthenticated={isAuthenticated}
            onLogin={() =>{ setShowLogin(true)}} 
            onLogout={handleLogout} 
        />
        {showLogin && (
            <LoginModal
                error={error}
                onClose={() => setShowLogin(false)} 
                onSuccess={async (name, password) => {
                const login: LoginCredentials = {
                    email: name, password: password
                }

                try {
                    const res = await loginUser(login);
                    console.log("Login successful:", res);
                    setAuthenticated(true);
                    setShowLogin(false);
                } catch (error) {
                    console.error("Login failed:", error);
                    if (axios.isAxiosError(error)) {
                        setError(error.response?.data?.error || 'Error de autenticación');
                    } else {
                        setError('Error desconocido');
                    }
                    return;
                }
            }} 
            />
        )}
        <main>
            <Outlet />
        </main>
    </>
  );
}