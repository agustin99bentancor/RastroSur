import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/header.jsx';
import LoginModal from '../modals/loginModal.tsx';
import { loginUser,LoginCredentials } from '../services/authService.tsx';
import { useAuth } from '../context/authContext.tsx';


export default function MainLayout() {
    const {isAuthenticated, setAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [ error , setError ] = useState<string | null>(null);

  return (
    <>
        <Header
            isAuthenticated={isAuthenticated}
            onLogin={() =>{ setShowLogin(true)}} 
            onLogout={() => setAuthenticated(false)} 
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
                    setError(error instanceof Error ? error.response?.data.error : 'Unknown error');
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